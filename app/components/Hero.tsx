import { memo, useState, useEffect, useCallback } from "react";
import { ArrowRight, Sparkles, Play, Shield, Zap, Users, TrendingUp, Award } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const Hero = memo(function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVideoPlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const stats = [
    { 
      value: "99.9%", 
      label: "Uptime SLA", 
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      description: "Enterprise-grade reliability"
    },
    { 
      value: "<100ms", 
      label: "Query Response", 
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      description: "Lightning-fast analytics"
    },
    { 
      value: "50K+", 
      label: "Daily Queries", 
      icon: TrendingUp,
      color: "from-blue-500 to-purple-600",
      description: "Trusted by data teams"
    },
  ];

  const features = [
    {
      title: "Real-time Processing",
      description: "Stream processing with sub-second latency",
      icon: Zap
    },
    {
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption",
      icon: Shield
    },
    {
      title: "Collaborative Platform",
      description: "Built for teams of all sizes",
      icon: Users
    }
  ];

  if (!mounted) return null;

  return (
    <motion.section 
      style={{ opacity }}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-16"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Sophisticated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(120,119,198,0.1),transparent)] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div
            className="order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            {/* Premium Status Badge */}
            <motion.div
              variants={fadeInUp}
              className="relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50 rounded-full mb-8 shadow-lg shadow-emerald-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-sm" />
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-emerald-800 to-blue-800 bg-clip-text text-transparent">
                ✨ Next-Generation Analytics Platform — Now Live
              </span>
              <Award className="w-4 h-4 text-emerald-600" />
            </motion.div>

            {/* Premium Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]"
            >
              <span className="block mb-2">Unlock the Future of</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Enterprise Analytics
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mb-8 font-light"
            >
              Transform decision-making with{" "}
              <span className="font-semibold text-gray-900">real-time insights</span>,{" "}
              <span className="font-semibold text-gray-900">predictive analytics</span>, and{" "}
              <span className="font-semibold text-gray-900">enterprise-grade security</span>{" "}
              — all in one unified platform.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 mb-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                >
                  <feature.icon className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium Stats Grid */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="relative group"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-all duration-500" />
                  <div className="relative bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/25 overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/40"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                onClick={handleVideoPlay}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-gray-200 overflow-hidden transition-all hover:border-gray-300 hover:shadow-xl hover:shadow-black/5"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white ml-0.5" />
                  </div>
                  Watch Demo
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Premium Visual Section */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y: y1 }}
          >
            <div className="relative">
              {/* Enhanced Glow Effect */}
              <motion.div 
                className="absolute -inset-8 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl opacity-20 blur-3xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Premium Dashboard Card */}
              <motion.div
                className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 preserve-3d"
                whileHover={{
                  rotateY: -3,
                  rotateX: 2,
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                {/* Premium Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 backdrop-blur-sm px-6 py-4 border-b border-gray-200/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <img src="/prism_logo.svg" alt="PRISM" className="w-6 h-6" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-lg">
                          PRISM Analytics
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          Live Dashboard
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-red-400 shadow-sm" 
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" 
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-green-400 shadow-sm" 
                        whileHover={{ scale: 1.2 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Premium Card Content */}
                <div className="p-8 bg-gradient-to-br from-gray-50/30 to-white">
                  {/* Enhanced Chart */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Performance Metrics
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Real-time
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-end gap-1 h-40 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-4">
                        {[30, 55, 40, 75, 60, 85, 95, 70, 90, 65, 80, 100].map((height, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-blue-500 via-purple-500 to-cyan-400 rounded-t-sm transform-origin-bottom shadow-sm"
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: height / 100, opacity: 1 }}
                            transition={{
                              delay: 1.2 + i * 0.08,
                              duration: 0.6,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            style={{ height: `${height}%` }}
                            whileHover={{ 
                              scaleY: (height + 10) / 100,
                              transition: { duration: 0.2 }
                            }}
                          />
                        ))}
                      </div>
                      <div className="absolute top-2 right-4 text-xs text-gray-400 font-mono">
                        +23.5% ↗
                      </div>
                    </div>
                  </div>

                  {/* Premium Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100/50 shadow-sm"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">ARR Growth</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        $12.4M
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                        <span className="text-sm font-semibold">+28.5%</span>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl p-5 border border-emerald-100/50 shadow-sm"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-700">Enterprise Clients</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        2,847
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                        <span className="text-sm font-semibold">+15.2%</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Premium Floating Elements */}
              <motion.div
                className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="text-xs font-semibold text-gray-700">AI Insights</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-4 text-white"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-semibold">SOC 2 Compliant</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
});
