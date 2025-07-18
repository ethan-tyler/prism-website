import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Database,
  Zap,
  BarChart3,
  Brain,
  Users,
  Shield,
  ArrowRight,
  Play,
  Sparkles,
  Activity,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  details: string[];
}

const flowSteps: FlowStep[] = [
  {
    id: "sources",
    title: "Data Sources",
    description: "Connect any data source",
    icon: Database,
    gradient: "from-blue-500 to-cyan-500",
    details: ["Databases", "APIs", "Real-time Streams", "File Systems", "Cloud Services"]
  },
  {
    id: "processing",
    title: "PRISM Engine",
    description: "Databricks-powered processing",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
    details: ["ML Pipeline", "Real-time Analytics", "Parameter Governance", "Quality Assurance"]
  },
  {
    id: "outputs",
    title: "Intelligence",
    description: "Actionable insights",
    icon: Brain,
    gradient: "from-green-500 to-emerald-500",
    details: ["Dashboards", "Automated Reports", "AI Insights", "Predictions", "Alerts"]
  }
];

const metrics = [
  { label: "Processing Speed", value: "< 100ms", icon: Zap },
  { label: "Data Throughput", value: "1.2M/sec", icon: Activity },
  { label: "Platform Uptime", value: "99.9%", icon: Shield },
  { label: "Active Users", value: "2,847", icon: Users },
];

const capabilities = [
  {
    title: "Lightning Fast Queries",
    description: "Process billions of rows in seconds",
    icon: Zap,
    color: "blue"
  },
  {
    title: "Universal Metrics",
    description: "Single source of truth for all analytics",
    icon: BarChart3,
    color: "purple"
  },
  {
    title: "AI-Powered Insights",
    description: "Automated pattern detection and recommendations",
    icon: Brain,
    color: "green"
  },
  {
    title: "Self-Service Portal",
    description: "Empower every user with no-code analytics",
    icon: Users,
    color: "orange"
  }
];

export function WhatIsPrism() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
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
            What is PRISM?
          </motion.div>
          
          <motion.h2
            className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-2">Your Analytics</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Transformation Partner
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            PRISM transforms how your organization thinks about data. Instead of scattered reports and conflicting metrics, 
            you get a <span className="font-semibold text-gray-900">unified intelligence platform</span> that turns every team member 
            into a <span className="font-semibold text-gray-900">confident decision-maker</span>.          </motion.p>
        </motion.div>

        {/* Main Visualization */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200/50">
            {/* Flow Diagram */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-12">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`relative group cursor-pointer ${
                    selectedFlow === step.id ? 'ring-2 ring-blue-500 ring-offset-4' : ''
                  }`}
                  initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: index === 1 ? -50 : 0 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0, 
                    y: 0 
                  } : { 
                    opacity: 0, 
                    x: index === 0 ? -50 : index === 2 ? 50 : 0, 
                    y: index === 1 ? -50 : 0 
                  }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                  onClick={() => setSelectedFlow(selectedFlow === step.id ? null : step.id)}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Connection Lines (for desktop) */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 transform -translate-y-1/2 z-0">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
                        style={{ transformOrigin: "left" }}
                      />
                      
                      {/* Animated Dot */}
                      <motion.div
                        className="absolute top-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2"
                        animate={isInView ? {
                          x: [0, 48, 0],
                        } : {}}
                        transition={{
                          duration: 2,
                          delay: 2 + index * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500 relative z-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm mb-4">
                      {step.description}
                    </p>

                    {/* Details (expanded view) */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: selectedFlow === step.id ? "auto" : 0,
                        opacity: selectedFlow === step.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-200">
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${step.gradient} rounded-full`} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What PRISM Is - Informational */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                What Makes PRISM Different
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Built on Databricks</h4>
                  <p className="text-sm text-gray-600">Enterprise-grade data platform providing scalable, secure analytics foundation</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Self-Service Analytics</h4>
                  <p className="text-sm text-gray-600">Empowers business users to create insights without technical barriers</p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Unified Metrics</h4>
                  <p className="text-sm text-gray-600">Single source of truth with governed parameters across all business units</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* Key Capabilities */}
        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] opacity-20" />
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Transform Your Analytics?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of data teams who have revolutionized their analytics with PRISM's powerful platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4" />
                  Start Free Trial
                </motion.button>
                
                <motion.button
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Award className="w-4 h-4" />
                  View Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}