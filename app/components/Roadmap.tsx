import { motion, useInView } from "framer-motion";
import { Clock, CheckCircle, Play, Calendar, Zap, Target, Sparkles, Award, TrendingUp } from "lucide-react";
import { useRef, useState } from "react";

const roadmapItems = [
  {
    date: "2025",
    phase: "Define",
    title: "Strategy & Business Requirements",
    description:
      "Establish the business case, success metrics, and strategic vision that will guide all platform decisions and investments.",
    status: "planned",
  },
  {
    date: "",
    phase: "Define",
    title: "Governance & Scope",
    description:
      "Define the rules, boundaries, and governance framework that wensure plator coetty wille octerree wits induded in the intial release.",
    status: "planned",
  },
  {
    date: "",
    phase: "Design",
    title: "Technical Architecture & Data Design",
    description:
      "Design the underlying platform infrastructure, data models, and technical systems that will support scalable analytics capabilities.",
    status: "planned",
  },
  {
    date: "",
    phase: "Design",
    title: "User Experience & Content Design",
    description:
      "Create the user interfaces, interaction patterns, and content structures that will make analytics accessible and valuable for different audience",
    status: "planned",
  },
  {
    date: "",
    phase: "Develop",
    title: "Platform & Infrastructure",
    description:
      "Intergrate with the core DataBricks environment, technical infrastructure, and foundational systems that power the analytics platform.",
    status: "planned",
  },
  {
    date: "",
    phase: "Develop",
    title: "Analytics & Content Development",
    description:
      "Create the semantic layer, metric definitions, analytics templates, and dashboard components that deliver business value.",
    status: "planned",
  },
  {
    date: "",
    phase: "Develop",
    title: "Integration & Quality Assurance",
    description:
      "Connect all systems together while implementing comprehensive testing, monitoring, and quality controls to ensure reliability.",
    status: "planned",
  },
  {
    date: "",
    phase: "Deliver",
    title: "Deployment & Operations",
    description:
      "Launch the platform into production with proper monitoring, support processes, and operational procedures to keep it running smoothly.",
    status: "planned",
  },
  {
    date: "",
    phase: "Deliver",
    title: "Change Management & Adoption",
    description:
      "Drive user adoption through training, communication, and community building to ensure the platform delivers its intended business value.",
    status: "planned",
  },
  {
    date: "",
    phase: "Deliver",
    title: "Value Realization & Growth",
    description:
      "Measure success, demonstrate ROI, and continuously evolve the platform based on user feedback and changing business needs.",
    status: "planned",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function Roadmap() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "in-progress":
        return "bg-blue-100 text-blue-600";
      case "planned":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return "Unknown";
    }
  };

  return (
    <section 
      ref={containerRef}
      id="roadmap" 
      className="relative py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50/30 to-green-50/20 overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
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
            <span className="block mb-2">Product Development</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Roadmap
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Built on <span className="font-semibold text-gray-900">Databricks</span> with enterprise governance,{" "}
            <span className="font-semibold text-gray-900">strategic milestones</span>, and{" "}
            <span className="font-semibold text-gray-900">continuous innovation</span>.
            <br />
            Integrated components create compound analytical value.
          </motion.p>
          
          {/* Phase Overview */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {["Define", "Design", "Develop", "Deliver"].map((phase, index) => (
              <motion.div
                key={phase}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                  selectedPhase === phase 
                    ? 'bg-blue-100 border-blue-300 text-blue-700' 
                    : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={() => setSelectedPhase(selectedPhase === phase ? null : phase)}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-red-100 text-red-600' :
                  index === 1 ? 'bg-yellow-100 text-yellow-600' :
                  index === 2 ? 'bg-blue-100 text-blue-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{phase}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Enhanced Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 rounded-full hidden lg:block shadow-lg"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative"
                variants={fadeInUp}
              >
                {/* Mobile/Tablet Layout */}
                <div className="lg:hidden">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-text-muted">
                        {item.date}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(item.status)}`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    {/* Phase tag */}
                    <div className="mb-2">
                      <span className="inline-block px-0 py-1 bg-primary-100 text-primary-700 text-sm font-bold uppercase rounded">
                        {item.phase}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </div>

                {/* Enhanced Desktop Layout */}
                <div className="hidden lg:block">
                  {/* Enhanced Timeline dot */}
                  <motion.div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                  >
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : item.status === 'in-progress' ? (
                      <Play className="w-4 h-4 text-white" />
                    ) : (
                      <Clock className="w-4 h-4 text-white" />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div
                    className={`flex items-center ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
                  >
                    {/* Date */}
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                    >
                      <span className="text-lg font-semibold text-text-muted">
                        {item.date}
                      </span>
                    </div>

                    {/* Card */}
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pl-8" : "pr-8"}`}
                    >
                      <motion.div
                        className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 overflow-hidden relative group ${
                          selectedPhase === item.phase ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
                        whileHover={{ scale: 1.02, y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                        onClick={() => setSelectedPhase(selectedPhase === item.phase ? null : item.phase)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Gradient Background Effect */}
                        <motion.div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                            item.phase === 'Define' ? 'bg-gradient-to-br from-red-400/10 to-orange-400/10' :
                            item.phase === 'Design' ? 'bg-gradient-to-br from-yellow-400/10 to-orange-400/10' :
                            item.phase === 'Develop' ? 'bg-gradient-to-br from-blue-400/10 to-cyan-400/10' :
                            'bg-gradient-to-br from-green-400/10 to-emerald-400/10'
                          }`}
                        />
                        {/* Enhanced Phase tag */}
                        <div className="relative z-10 mb-4">
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase shadow-md ${
                              item.phase === 'Define' ? 'bg-gradient-to-r from-red-100 to-orange-100 text-red-700 border border-red-200' :
                              item.phase === 'Design' ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border border-yellow-200' :
                              item.phase === 'Develop' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200' :
                              'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                            }`}>
                              {item.phase === 'Define' && <Target className="w-3 h-3" />}
                              {item.phase === 'Design' && <Sparkles className="w-3 h-3" />}
                              {item.phase === 'Develop' && <Zap className="w-3 h-3" />}
                              {item.phase === 'Deliver' && <Award className="w-3 h-3" />}
                              {item.phase}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                              {item.date || 'TBD'}
                            </span>
                          </div>
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors pr-4">
                              {item.title}
                            </h3>
                            <span
                              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold shadow-sm border ${getStatusStyles(item.status)} ${
                                item.status === 'completed' ? 'border-green-200' :
                                item.status === 'in-progress' ? 'border-blue-200' :
                                'border-yellow-200'
                              }`}
                            >
                              {item.status === 'completed' ? <CheckCircle className="w-3 h-3" /> :
                               item.status === 'in-progress' ? <Play className="w-3 h-3" /> :
                               <Calendar className="w-3 h-3" />}
                              {getStatusText(item.status)}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                            {item.description}
                          </p>
                          
                          {/* Progress Indicator */}
                          <div className="mt-4 pt-4 border-t border-gray-200/50">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                              <span>Progress</span>
                              <span>{item.status === 'completed' ? '100%' : item.status === 'in-progress' ? '65%' : '0%'}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                className={`h-2 rounded-full ${
                                  item.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                  item.status === 'in-progress' ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                                  'bg-gray-300'
                                }`}
                                initial={{ width: 0 }}
                                animate={isInView ? { 
                                  width: item.status === 'completed' ? '100%' : 
                                         item.status === 'in-progress' ? '65%' : '0%' 
                                } : { width: 0 }}
                                transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover Sparkle Effect */}
                        <motion.div
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{
                            rotate: selectedPhase === item.phase ? [0, 15, -15, 0] : 0,
                          }}
                          transition={{
                            duration: 2,
                            repeat: selectedPhase === item.phase ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                        >
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
