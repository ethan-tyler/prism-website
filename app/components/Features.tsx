import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Zap,
  BarChart3,
  Layout,
  Cog,
  ChevronRight,
  Star,
  Lightbulb,
  Library,
  ArrowUpRight,
  Shield,
  Sparkles,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Queries",
    description:
      "Process billions of rows in seconds with our optimized Spark engine and intelligent caching layer.",
    link: "/features/lightning-fast-queries",
    gradient: "from-yellow-400 to-orange-500",
    stats: "<100ms response",
    category: "Performance",
    benefits: ["Sub-second queries", "Auto-optimization", "Smart caching"]
  },
  {
    icon: BarChart3,
    title: "Unified Metrics Layer",
    description:
      "Single source of truth for all metrics with version control, lineage tracking, and governance.",
    link: "/features/unified-metrics-layer",
    gradient: "from-blue-500 to-purple-600",
    stats: "1000+ metrics",
    category: "Data Governance",
    benefits: ["Version control", "Lineage tracking", "Data quality"]
  },
  {
    icon: Library,
    title: "Analytics Library",
    description:
      "Comprehensive library of reusable analytics functions, visualizations, and templates.",
    link: "/features/analytics-library",
    gradient: "from-emerald-500 to-teal-600",
    stats: "500+ templates",
    category: "Productivity",
    benefits: ["Pre-built functions", "Custom templates", "Team sharing"]
  },
  {
    icon: Lightbulb,
    title: "Insight Generation Engine",
    description:
      "Unlock insights in seconds with Databricks-powered processing and intuitive, business-ready interfaces.",
    link: "/features/insight-generation-engine",
    gradient: "from-purple-500 to-pink-600",
    stats: "AI-powered",
    category: "Intelligence",
    benefits: ["Auto insights", "ML predictions", "Pattern detection"]
  },
  {
    icon: Layout,
    title: "Self-Service Portal",
    description:
      "Empower every user to answer their own questions with a self-service portal designed for speed, simplicity, and scalability.",
    link: "/features/self-service-portal",
    gradient: "from-cyan-500 to-blue-600",
    stats: "No-code required",
    category: "Accessibility",
    benefits: ["Drag & drop", "Natural language", "Role-based access"]
  },
  {
    icon: Cog,
    title: "Scenario Modeling",
    description:
      "Build and compare scenarios with interactive models that drive smarter, data-backed decisions.",
    link: "/features/scenario-modeling",
    gradient: "from-indigo-500 to-purple-600",
    stats: "Real-time modeling",
    category: "Planning",
    benefits: ["What-if analysis", "Risk modeling", "Sensitivity analysis"]
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 60,
    scale: 0.9,
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      delay: index * 0.1,
    },
  }),
};

export function Features() {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section 
      ref={containerRef}
      id="features" 
      className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div 
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
            className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-2">Enterprise Analytics</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Reimagined
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Built on <span className="font-semibold text-gray-900">Databricks</span> with enterprise governance,{" "}
            <span className="font-semibold text-gray-900">self-service capabilities</span>, and{" "}
            <span className="font-semibold text-gray-900">AI-powered insights</span>.
            <br />
            Integrated components that create compound analytical value.
          </motion.p>
          
          {/* Stats Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Shield, label: "SOC 2 Compliant", color: "emerald" },
              { icon: TrendingUp, label: "99.9% Uptime", color: "blue" },
              { icon: Users, label: "Enterprise Ready", color: "purple" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2 bg-${item.color}-50 border border-${item.color}-200 rounded-lg`}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                <span className={`text-sm font-medium text-${item.color}-800`}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 cursor-pointer border border-gray-200/50 overflow-hidden"
              variants={fadeInUp}
              custom={index}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              style={{
                boxShadow: hoveredCard === index 
                  ? `0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(59, 130, 246, 0.1)`
                  : `0 4px 6px -1px rgba(0, 0, 0, 0.05)`
              }}
            >
              {/* Gradient Border Animation */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 rounded-3xl blur-sm`}
                animate={{
                  opacity: hoveredCard === index ? 0.1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                  {feature.category}
                </span>
                <span className={`px-3 py-1 bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold rounded-full shadow-md`}>
                  {feature.stats}
                </span>
              </div>

              {/* Enhanced Icon */}
              <motion.div
                className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
              >
                <feature.icon className="w-8 h-8 text-white" />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-md opacity-50`}
                  animate={{
                    scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                    opacity: hoveredCard === index ? [0.5, 0.8, 0.5] : 0.5,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredCard === index ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Enhanced Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Benefits List */}
              <div className="space-y-2 mb-6">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0.7,
                      x: hoveredCard === index ? 0 : -10,
                    }}
                    transition={{ delay: benefitIndex * 0.1 }}
                  >
                    <div className={`w-1.5 h-1.5 bg-gradient-to-r ${feature.gradient} rounded-full`} />
                    {benefit}
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Link */}
              <motion.a
                href={feature.link}
                className="group/link relative inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg transition-all duration-200 overflow-hidden"
                whileHover={{ x: 4 }}
              >
                <span className="relative z-10">Explore Feature</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 relative z-10" />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover/link:opacity-10 transition-opacity`}
                />
              </motion.a>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  rotate: hoveredCard === index ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredCard === index ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <Target className="w-4 h-4 text-gray-400" />
              </motion.div>

              {/* Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 pointer-events-none rounded-3xl`}
                animate={{
                  opacity: hoveredCard === index ? 0.03 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.button
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/25 overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-3">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore All Features
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
