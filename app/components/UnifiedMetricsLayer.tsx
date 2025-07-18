// app/components/UnifiedMetricsLayer.tsx
import React, { memo, useState, useCallback, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  GitBranch,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Play,
  Pause,
  Users,
  Database,
  Target,
  Layers,
  FileText,
  Eye,
  Settings,
  ChevronRight,
  Star,
  Sparkles,
  Activity,
  Code,
  Lock,
  Unlock,
  Tag,
  Calendar,
  TrendingUp,
  History,
  Search,
  Filter,
  Zap,
  Gauge,
  Server,
  HardDrive,
} from "lucide-react";

// Types
interface MetricParameter {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  category: "core" | "dimension" | "filter" | "aggregation" | "governance";
  status: string;
  description: string;
  highlight: string;
  values?: string[];
  details: string[];
  businessNote?: {
    title: string;
    content: string;
  };
  impact: string;
  dependencies: string[];
  governance: {
    approved: boolean;
    approver: string;
    approvalDate: string;
    reviewDate: string;
  };
}

interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  category: "revenue" | "engagement" | "performance" | "operational";
  formula: string;
  parameters: {
    [key: string]: string;
  };
  owner: string;
  status: "active" | "deprecated" | "draft";
  version: string;
  lastModified: string;
  usage: number;
  governance: {
    approved: boolean;
    approver: string;
    approvalDate: string;
    reviewDate: string;
  };
}

interface GovernanceRule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: "parameter" | "definition" | "approval" | "validation";
  status: "enforced" | "warning" | "info";
  impact: string;
  examples: string[];
}

