// app/components/LightningFastQueries.tsx
import React, { memo, useState, useCallback, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Zap,
  Database,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  BarChart3,
  Cpu,
  HardDrive,
  Layers,
  Gauge,
  Settings,
  ChevronRight,
  Star,
  Sparkles,
  Activity,
  Server,
  Target,
} from "lucide-react";

// Types
interface QueryOptimization {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: "engine" | "caching" | "indexing" | "partitioning";
  impact: string;
  improvement: string;
  metrics: {
    before: string;
    after: string;
    improvement: string;
  };
  features: string[];
  technicalDetails: string;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: "up" | "down";
  color: string;
}

// Data
const queryOptimizations: QueryOptimization[] = [
  {
    id: "spark-engine",
    title: "Optimized Spark Engine",
    description: "Advanced Spark configuration with custom optimizations for analytical workloads",
    icon: Zap,
    category: "engine",
    impact: "3x faster query execution",
    improvement: "300%",
    metrics: {
      before: "45 seconds",
      after: "15 seconds",
      improvement: "66% faster",
    },
    features: [
      "Custom Spark configurations",
      "Adaptive query execution",
      "Dynamic partition pruning",
      "Vectorized processing",
      "Cost-based optimization",
    ],
    technicalDetails: "Leverages Apache Spark's Catalyst optimizer with custom rules and adaptive execution strategies optimized for analytical workloads.",
  },
  {
    id: "intelligent-caching",
    title: "Intelligent Caching Layer",
    description: "Multi-tiered caching system with predictive pre-loading and automatic invalidation",
    icon: HardDrive,
    category: "caching",
    impact: "10x faster repeated queries",
    improvement: "1000%",
    metrics: {
      before: "8 seconds",
      after: "0.8 seconds",
      improvement: "90% faster",
    },
    features: [
      "Result set caching",
      "Intermediate computation caching",
      "Predictive pre-loading",
      "Automatic cache invalidation",
      "Distributed cache management",
    ],
    technicalDetails: "Implements a sophisticated caching hierarchy with Redis for hot data and distributed storage for warm data, using ML algorithms to predict cache needs.",
  },
  {
    id: "columnar-indexing",
    title: "Columnar Indexing",
    description: "Advanced indexing strategies optimized for analytical query patterns",
    icon: Database,
    category: "indexing",
    impact: "5x faster filtering",
    improvement: "500%",
    metrics: {
      before: "25 seconds",
      after: "5 seconds",
      improvement: "80% faster",
    },
    features: [
      "Bloom filters",
      "Zone maps",
      "Min/max statistics",
      "Columnar storage optimization",
      "Adaptive indexing",
    ],
    technicalDetails: "Uses Delta Lake's data skipping features combined with custom indexing strategies to minimize data scanning and improve query performance.",
  },
  {
    id: "smart-partitioning",
    title: "Smart Partitioning",
    description: "Automatic data partitioning based on query patterns and data distribution",
    icon: Layers,
    category: "partitioning",
    impact: "4x faster scans",
    improvement: "400%",
    metrics: {
      before: "60 seconds",
      after: "15 seconds",
      improvement: "75% faster",
    },
    features: [
      "Automatic partition discovery",
      "Dynamic partition pruning",
      "Optimal partition sizing",
      "Query-aware partitioning",
      "Real-time repartitioning",
    ],
    technicalDetails: "Analyzes query patterns and data distribution to automatically optimize partitioning strategies, reducing data movement and improving parallelism.",
  },
];

