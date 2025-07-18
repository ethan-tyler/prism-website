// app/components/ParameterGovernance.tsx
import { memo, useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Database,
  Clock,
  Search,
  FileText,
  Shield,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Zap,
  Settings,
  Eye,
  Star,
} from "lucide-react";

// Types
interface Parameter {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  category: "core" | "parameter" | "governance";
  status: string;
  description: string;
  highlight: string;
  values?: string[];
  details?: string[];
  businessNote?: {
    title: string;
    content: string;
  };
}

// Optimized data structure
const parameterData: Parameter[] = [
  {
    id: "core",
    title: "Core Business Metric",
    shortTitle: "Core Metric",
    icon: Database,
    category: "core",
    status: "CORE METRIC",
    description:
      "The single source of truth for business metric calculations. All measurements flow through this parameterized definition.",
    highlight:
      "CREATE METRIC business_metrics.metric_name(time_window, business_scope, data_source, ...)",
    details: [
      "Single source of truth for all business metrics",
      "Parameterized for flexibility and consistency",
      "Centralized definition with distributed usage",
      "Automated validation and governance",
    ],
    businessNote: {
      title: "Universal Definition",
      content:
        "ANY METRIC = Business entities meeting criteria, measured over time, calculated using approved methodology.",
    },
  },
  {
    id: "time-window",
    title: "Time Window",
    shortTitle: "Time Window",
    icon: Clock,
    category: "parameter",
    status: "PARAMETER",
    description:
      "Defines the temporal scope for metric calculation with business-aligned time periods.",
    highlight:
      "Balance attribution needs with operational reality for optimal business insights.",
    values: [
      "real_time",
      "daily",
      "weekly",
      "monthly",
      "quarterly",
      "annually",
    ],
    details: [
      "Real-time: Operational monitoring",
      "Daily: Operations tracking",
      "Weekly: Tactical reviews",
      "Monthly: Standard reporting",
      "Quarterly: Strategic planning",
      "Annually: Goal setting",
    ],
  },
  {
    id: "business-scope",
    title: "Business Scope",
    shortTitle: "Business Scope",
    icon: Search,
    category: "parameter",
    status: "PARAMETER",
    description:
      "Defines which business entities are included in metric calculations.",
    highlight:
      "Scope selection directly impacts strategic decisions and business outcomes.",
    values: [
      "core_business",
      "extended_business",
      "total_addressable",
      "active_only",
    ],
    details: [
      "Core business: Primary revenue drivers",
      "Extended business: Core plus partners",
      "Total addressable: All opportunities",
      "Active only: Currently engaged entities",
    ],
  },
  {
    id: "data-source",
    title: "Data Source",
    shortTitle: "Data Source",
    icon: Database,
    category: "parameter",
    status: "PARAMETER",
    description:
      "Specifies which business systems provide data for metric calculations.",
    highlight:
      "Source selection affects decision speed, accuracy, and business context.",
    values: [
      "operational_systems",
      "financial_systems",
      "crm_data",
      "marketing_data",
    ],
    details: [
      "Operational systems: Core business processes",
      "Financial systems: Revenue and cost data",
      "CRM data: Customer relationships",
      "Marketing data: Campaign and lead data",
    ],
  },
  {
    id: "registry",
    title: "Parameter Registry",
    shortTitle: "Registry",
    icon: FileText,
    category: "governance",
    status: "GOVERNANCE",
    description:
      "Central registry for all parameter definitions and approved values with business justifications.",
    highlight:
      "Centralized governance with distributed self-service capabilities.",
    details: [
      "Centralized parameter governance",
      "Business case validation",
      "ROI impact tracking",
      "Cross-metric consistency",
    ],
  },
  {
    id: "validation",
    title: "Validation Engine",
    shortTitle: "Validation",
    icon: Shield,
    category: "governance",
    status: "VALIDATION",
    description:
      "Automated validation ensuring parameter combinations drive consistent business insights.",
    highlight:
      "Real-time validation prevents inconsistent business measurements.",
    details: [
      "Parameter combination validation",
      "Business logic coherence",
      "Automated approval workflows",
      "Real-time feedback",
    ],
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
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

// Memoized card component
const ParameterCard = memo(
  ({
    parameter,
    isSelected,
    onSelect,
  }: {
    parameter: Parameter;
    isSelected: boolean;
    onSelect: (id: string) => void;
  }) => {
    const Icon = parameter.icon;
    const categoryColors = {
      core: "from-indigo-500 to-purple-600",
      parameter: "from-blue-500 to-cyan-600",
      governance: "from-emerald-500 to-teal-600",
    };

    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className={`
        relative cursor-pointer group
        ${isSelected ? "ring-2 ring-indigo-500 ring-offset-2" : ""}
      `}
        onClick={() => onSelect(parameter.id)}
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl hover:bg-white/80 transition-all duration-500">
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${
              parameter.category === "core"
                ? "bg-indigo-100 text-indigo-700"
                : parameter.category === "parameter"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-emerald-100 text-emerald-700"
            }
          `}
            >
              {parameter.status}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>

          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className={`
              w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[parameter.category]}
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
            <h3 className="text-lg font-semibold text-gray-900">
              {parameter.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {parameter.description}
          </p>

          {/* Values Preview */}
          {parameter.values && (
            <div className="flex flex-wrap gap-1">
              {parameter.values.slice(0, 3).map((value) => (
                <span
                  key={value}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {value}
                </span>
              ))}
              {parameter.values.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{parameter.values.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

ParameterCard.displayName = "ParameterCard";

// Main component
export const ParameterGovernance = memo(function ParameterGovernance() {
  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "parameters" | "governance"
  >("overview");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleParameterSelect = useCallback(
    (id: string) => {
      setSelectedParameter(selectedParameter === id ? null : id);
    },
    [selectedParameter]
  );

  const selectedData = useMemo(
    () =>
      selectedParameter
        ? parameterData.find((p) => p.id === selectedParameter)
        : null,
    [selectedParameter]
  );

  const filteredParameters = useMemo(() => {
    if (activeTab === "overview") return parameterData;
    return parameterData.filter((p) =>
      activeTab === "parameters"
        ? p.category === "parameter"
        : p.category === "governance"
    );
  }, [activeTab]);

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
            <span className="block mb-2">Universal Parameter</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Framework
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Built on <span className="font-semibold text-gray-900">Databricks</span> with enterprise governance,{" "}
            <span className="font-semibold text-gray-900">parameter consistency</span>, and{" "}
            <span className="font-semibold text-gray-900">unified metrics</span>.
            <br />
            Integrated components create compound analytical value.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="bg-gray-100 rounded-xl p-1 inline-flex">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "parameters", label: "Parameters", icon: Zap },
              { id: "governance", label: "Governance", icon: Shield },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "overview" | "parameters" | "governance"
                  )
                }
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={
                    activeTab === tab.id ? { rotate: 360 } : { rotate: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <tab.icon className="w-4 h-4" />
                </motion.div>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Parameter Cards */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {filteredParameters.map((parameter) => (
                <ParameterCard
                  key={parameter.id}
                  parameter={parameter}
                  isSelected={selectedParameter === parameter.id}
                  onSelect={handleParameterSelect}
                />
              ))}
            </div>
          </motion.div>

          {/* Detail Panel */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="sticky top-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
                <AnimatePresence mode="wait">
                  {selectedData ? (
                    <motion.div
                      key={selectedData.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`
                          w-12 h-12 rounded-lg bg-gradient-to-br 
                          ${
                            selectedData.category === "core"
                              ? "from-indigo-500 to-purple-600"
                              : selectedData.category === "parameter"
                                ? "from-blue-500 to-cyan-600"
                                : "from-emerald-500 to-teal-600"
                          }
                          flex items-center justify-center
                        `}
                        >
                          <selectedData.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedData.title}
                          </h3>
                          <span
                            className={`
                            text-xs font-medium
                            ${
                              selectedData.category === "core"
                                ? "text-indigo-600"
                                : selectedData.category === "parameter"
                                  ? "text-blue-600"
                                  : "text-emerald-600"
                            }
                          `}
                          >
                            {selectedData.status}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {selectedData.description}
                      </p>

                      {/* Highlight */}
                      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white p-6 rounded-xl mb-6 shadow-lg">
                        <p className="text-sm font-semibold leading-relaxed">
                          {selectedData.highlight}
                        </p>
                      </div>

                      {/* Values */}
                      {selectedData.values && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Approved Values
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedData.values.map((value) => (
                              <span
                                key={value}
                                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                              >
                                {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Details */}
                      {selectedData.details && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {selectedData.details.map((detail, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Business Note */}
                      {selectedData.businessNote && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">
                            {selectedData.businessNote.title}
                          </h4>
                          <p className="text-blue-800 text-sm">
                            {selectedData.businessNote.content}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Select a Parameter
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Click on any parameter card to explore its details,
                        approved values, and business context.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

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
                <Star className="w-8 h-8 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                Ready to Eliminate Metric Confusion?
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Transform your organization&apos;s analytics with universal
                parameter governance. One metric, governed parameters,
                consistent insights.
              </p>
              <motion.button
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