// Enhanced parameter data structure incorporating governance
const metricParameters: MetricParameter[] = [
  {
    id: "core-metric",
    title: "Core Metric Definition",
    shortTitle: "Core Metric",
    icon: BarChart3,
    category: "core",
    status: "CORE DEFINITION",
    description: "The foundational metric structure that all business metrics inherit from",
    highlight: "CREATE METRIC business_metrics.{metric_name}(time_window, business_scope, aggregation_method, filters...)",
    details: [
      "Universal metric template for consistency",
      "Parameterized for flexibility and reusability",
      "Centralized governance and validation",
      "Automated lineage tracking",
      "Version control integration",
    ],
    businessNote: {
      title: "Universal Business Metric",
      content: "ANY METRIC = Business entities meeting criteria, measured over time period, aggregated using approved method, filtered by business rules.",
    },
    impact: "Ensures all metrics follow consistent structure and governance",
    dependencies: ["time_window", "business_scope", "aggregation_method"],
    governance: {
      approved: true,
      approver: "Data Governance Committee",
      approvalDate: "2024-01-01",
      reviewDate: "2024-07-01",
    },
  },
  {
    id: "time-window",
    title: "Time Window Parameter",
    shortTitle: "Time Window",
    icon: Clock,
    category: "dimension",
    status: "DIMENSION PARAMETER",
    description: "Defines the temporal scope for metric calculation with business-aligned time periods",
    highlight: "Balance attribution needs with operational reality for optimal business insights",
    values: ["real_time", "hourly", "daily", "weekly", "monthly", "quarterly", "yearly"],
    details: [
      "Real-time: Operational monitoring and alerts",
      "Hourly: Intraday performance tracking",
      "Daily: Standard operational reporting",
      "Weekly: Tactical business reviews",
      "Monthly: Standard business reporting",
      "Quarterly: Strategic planning cycles",
      "Yearly: Annual performance evaluation",
    ],
    impact: "Determines metric freshness and business relevance",
    dependencies: ["business_scope"],
    governance: {
      approved: true,
      approver: "Business Operations Team",
      approvalDate: "2024-01-05",
      reviewDate: "2024-04-05",
    },
  },
  {
    id: "business-scope",
    title: "Business Scope Parameter",
    shortTitle: "Business Scope",
    icon: Target,
    category: "dimension",
    status: "DIMENSION PARAMETER",
    description: "Defines which business entities and boundaries are included in metric calculations",
    highlight: "Scope selection directly impacts strategic decisions and resource allocation",
    values: ["global", "regional", "division", "team", "product", "customer_segment"],
    details: [
      "Global: Enterprise-wide metrics",
      "Regional: Geographic performance",
      "Division: Business unit analysis",
      "Team: Department-level metrics",
      "Product: Product-specific performance",
      "Customer_segment: Cohort analysis",
    ],
    impact: "Determines metric applicability and business context",
    dependencies: ["aggregation_method"],
    governance: {
      approved: true,
      approver: "Business Strategy Team",
      approvalDate: "2024-01-06",
      reviewDate: "2024-04-06",
    },
  },
  {
    id: "aggregation-method",
    title: "Aggregation Method",
    shortTitle: "Aggregation",
    icon: Layers,
    category: "aggregation",
    status: "AGGREGATION PARAMETER",
    description: "Specifies how data should be mathematically combined to produce the metric value",
    highlight: "Aggregation method determines the statistical meaning and business interpretation",
    values: ["sum", "average", "median", "count", "distinct_count", "min", "max", "percentile"],
    details: [
      "Sum: Total value accumulation",
      "Average: Mean value calculation",
      "Median: Middle value determination",
      "Count: Total occurrences",
      "Distinct_count: Unique occurrences",
      "Min/Max: Boundary values",
      "Percentile: Distribution analysis",
    ],
    impact: "Defines the mathematical interpretation of the metric",
    dependencies: ["data_source"],
    governance: {
      approved: true,
      approver: "Data Science Team",
      approvalDate: "2024-01-07",
      reviewDate: "2024-04-07",
    },
  },
  {
    id: "data-source",
    title: "Data Source Parameter",
    shortTitle: "Data Source",
    icon: Database,
    category: "filter",
    status: "FILTER PARAMETER",
    description: "Specifies which business systems and data sources provide the underlying data",
    highlight: "Data source selection affects metric accuracy, timeliness, and business context",
    values: ["operational_db", "data_warehouse", "streaming_events", "external_apis", "manual_input"],
    details: [
      "Operational_db: Live transactional data",
      "Data_warehouse: Historical analytical data",
      "Streaming_events: Real-time event data",
      "External_apis: Third-party integrations",
      "Manual_input: User-provided data",
    ],
    impact: "Determines data quality, latency, and reliability",
    dependencies: ["validation_rules"],
    governance: {
      approved: true,
      approver: "Data Engineering Team",
      approvalDate: "2024-01-08",
      reviewDate: "2024-04-08",
    },
  },
  {
    id: "validation-rules",
    title: "Validation Rules Engine",
    shortTitle: "Validation",
    icon: Shield,
    category: "governance",
    status: "GOVERNANCE CONTROL",
    description: "Automated validation ensuring parameter combinations produce consistent and reliable metrics",
    highlight: "Real-time validation prevents inconsistent metric definitions and data quality issues",
    details: [
      "Parameter combination validation",
      "Business logic coherence checks",
      "Data quality assessment",
      "Automated approval workflows",
      "Real-time feedback and alerts",
      "Audit trail maintenance",
    ],
    impact: "Ensures metric reliability and governance compliance",
    dependencies: ["parameter_registry"],
    governance: {
      approved: true,
      approver: "Data Governance Committee",
      approvalDate: "2024-01-09",
      reviewDate: "2024-04-09",
    },
  },
  {
    id: "parameter-registry",
    title: "Parameter Registry",
    shortTitle: "Registry",
    icon: FileText,
    category: "governance",
    status: "GOVERNANCE CONTROL",
    description: "Central registry for all parameter definitions, approved values, and governance policies",
    highlight: "Centralized governance with distributed self-service capabilities",
    details: [
      "Centralized parameter definitions",
      "Approved value catalogs",
      "Business justification tracking",
      "Impact analysis capabilities",
      "Version control integration",
      "Cross-metric consistency checks",
    ],
    impact: "Enables consistent parameter usage across all metrics",
    dependencies: [],
    governance: {
      approved: true,
      approver: "Data Governance Committee",
      approvalDate: "2024-01-10",
      reviewDate: "2024-04-10",
    },
  },
];