const performanceMetrics: PerformanceMetric[] = [
  { id: "query-speed", name: "Avg Query Time", value: 2.3, unit: "sec", trend: "down", color: "text-green-600" },
  { id: "throughput", name: "Queries/Second", value: 1250, unit: "q/s", trend: "up", color: "text-blue-600" },
  { id: "cache-hit", name: "Cache Hit Rate", value: 89, unit: "%", trend: "up", color: "text-purple-600" },
  { id: "data-scanned", name: "Data Scanned", value: 15, unit: "MB", trend: "down", color: "text-orange-600" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

// Memoized components
const OptimizationCard = memo(({
  optimization,
  isSelected,
  onSelect,
}: {
  optimization: QueryOptimization;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const Icon = optimization.icon;
  const categoryColors = {
    engine: "from-yellow-500 to-orange-600",
    caching: "from-blue-500 to-indigo-600",
    indexing: "from-green-500 to-teal-600",
    partitioning: "from-purple-500 to-pink-600",
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={`
        relative cursor-pointer group
        ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
      `}
      onClick={() => onSelect(optimization.id)}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
            {optimization.category}
          </span>
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
            <TrendingUp className="w-4 h-4" />
            {optimization.improvement}
          </div>
        </div>

        {/* Icon and Title */}
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className={`
              w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[optimization.category]}
              flex items-center justify-center
            `}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{optimization.title}</h3>
            <p className="text-sm text-gray-500">{optimization.impact}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {optimization.description}
        </p>

        {/* Metrics preview */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Before: {optimization.metrics.before}</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="text-green-600 font-medium">After: {optimization.metrics.after}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

OptimizationCard.displayName = 'OptimizationCard';

const MetricCard = memo(({ metric }: { metric: PerformanceMetric }) => (
  <motion.div
    variants={cardVariants}
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
      <div className={`flex items-center gap-1 ${metric.color}`}>
        {metric.trend === 'up' ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <Activity className="w-4 h-4 rotate-180" />
        )}
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</span>
      <span className="text-sm text-gray-500">{metric.unit}</span>
    </div>
  </motion.div>
));

MetricCard.displayName = 'MetricCard';

// Main component
const LightningFastQueries = memo(function LightningFastQueries() {
  const [selectedOptimization, setSelectedOptimization] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'engine' | 'caching' | 'indexing' | 'partitioning'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleOptimizationSelect = useCallback((id: string) => {
    setSelectedOptimization(selectedOptimization === id ? null : id);
  }, [selectedOptimization]);

  const selectedData = useMemo(() => 
    selectedOptimization ? queryOptimizations.find(o => o.id === selectedOptimization) : null,
    [selectedOptimization]
  );

  const filteredOptimizations = useMemo(() => {
    if (activeCategory === 'all') return queryOptimizations;
    return queryOptimizations.filter(opt => opt.category === activeCategory);
  }, [activeCategory]);

  const toggleAnimation = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-50 rounded-full text-yellow-600 font-medium text-sm mb-4"
          >
            <Zap className="w-4 h-4" />
            Query Performance
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Lightning Fast
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {" "}Queries
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Process billions of rows in seconds with our optimized Spark engine, intelligent caching layer, and advanced indexing strategies.
          </motion.p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Real-Time Performance</h2>
            <p className="text-gray-600">Current system metrics updated every second</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="bg-gray-100 rounded-xl p-1 inline-flex">
            {[
              { id: 'all', label: 'All Optimizations', icon: Target },
              { id: 'engine', label: 'Engine', icon: Zap },
              { id: 'caching', label: 'Caching', icon: HardDrive },
              { id: 'indexing', label: 'Indexing', icon: Database },
              { id: 'partitioning', label: 'Partitioning', icon: Layers },
            ].map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm
                  ${activeCategory === category.id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={activeCategory === category.id ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <category.icon className="w-4 h-4" />
                </motion.div>
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Query Optimization Cards */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {filteredOptimizations.map((optimization) => (
              <OptimizationCard
                key={optimization.id}
                optimization={optimization}
                isSelected={selectedOptimization === optimization.id}
                onSelect={handleOptimizationSelect}
              />
            ))}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedData ? (
            <motion.div
              key={selectedData.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                  <selectedData.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedData.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedData.description}</p>
                </div>
              </div>

              {/* Performance Impact */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-2">Performance Impact</h4>
                    <p className="text-yellow-100">{selectedData.impact}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{selectedData.improvement}</div>
                    <div className="text-yellow-100 text-sm">improvement</div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Before</span>
                      <span className="font-medium text-red-600">{selectedData.metrics.before}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">After</span>
                      <span className="font-medium text-green-600">{selectedData.metrics.after}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600 text-sm">Improvement</span>
                      <span className="font-bold text-indigo-600">{selectedData.metrics.improvement}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Technical Details</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedData.technicalDetails}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Explore Query Optimizations
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Click on any optimization technique above to learn more about how it improves query performance and see detailed metrics.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Demo */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
          
          <motion.div
            className="relative z-10"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Interactive Query Performance Demo</h3>
                <p className="text-indigo-100">
                  See how our optimizations transform query performance in real-time
                </p>
              </div>
              <motion.button
                onClick={toggleAnimation}
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause Demo' : 'Start Demo'}
              </motion.button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Before Optimization</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Query Time:</span>
                    <span className="text-red-300">45.2 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Scanned:</span>
                    <span className="text-red-300">2.3 TB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cache Hit Rate:</span>
                    <span className="text-red-300">12%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">After Optimization</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Query Time:</span>
                    <span className="text-green-300">2.3 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Scanned:</span>
                    <span className="text-green-300">15 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cache Hit Rate:</span>
                    <span className="text-green-300">89%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

LightningFastQueries.displayName = 'LightningFastQueries';

export default LightningFastQueries;