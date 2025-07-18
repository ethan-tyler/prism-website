// app/components/FlywheelStripe.tsx
import React, { memo, useState, useCallback, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Database,
  FileText,
  Zap,
  TrendingUp,
  Users,
  GraduationCap,
  Trophy,
  Rocket,
  Star,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// Types
interface FlywheelSegment {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ElementType;
  category: "foundation" | "processing" | "delivery" | "growth";
  color: string;
  iconColor: string;
  details: string[];
  impact: string;
  metrics: string;
  connections: string[];
  priority: "high" | "medium" | "low";
}

// Optimized data structure
const segments: FlywheelSegment[] = [
  {
    id: "foundation",
    title: "Semantic Foundation",
    shortTitle: "Foundation",
    description: "Build enterprise data models with business context and governance",
    icon: Database,
    category: "foundation",
    color: "#F7F9FB",
    iconColor: "#635BFF",
    priority: "high",
    connections: ["templates"],
    details: [
      "Medallion architecture implementation",
      "Business-aligned data models",
      "Automated quality checks",
      "Version control integration",
    ],
    impact: "Establishes a single source of truth for all analytics initiatives",
    metrics: "90% reduction in data discrepancies across departments",
  },
  {
    id: "templates",
    title: "Template Library",
    shortTitle: "Templates",
    description: "Deploy pre-built analytics templates for rapid implementation",
    icon: FileText,
    category: "processing",
    color: "#FEF3EC",
    iconColor: "#F97316",
    priority: "high",
    connections: ["insights"],
    details: [
      "Industry-specific templates",
      "Customizable dashboards",
      "Best practice patterns",
      "Rapid deployment tools",
    ],
    impact: "Accelerates time-to-value for new analytics projects",
    metrics: "70% faster deployment of new analytics solutions",
  },
  {
    id: "insights",
    title: "Insight Engine",
    shortTitle: "Insights",
    description: "Generate automated insights with AI-powered analytics",
    icon: Zap,
    category: "processing",
    color: "#EFF8FF",
    iconColor: "#0EA5E9",
    priority: "high",
    connections: ["modeling"],
    details: [
      "ML-driven insights",
      "Predictive analytics",
      "Natural language queries",
      "Real-time processing",
    ],
    impact: "Transforms raw data into actionable business intelligence",
    metrics: "5x increase in insights generated per analyst",
  },
  {
    id: "modeling",
    title: "Scenario Modeling",
    shortTitle: "Modeling",
    description: "Run what-if analysis and predictive planning scenarios",
    icon: TrendingUp,
    category: "processing",
    color: "#F0FDF4",
    iconColor: "#22C55E",
    priority: "medium",
    connections: ["portal"],
    details: [
      "Monte Carlo simulations",
      "Risk assessment tools",
      "Budget forecasting",
      "Impact analysis",
    ],
    impact: "Enables data-driven decision making for strategic initiatives",
    metrics: "40% improvement in forecast accuracy",
  },
  {
    id: "portal",
    title: "Self-Service Portal",
    shortTitle: "Portal",
    description: "Empower business users with intuitive analytics interfaces",
    icon: Users,
    category: "delivery",
    color: "#FEFCE8",
    iconColor: "#EAB308",
    priority: "high",
    connections: ["adoption"],
    details: [
      "No-code analytics",
      "Drag-and-drop interface",
      "Collaborative features",
      "Mobile accessibility",
    ],
    impact: "Democratizes data access across the organization",
    metrics: "3x increase in active analytics users",
  },
  {
    id: "adoption",
    title: "User Adoption",
    shortTitle: "Adoption",
    description: "Drive engagement through training and change management",
    icon: GraduationCap,
    category: "delivery",
    color: "#F3F4F6",
    iconColor: "#6B7280",
    priority: "medium",
    connections: ["value"],
    details: [
      "Interactive tutorials",
      "Certification programs",
      "Community forums",
      "Success metrics",
    ],
    impact: "Ensures sustainable analytics culture transformation",
    metrics: "85% user satisfaction and retention rate",
  },
  {
    id: "value",
    title: "Value Demonstration",
    shortTitle: "Value",
    description: "Track ROI and communicate strategic impact",
    icon: Trophy,
    category: "growth",
    color: "#FDF4FF",
    iconColor: "#A855F7",
    priority: "high",
    connections: ["evolution"],
    details: [
      "KPI dashboards",
      "Cost savings analysis",
      "Performance benchmarks",
      "Executive reporting",
    ],
    impact: "Quantifies and showcases analytics program success",
    metrics: "$2.5M annual cost savings identified",
  },
  {
    id: "evolution",
    title: "Platform Evolution",
    shortTitle: "Evolution",
    description: "Continuously improve with new capabilities and innovation",
    icon: Rocket,
    category: "growth",
    color: "#FEF2F2",
    iconColor: "#EF4444",
    priority: "medium",
    connections: ["foundation"],
    details: [
      "Feature roadmap",
      "User feedback loops",
      "Technology updates",
      "Scale optimization",
    ],
    impact: "Keeps the platform cutting-edge and competitive",
    metrics: "Monthly feature releases based on user feedback",
  },
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
  hidden: { opacity: 0, scale: 0.8 },
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
    scale: 1.03,
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

// Memoized segment card component
const SegmentCard = memo(({
  segment,
  index,
  isSelected,
  onSelect,
}: {
  segment: FlywheelSegment;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const Icon = segment.icon;
  
  // Calculate card position for 4x2 grid
  const cardWidth = 280;
  const cardHeight = 260; // Increased height for better content fit
  const gap = 60;
  const containerWidth = 1200;
  const containerHeight = 600;
  const totalWidth = 4 * cardWidth + 3 * gap;
  const startX = (containerWidth - totalWidth) / 2;
  const startY = (containerHeight - (2 * cardHeight + gap)) / 2;

  let left, top;
  if (index < 4) {
    // First row: left to right
    left = startX + index * (cardWidth + gap);
    top = startY;
  } else {
    // Second row: right to left (reversed positions)
    const col = 3 - (index - 4);
    left = startX + col * (cardWidth + gap);
    top = startY + cardHeight + gap;
  }

  const categoryColors = {
    foundation: "from-indigo-500 to-purple-600",
    processing: "from-blue-500 to-cyan-600",
    delivery: "from-emerald-500 to-teal-600",
    growth: "from-orange-500 to-red-600",
  };

  return (
    <motion.div
      className={`
        absolute rounded-xl p-6 cursor-pointer bg-white backdrop-blur-sm
        border transition-all duration-300 ease-out group
        ${isSelected 
          ? "border-indigo-500 shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500 ring-offset-2" 
          : "border-gray-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
        }
      `}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
      }}
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(segment.id)}
    >
      {/* Priority indicator */}
      <div className="absolute top-3 right-3">
        <div className={`
          w-2 h-2 rounded-full
          ${segment.priority === 'high' ? 'bg-red-500' : 
            segment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
        `} />
      </div>

      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize">
          {segment.category}
        </span>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <motion.div
          className={`
            w-16 h-16 rounded-xl flex items-center justify-center shadow-sm
            bg-gradient-to-br ${categoryColors[segment.category]}
          `}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-gray-900 mb-3 text-center">
        {segment.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed text-center px-2">
        {segment.description}
      </p>

      {/* Stripe-inspired background pattern */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </motion.div>
  );
});

SegmentCard.displayName = 'SegmentCard';

// Main component
const FlywheelStripe = memo(function FlywheelStripe() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'foundation' | 'processing' | 'delivery' | 'growth'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleCardSelect = useCallback((id: string) => {
    setSelectedCard(selectedCard === id ? null : id);
  }, [selectedCard]);

  const selectedSegment = useMemo(() => 
    segments.find((s) => s.id === selectedCard),
    [selectedCard]
  );

  const filteredSegments = useMemo(() => {
    if (activeFilter === 'all') return segments;
    return segments.filter(segment => segment.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gray-50"
    >
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
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full text-blue-700 font-semibold text-sm mb-8 shadow-lg shadow-blue-500/10"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <motion.div
                className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            Platform Capabilities
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900 mb-8 leading-tight"
          >
            <span className="block mb-2">The PRISM</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Flywheel
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            A <span className="font-semibold text-gray-900">fully integrated suite</span> of analytics capabilities that{" "}
            <span className="font-semibold text-gray-900">work together</span> to accelerate your{" "}
            <span className="font-semibold text-gray-900">data transformation journey</span>.
            <br />
            Integrated components create compound analytical value.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="bg-white rounded-xl p-1 inline-flex shadow-sm border border-gray-200">
            {[
              { id: 'all', label: 'All Components', icon: Sparkles },
              { id: 'foundation', label: 'Foundation', icon: Database },
              { id: 'processing', label: 'Processing', icon: Zap },
              { id: 'delivery', label: 'Delivery', icon: Users },
              { id: 'growth', label: 'Growth', icon: TrendingUp },
            ].map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as 'all' | 'foundation' | 'processing' | 'delivery' | 'growth')}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm
                  ${activeFilter === filter.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={activeFilter === filter.id ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <filter.icon className="w-4 h-4" />
                </motion.div>
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Flywheel Diagram */}
        <motion.div
          className="relative mb-16 flex justify-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="relative" style={{ width: "1200px", height: "640px" }}>
            {/* Animated connections SVG */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width="1200"
              height="640"
              viewBox="0 0 1200 640"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#6366f1"
                    opacity="0.6"
                  />
                </marker>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              
              {/* Connection paths */}
              {segments.map((segment, index) => {
                const cardWidth = 280;
                const cardHeight = 260;
                const gap = 60;
                const containerWidth = 1200;
                const containerHeight = 640;
                const totalWidth = 4 * cardWidth + 3 * gap;
                const startX = (containerWidth - totalWidth) / 2;
                const startY = (containerHeight - (2 * cardHeight + gap)) / 2;

                // Calculate current card position
                let fromX, fromY;
                if (index < 4) {
                  fromX = startX + index * (cardWidth + gap) + cardWidth / 2;
                  fromY = startY + cardHeight / 2;
                } else {
                  const col = 3 - (index - 4);
                  fromX = startX + col * (cardWidth + gap) + cardWidth / 2;
                  fromY = startY + cardHeight + gap + cardHeight / 2;
                }

                // Calculate target card position
                const targetSegment = segments.find(s => s.id === segment.connections[0]);
                if (!targetSegment) return null;
                
                const targetIndex = segments.indexOf(targetSegment);
                let toX, toY;
                if (targetIndex < 4) {
                  toX = startX + targetIndex * (cardWidth + gap) + cardWidth / 2;
                  toY = startY + cardHeight / 2;
                } else {
                  const col = 3 - (targetIndex - 4);
                  toX = startX + col * (cardWidth + gap) + cardWidth / 2;
                  toY = startY + cardHeight + gap + cardHeight / 2;
                }

                // Create curved path
                const midX = (fromX + toX) / 2;
                const midY = (fromY + toY) / 2;
                const controlOffset = 80;
                
                // Adjust control point based on direction
                const controlX = midX + (fromY > toY ? controlOffset : -controlOffset);
                const controlY = midY + (fromX > toX ? -controlOffset : controlOffset);

                return (
                  <motion.path
                    key={`${segment.id}-connection`}
                    d={`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`}
                    fill="none"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
              
              {/* Animated flow particles */}
              {segments.map((segment, index) => (
                <motion.circle
                  key={`${segment.id}-particle`}
                  r="3"
                  fill="#6366f1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.3}s`}
                  >
                    <mpath href={`#path-${segment.id}`} />
                  </animateMotion>
                </motion.circle>
              ))}
              
              {/* Hidden paths for particle animation */}
              {segments.map((segment, index) => {
                const cardWidth = 280;
                const cardHeight = 260;
                const gap = 60;
                const containerWidth = 1200;
                const containerHeight = 640;
                const totalWidth = 4 * cardWidth + 3 * gap;
                const startX = (containerWidth - totalWidth) / 2;
                const startY = (containerHeight - (2 * cardHeight + gap)) / 2;

                let fromX, fromY;
                if (index < 4) {
                  fromX = startX + index * (cardWidth + gap) + cardWidth / 2;
                  fromY = startY + cardHeight / 2;
                } else {
                  const col = 3 - (index - 4);
                  fromX = startX + col * (cardWidth + gap) + cardWidth / 2;
                  fromY = startY + cardHeight + gap + cardHeight / 2;
                }

                const targetSegment = segments.find(s => s.id === segment.connections[0]);
                if (!targetSegment) return null;
                
                const targetIndex = segments.indexOf(targetSegment);
                let toX, toY;
                if (targetIndex < 4) {
                  toX = startX + targetIndex * (cardWidth + gap) + cardWidth / 2;
                  toY = startY + cardHeight / 2;
                } else {
                  const col = 3 - (targetIndex - 4);
                  toX = startX + col * (cardWidth + gap) + cardWidth / 2;
                  toY = startY + cardHeight + gap + cardHeight / 2;
                }

                const midX = (fromX + toX) / 2;
                const midY = (fromY + toY) / 2;
                const controlOffset = 80;
                const controlX = midX + (fromY > toY ? controlOffset : -controlOffset);
                const controlY = midY + (fromX > toX ? -controlOffset : controlOffset);

                return (
                  <path
                    key={`path-${segment.id}`}
                    id={`path-${segment.id}`}
                    d={`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`}
                    fill="none"
                    stroke="transparent"
                  />
                );
              })}
            </svg>
            
            <div className="relative h-full w-full">
              {filteredSegments.map((segment) => (
                <SegmentCard
                  key={segment.id}
                  segment={segment}
                  index={segments.indexOf(segment)}
                  isSelected={selectedCard === segment.id}
                  onSelect={handleCardSelect}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Information Panel */}
        <AnimatePresence mode="wait">
          {selectedSegment ? (
            <motion.div
              key={selectedSegment.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <selectedSegment.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedSegment.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedSegment.description}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {selectedSegment.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Business Impact
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedSegment.impact}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Success Metrics
                  </h4>
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg">
                    <p className="font-medium text-sm">
                      {selectedSegment.metrics}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Explore the Flywheel Components
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Click on any component above to learn more about its capabilities, business impact, and success metrics. Each component works together to create a self-sustaining cycle of value.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden"
          >
            {/* Animated background elements */}
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="w-8 h-8 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                Ready to Accelerate Your Data Journey?
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Experience the power of integrated analytics with PRISM&apos;s flywheel approach. Each component builds momentum for the next.
              </p>
              <motion.button
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

FlywheelStripe.displayName = 'FlywheelStripe';

export default FlywheelStripe;