// Sample metric definitions using the parameter framework
const metricDefinitions: MetricDefinition[] = [
  {
    id: "monthly-recurring-revenue",
    name: "Monthly Recurring Revenue",
    description: "Total predictable monthly revenue from active subscriptions",
    category: "revenue",
    formula: "business_metrics.recurring_revenue(time_window='monthly', business_scope='global', aggregation_method='sum', data_source='operational_db')",
    parameters: {
      time_window: "monthly",
      business_scope: "global",
      aggregation_method: "sum",
      data_source: "operational_db",
    },
    owner: "Finance Team",
    status: "active",
    version: "v2.1",
    lastModified: "2024-01-15",
    usage: 847,
    governance: {
      approved: true,
      approver: "CFO",
      approvalDate: "2024-01-12",
      reviewDate: "2024-04-12",
    },
  },
  {
    id: "daily-active-users",
    name: "Daily Active Users",
    description: "Unique users who performed meaningful actions within a day",
    category: "engagement",
    formula: "business_metrics.active_users(time_window='daily', business_scope='product', aggregation_method='distinct_count', data_source='streaming_events')",
    parameters: {
      time_window: "daily",
      business_scope: "product",
      aggregation_method: "distinct_count",
      data_source: "streaming_events",
    },
    owner: "Product Team",
    status: "active",
    version: "v1.5",
    lastModified: "2024-01-14",
    usage: 623,
    governance: {
      approved: true,
      approver: "VP Product",
      approvalDate: "2024-01-11",
      reviewDate: "2024-04-11",
    },
  },
  {
    id: "query-performance",
    name: "Average Query Response Time",
    description: "Mean execution time for analytical queries",
    category: "performance",
    formula: "business_metrics.query_performance(time_window='real_time', business_scope='global', aggregation_method='average', data_source='operational_db')",
    parameters: {
      time_window: "real_time",
      business_scope: "global",
      aggregation_method: "average",
      data_source: "operational_db",
    },
    owner: "Engineering Team",
    status: "active",
    version: "v1.2",
    lastModified: "2024-01-13",
    usage: 312,
    governance: {
      approved: true,
      approver: "CTO",
      approvalDate: "2024-01-10",
      reviewDate: "2024-04-10",
    },
  },
];

const governanceRules: GovernanceRule[] = [
  {
    id: "parameter-validation",
    title: "Parameter Validation",
    description: "All parameter combinations must be validated before metric deployment",
    icon: Shield,
    category: "parameter",
    status: "enforced",
    impact: "Prevents invalid metric configurations and ensures data quality",
    examples: [
      "Time window must be compatible with data source freshness",
      "Business scope must align with aggregation method",
      "Validation rules must approve parameter combinations",
    ],
  },
  {
    id: "definition-standards",
    title: "Definition Standards",
    description: "All metrics must follow the universal parameter-based definition structure",
    icon: Code,
    category: "definition",
    status: "enforced",
    impact: "Ensures consistency and interoperability across all metrics",
    examples: [
      "business_metrics.metric_name(time_window, business_scope, aggregation_method, data_source)",
      "All parameters must be from approved parameter registry",
      "Business context must be documented for each parameter choice",
    ],
  },
  {
    id: "approval-workflow",
    title: "Metric Approval Workflow",
    description: "New metrics and parameter changes require stakeholder approval",
    icon: CheckCircle,
    category: "approval",
    status: "enforced",
    impact: "Maintains metric quality and business alignment",
    examples: [
      "Finance metrics require CFO approval",
      "Product metrics require VP Product approval",
      "Parameter changes require Data Governance Committee approval",
    ],
  },
  {
    id: "impact-analysis",
    title: "Impact Analysis",
    description: "Parameter changes must include downstream impact assessment",
    icon: Activity,
    category: "validation",
    status: "warning",
    impact: "Prevents breaking changes and maintains system stability",
    examples: [
      "Identify all metrics using the parameter",
      "Assess impact on dashboards and reports",
      "Notify affected stakeholders before changes",
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
const ParameterCard = memo(({
  parameter,
  isSelected,
  onSelect,
}: {
  parameter: MetricParameter;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const Icon = parameter.icon;
  const categoryColors = {
    core: "from-indigo-500 to-purple-600",
    dimension: "from-blue-500 to-cyan-600",
    filter: "from-green-500 to-teal-600",
    aggregation: "from-orange-500 to-red-600",
    governance: "from-purple-500 to-pink-600",
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
      onClick={() => onSelect(parameter.id)}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {parameter.status}
          </span>
          <div className="flex items-center gap-2">
            {parameter.governance.approved && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
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
          <h3 className="text-lg font-semibold text-gray-900">{parameter.title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
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
});

ParameterCard.displayName = 'ParameterCard';

const MetricCard = memo(({
  metric,
  isSelected,
  onSelect,
}: {
  metric: MetricDefinition;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const categoryColors = {
    revenue: "from-green-500 to-emerald-600",
    engagement: "from-blue-500 to-indigo-600",
    performance: "from-purple-500 to-violet-600",
    operational: "from-orange-500 to-red-600",
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
      onClick={() => onSelect(metric.id)}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={`
                w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[metric.category]}
                flex items-center justify-center
              `}
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">{metric.name}</h3>
              <p className="text-sm text-gray-500">{metric.owner}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              {metric.status}
            </span>
            {metric.governance.approved && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          {metric.description}
        </p>

        {/* Parameters */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Parameters:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(metric.parameters).map(([key, value]) => (
              <span
                key={key}
                className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium"
              >
                {key}: {value}
              </span>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">v{metric.version}</span>
          <span className="text-sm text-gray-500">{metric.usage} uses</span>
        </div>
      </div>
    </motion.div>
  );
});

MetricCard.displayName = 'MetricCard';

const GovernanceCard = memo(({ 
  rule,
  isSelected,
  onSelect,
}: { 
  rule: GovernanceRule;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const Icon = rule.icon;
  const statusColors = {
    enforced: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={`
        bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer group
        ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
        ${statusColors[rule.status]}
      `}
      onClick={() => onSelect(rule.id)}
    >
      <div className="flex items-start gap-3 mb-4">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{rule.title}</h3>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Impact</h4>
        <p className="text-sm text-gray-600">{rule.impact}</p>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Examples</h4>
        <ul className="space-y-1">
          {rule.examples.map((example, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <ChevronRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              {example}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

GovernanceCard.displayName = 'GovernanceCard';

// Main component
const UnifiedMetricsLayer = memo(function UnifiedMetricsLayer() {
  const [selectedParameter, setSelectedParameter] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedGovernanceRule, setSelectedGovernanceRule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parameters' | 'metrics' | 'governance'>('parameters');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'core' | 'dimension' | 'filter' | 'aggregation' | 'governance'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleParameterSelect = useCallback((id: string) => {
    setSelectedParameter(selectedParameter === id ? null : id);
  }, [selectedParameter]);

  const handleMetricSelect = useCallback((id: string) => {
    setSelectedMetric(selectedMetric === id ? null : id);
  }, [selectedMetric]);

  const handleGovernanceRuleSelect = useCallback((id: string) => {
    setSelectedGovernanceRule(selectedGovernanceRule === id ? null : id);
  }, [selectedGovernanceRule]);

  const selectedParameterData = useMemo(() => 
    selectedParameter ? metricParameters.find(p => p.id === selectedParameter) : null,
    [selectedParameter]
  );

  const selectedMetricData = useMemo(() => 
    selectedMetric ? metricDefinitions.find(m => m.id === selectedMetric) : null,
    [selectedMetric]
  );

  const selectedGovernanceRuleData = useMemo(() => 
    selectedGovernanceRule ? governanceRules.find(r => r.id === selectedGovernanceRule) : null,
    [selectedGovernanceRule]
  );

  const filteredParameters = useMemo(() => {
    if (categoryFilter === 'all') return metricParameters;
    return metricParameters.filter(param => param.category === categoryFilter);
  }, [categoryFilter]);

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
            className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 rounded-full text-indigo-600 font-medium text-sm mb-4"
          >
            <BarChart3 className="w-4 h-4" />
            Universal Metrics Framework
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Unified Metrics
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Layer
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Universal parameter-based framework for consistent metrics. One definition, governed parameters, reliable insights across your entire organization.
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
              { id: 'parameters', label: 'Parameters', icon: Settings },
              { id: 'metrics', label: 'Metrics', icon: BarChart3 },
              { id: 'governance', label: 'Governance', icon: Shield },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={activeTab === tab.id ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <tab.icon className="w-4 h-4" />
                </motion.div>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'parameters' && (
            <motion.div
              key="parameters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Filter */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-xl p-1 inline-flex shadow-sm border border-gray-200">
                  {[
                    { id: 'all', label: 'All Parameters', icon: Target },
                    { id: 'core', label: 'Core', icon: BarChart3 },
                    { id: 'dimension', label: 'Dimensions', icon: Layers },
                    { id: 'filter', label: 'Filters', icon: Filter },
                    { id: 'aggregation', label: 'Aggregation', icon: TrendingUp },
                    { id: 'governance', label: 'Governance', icon: Shield },
                  ].map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setCategoryFilter(category.id as any)}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm
                        ${categoryFilter === category.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Main Content Grid */}
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
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <AnimatePresence mode="wait">
                        {selectedParameterData ? (
                          <motion.div
                            key={selectedParameterData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`
                                w-12 h-12 rounded-lg bg-gradient-to-br 
                                ${selectedParameterData.category === 'core' ? 'from-indigo-500 to-purple-600' : 
                                  selectedParameterData.category === 'dimension' ? 'from-blue-500 to-cyan-600' : 
                                  selectedParameterData.category === 'filter' ? 'from-green-500 to-teal-600' :
                                  selectedParameterData.category === 'aggregation' ? 'from-orange-500 to-red-600' :
                                  'from-purple-500 to-pink-600'}
                                flex items-center justify-center
                              `}>
                                <selectedParameterData.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedParameterData.title}</h3>
                                <span className={`
                                  text-xs font-medium
                                  ${selectedParameterData.category === 'core' ? 'text-indigo-600' : 
                                    selectedParameterData.category === 'dimension' ? 'text-blue-600' : 
                                    selectedParameterData.category === 'filter' ? 'text-green-600' :
                                    selectedParameterData.category === 'aggregation' ? 'text-orange-600' :
                                    'text-purple-600'}
                                `}>
                                  {selectedParameterData.status}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {selectedParameterData.description}
                            </p>

                            {/* Highlight */}
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-4">
                              <p className="text-sm font-medium">{selectedParameterData.highlight}</p>
                            </div>

                            {/* Values */}
                            {selectedParameterData.values && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Approved Values</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedParameterData.values.map((value) => (
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
                            {selectedParameterData.details && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                                <ul className="space-y-2">
                                  {selectedParameterData.details.map((detail, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 text-sm">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Business Impact */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Business Impact</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">{selectedParameterData.impact}</p>
                            </div>

                            {/* Dependencies */}
                            {selectedParameterData.dependencies && selectedParameterData.dependencies.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Dependencies</h4>
                                <div className="space-y-2">
                                  {selectedParameterData.dependencies.map((dep, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <ArrowRight className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-700">{dep}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Governance Info */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Governance</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  {selectedParameterData.governance.approved ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                  )}
                                  <span className="text-gray-700">
                                    {selectedParameterData.governance.approved ? 'Approved' : 'Pending Approval'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Approver:</span>
                                  <span className="font-medium">{selectedParameterData.governance.approver}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Approved:</span>
                                  <span className="font-medium">{selectedParameterData.governance.approvalDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Review Date:</span>
                                  <span className="font-medium">{selectedParameterData.governance.reviewDate}</span>
                                </div>
                              </div>
                            </div>

                            {/* Business Note */}
                            {selectedParameterData.businessNote && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 mb-2">
                                  {selectedParameterData.businessNote.title}
                                </h4>
                                <p className="text-blue-800 text-sm">
                                  {selectedParameterData.businessNote.content}
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
                              Click on any parameter card to explore its details, approved values, and business context.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameter-Based Metrics</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  All metrics follow the universal parameter framework for consistency and governance.
                </p>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {metricDefinitions.map((metric) => (
                  <MetricCard
                    key={metric.id}
                    metric={metric}
                    isSelected={selectedMetric === metric.id}
                    onSelect={handleMetricSelect}
                  />
                ))}
              </div>

              {/* Selected Metric Details */}
              <AnimatePresence mode="wait">
                {selectedMetricData ? (
                  <motion.div
                    key={selectedMetricData.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                        selectedMetricData.category === 'revenue' ? 'from-green-500 to-emerald-600' :
                        selectedMetricData.category === 'engagement' ? 'from-blue-500 to-indigo-600' :
                        selectedMetricData.category === 'performance' ? 'from-purple-500 to-violet-600' :
                        'from-orange-500 to-red-600'
                      } flex items-center justify-center`}>
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedMetricData.name}</h3>
                        <p className="text-gray-600">{selectedMetricData.description}</p>
                      </div>
                    </div>

                    {/* Parameter-based Formula */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Universal Formula</h4>
                      <code className="text-sm text-gray-700 bg-white px-2 py-1 rounded">
                        {selectedMetricData.formula}
                      </code>
                    </div>

                    {/* Parameter Configuration */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Parameter Configuration</h4>
                        <div className="space-y-3">
                          {Object.entries(selectedMetricData.parameters).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-900">{key.replace('_', ' ')}</span>
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Governance</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Owner:</span>
                            <span className="font-medium">{selectedMetricData.owner}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Version:</span>
                            <span className="font-medium">v{selectedMetricData.version}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Approved by:</span>
                            <span className="font-medium">{selectedMetricData.governance.approver}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Usage:</span>
                            <span className="font-medium">{selectedMetricData.usage} times</span>
                          </div>
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
                      Explore Parameter-Based Metrics
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Click on any metric to see how it leverages the universal parameter framework for consistency.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'governance' && (
            <motion.div
              key="governance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Universal Governance Framework</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Comprehensive governance rules ensuring parameter-based metrics maintain quality, consistency, and reliability.
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Governance Cards */}
                <motion.div
                  className="lg:col-span-2"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={containerVariants}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {governanceRules.map((rule) => (
                      <GovernanceCard 
                        key={rule.id} 
                        rule={rule}
                        isSelected={selectedGovernanceRule === rule.id}
                        onSelect={handleGovernanceRuleSelect}
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
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <AnimatePresence mode="wait">
                        {selectedGovernanceRuleData ? (
                          <motion.div
                            key={selectedGovernanceRuleData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <selectedGovernanceRuleData.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedGovernanceRuleData.title}</h3>
                                <span className={`
                                  text-xs font-medium px-2 py-1 rounded-full
                                  ${selectedGovernanceRuleData.status === 'enforced' ? 'bg-green-100 text-green-700' :
                                    selectedGovernanceRuleData.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-blue-100 text-blue-700'}
                                `}>
                                  {selectedGovernanceRuleData.status.toUpperCase()}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {selectedGovernanceRuleData.description}
                            </p>

                            {/* Category */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                <Tag className="w-4 h-4" />
                                {selectedGovernanceRuleData.category}
                              </span>
                            </div>

                            {/* Business Impact */}
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-4">
                              <h4 className="font-semibold mb-2">Business Impact</h4>
                              <p className="text-sm">{selectedGovernanceRuleData.impact}</p>
                            </div>

                            {/* Examples */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Implementation Examples</h4>
                              <ul className="space-y-2">
                                {selectedGovernanceRuleData.examples.map((example, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{example}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Compliance Status */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2">Compliance Status</h4>
                              <div className="flex items-center gap-2">
                                {selectedGovernanceRuleData.status === 'enforced' ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-blue-800 text-sm">Actively enforced across all metrics</span>
                                  </>
                                ) : selectedGovernanceRuleData.status === 'warning' ? (
                                  <>
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                    <span className="text-blue-800 text-sm">Warning level - recommended compliance</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4 text-blue-500" />
                                    <span className="text-blue-800 text-sm">Informational guidance for best practices</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center"
                          >
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Shield className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Select a Governance Rule
                            </h3>
                            <p className="text-gray-600 text-sm">
                              Click on any governance rule to explore its details, implementation examples, and compliance status.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
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
                <Settings className="w-8 h-8 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                Ready to Implement Universal Metrics?
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Transform your organization with parameter-based metrics governance. One framework, consistent definitions, reliable insights.
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

UnifiedMetricsLayer.displayName = 'UnifiedMetricsLayer';

export default UnifiedMetricsLayer;