// app/components/AnalyticsLibrary.tsx
import React, { memo, useState, useCallback, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Library,
  Code,
  Package,
  Users,
  Star,
  Download,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  FileText,
  GitBranch,
  CheckCircle,
  Clock,
  Eye,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Settings,
  Search,
  Filter,
  Tag,
  Sparkles,
  Database,
  Layers,
  Shield,
  Target,
  BookOpen,
  Bookmark,
  Copy,
  Share2,
  Heart,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

// Types
interface AnalyticsFunction {
  id: string;
  name: string;
  description: string;
  category: "aggregation" | "statistical" | "time-series" | "visualization" | "ml" | "utility";
  complexity: "beginner" | "intermediate" | "advanced";
  codeExample: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  returnType: string;
  usage: number;
  rating: number;
  author: string;
  lastUpdated: string;
  tags: string[];
  examples: {
    title: string;
    description: string;
    code: string;
  }[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: "dashboard" | "report" | "analysis" | "visualization";
  preview: string;
  features: string[];
  complexity: "beginner" | "intermediate" | "advanced";
  downloads: number;
  rating: number;
  author: string;
  lastUpdated: string;
  tags: string[];
}

interface LibraryStats {
  totalFunctions: number;
  totalTemplates: number;
  totalDownloads: number;
  activeUsers: number;
  avgRating: number;
  categories: {
    name: string;
    count: number;
    growth: string;
  }[];
}

// Sample data
const analyticsStats: LibraryStats = {
  totalFunctions: 247,
  totalTemplates: 89,
  totalDownloads: 15432,
  activeUsers: 1247,
  avgRating: 4.7,
  categories: [
    { name: "Aggregation", count: 45, growth: "+12%" },
    { name: "Statistical", count: 38, growth: "+8%" },
    { name: "Time Series", count: 32, growth: "+15%" },
    { name: "Visualization", count: 67, growth: "+22%" },
    { name: "ML/AI", count: 28, growth: "+35%" },
    { name: "Utility", count: 37, growth: "+6%" },
  ],
};

const analyticsFunctions: AnalyticsFunction[] = [
  {
    id: "cohort-analysis",
    name: "cohort_analysis",
    description: "Comprehensive cohort analysis with retention metrics and behavioral patterns",
    category: "statistical",
    complexity: "intermediate",
    codeExample: "SELECT * FROM cohort_analysis(user_table, event_table, cohort_period='month')",
    parameters: [
      { name: "user_table", type: "table", description: "User dimension table", required: true },
      { name: "event_table", type: "table", description: "Event fact table", required: true },
      { name: "cohort_period", type: "string", description: "Cohort grouping period", required: false },
      { name: "retention_periods", type: "array", description: "Periods to measure retention", required: false },
    ],
    returnType: "table",
    usage: 234,
    rating: 4.8,
    author: "Data Science Team",
    lastUpdated: "2024-01-15",
    tags: ["cohort", "retention", "user-behavior", "statistical"],
    examples: [
      {
        title: "Monthly User Cohorts",
        description: "Analyze user retention by monthly cohorts",
        code: "SELECT * FROM cohort_analysis(users, events, cohort_period='month', retention_periods=[1,3,6,12])",
      },
      {
        title: "Product Feature Adoption",
        description: "Track feature adoption across user cohorts",
        code: "SELECT * FROM cohort_analysis(users, feature_events, cohort_period='week', retention_periods=[1,2,4,8])",
      },
    ],
  },
  {
    id: "anomaly-detection",
    name: "detect_anomalies",
    description: "Machine learning-based anomaly detection for time series data",
    category: "ml",
    complexity: "advanced",
    codeExample: "SELECT * FROM detect_anomalies(metrics_table, metric_column, sensitivity=0.95)",
    parameters: [
      { name: "input_table", type: "table", description: "Input time series data", required: true },
      { name: "metric_column", type: "string", description: "Column to analyze for anomalies", required: true },
      { name: "sensitivity", type: "float", description: "Detection sensitivity (0-1)", required: false },
      { name: "algorithm", type: "string", description: "ML algorithm to use", required: false },
    ],
    returnType: "table",
    usage: 156,
    rating: 4.6,
    author: "ML Engineering Team",
    lastUpdated: "2024-01-12",
    tags: ["ml", "anomaly", "time-series", "detection"],
    examples: [
      {
        title: "Revenue Anomaly Detection",
        description: "Detect unusual patterns in daily revenue",
        code: "SELECT * FROM detect_anomalies(daily_revenue, revenue_amount, sensitivity=0.99)",
      },
      {
        title: "User Engagement Anomalies",
        description: "Identify unusual spikes or drops in user activity",
        code: "SELECT * FROM detect_anomalies(user_metrics, daily_active_users, algorithm='isolation_forest')",
      },
    ],
  },
  {
    id: "funnel-analysis",
    name: "funnel_analysis",
    description: "Multi-step funnel analysis with conversion rates and drop-off points",
    category: "statistical",
    complexity: "intermediate",
    codeExample: "SELECT * FROM funnel_analysis(events, steps=['signup', 'onboard', 'purchase'])",
    parameters: [
      { name: "events_table", type: "table", description: "Event tracking table", required: true },
      { name: "steps", type: "array", description: "Funnel steps in order", required: true },
      { name: "user_id_column", type: "string", description: "User identifier column", required: false },
      { name: "time_window", type: "string", description: "Time window for funnel completion", required: false },
    ],
    returnType: "table",
    usage: 189,
    rating: 4.9,
    author: "Product Analytics Team",
    lastUpdated: "2024-01-10",
    tags: ["funnel", "conversion", "user-journey", "product"],
    examples: [
      {
        title: "Purchase Funnel",
        description: "Analyze the complete purchase funnel",
        code: "SELECT * FROM funnel_analysis(user_events, steps=['view_product', 'add_cart', 'checkout', 'purchase'])",
      },
      {
        title: "Onboarding Funnel",
        description: "Track user onboarding completion rates",
        code: "SELECT * FROM funnel_analysis(onboarding_events, steps=['signup', 'verify_email', 'complete_profile', 'first_action'])",
      },
    ],
  },
  {
    id: "time-series-forecast",
    name: "forecast_timeseries",
    description: "Advanced time series forecasting with multiple algorithms and confidence intervals",
    category: "time-series",
    complexity: "advanced",
    codeExample: "SELECT * FROM forecast_timeseries(historical_data, periods=30, algorithm='arima')",
    parameters: [
      { name: "historical_data", type: "table", description: "Historical time series data", required: true },
      { name: "periods", type: "integer", description: "Number of periods to forecast", required: true },
      { name: "algorithm", type: "string", description: "Forecasting algorithm", required: false },
      { name: "confidence_level", type: "float", description: "Confidence interval level", required: false },
    ],
    returnType: "table",
    usage: 143,
    rating: 4.5,
    author: "Forecasting Team",
    lastUpdated: "2024-01-08",
    tags: ["forecasting", "time-series", "prediction", "ml"],
    examples: [
      {
        title: "Revenue Forecasting",
        description: "Predict next quarter revenue",
        code: "SELECT * FROM forecast_timeseries(monthly_revenue, periods=3, algorithm='prophet', confidence_level=0.95)",
      },
      {
        title: "User Growth Prediction",
        description: "Forecast user growth over next 6 months",
        code: "SELECT * FROM forecast_timeseries(user_growth, periods=6, algorithm='arima')",
      },
    ],
  },
  {
    id: "ab-test-analysis",
    name: "ab_test_analysis",
    description: "Statistical analysis of A/B tests with significance testing and effect sizes",
    category: "statistical",
    complexity: "intermediate",
    codeExample: "SELECT * FROM ab_test_analysis(experiment_data, control_group, test_group, metric)",
    parameters: [
      { name: "experiment_data", type: "table", description: "A/B test experiment data", required: true },
      { name: "control_group", type: "string", description: "Control group identifier", required: true },
      { name: "test_group", type: "string", description: "Test group identifier", required: true },
      { name: "metric", type: "string", description: "Metric to analyze", required: true },
    ],
    returnType: "table",
    usage: 267,
    rating: 4.7,
    author: "Experimentation Team",
    lastUpdated: "2024-01-14",
    tags: ["ab-testing", "experimentation", "statistical", "significance"],
    examples: [
      {
        title: "Conversion Rate Test",
        description: "Analyze conversion rate between variants",
        code: "SELECT * FROM ab_test_analysis(button_test, 'control', 'variant_a', 'conversion_rate')",
      },
      {
        title: "Revenue Impact Test",
        description: "Measure revenue impact of new feature",
        code: "SELECT * FROM ab_test_analysis(feature_test, 'control', 'new_feature', 'revenue_per_user')",
      },
    ],
  },
  {
    id: "customer-segmentation",
    name: "customer_segmentation",
    description: "Advanced customer segmentation using RFM analysis and clustering algorithms",
    category: "ml",
    complexity: "advanced",
    codeExample: "SELECT * FROM customer_segmentation(customer_data, method='rfm', clusters=5)",
    parameters: [
      { name: "customer_data", type: "table", description: "Customer transaction data", required: true },
      { name: "method", type: "string", description: "Segmentation method", required: false },
      { name: "clusters", type: "integer", description: "Number of segments", required: false },
      { name: "features", type: "array", description: "Features for segmentation", required: false },
    ],
    returnType: "table",
    usage: 198,
    rating: 4.6,
    author: "Customer Analytics Team",
    lastUpdated: "2024-01-11",
    tags: ["segmentation", "clustering", "rfm", "customer-analytics"],
    examples: [
      {
        title: "RFM Segmentation",
        description: "Segment customers by recency, frequency, and monetary value",
        code: "SELECT * FROM customer_segmentation(transactions, method='rfm', clusters=5)",
      },
      {
        title: "Behavioral Segmentation",
        description: "Segment customers by behavior patterns",
        code: "SELECT * FROM customer_segmentation(user_behavior, method='kmeans', features=['session_duration', 'page_views', 'purchases'])",
      },
    ],
  },
];

const templates: Template[] = [
  {
    id: "executive-dashboard",
    name: "Executive Dashboard",
    description: "Comprehensive executive dashboard with KPIs, trends, and strategic insights",
    category: "dashboard",
    preview: "Executive dashboard with revenue trends, user metrics, and performance indicators",
    features: [
      "Real-time KPI monitoring",
      "Revenue and growth trends",
      "User acquisition metrics",
      "Performance indicators",
      "Strategic goal tracking",
      "Automated alerting",
    ],
    complexity: "intermediate",
    downloads: 456,
    rating: 4.8,
    author: "Business Intelligence Team",
    lastUpdated: "2024-01-16",
    tags: ["executive", "kpi", "dashboard", "strategic"],
  },
  {
    id: "cohort-retention-report",
    name: "Cohort Retention Report",
    description: "Deep-dive cohort analysis report with retention curves and behavioral insights",
    category: "report",
    preview: "Detailed cohort analysis with retention heatmaps and trend analysis",
    features: [
      "Cohort retention heatmaps",
      "Behavioral pattern analysis",
      "Retention curve visualization",
      "Comparative cohort analysis",
      "Automated insights generation",
      "Exportable reports",
    ],
    complexity: "advanced",
    downloads: 234,
    rating: 4.7,
    author: "Product Analytics Team",
    lastUpdated: "2024-01-13",
    tags: ["cohort", "retention", "behavioral", "report"],
  },
  {
    id: "sales-performance-analysis",
    name: "Sales Performance Analysis",
    description: "Comprehensive sales performance analysis with forecasting and territory insights",
    category: "analysis",
    preview: "Sales performance dashboard with territory analysis and forecasting",
    features: [
      "Territory performance analysis",
      "Sales forecasting models",
      "Pipeline health metrics",
      "Rep performance tracking",
      "Goal vs actual analysis",
      "Trend identification",
    ],
    complexity: "intermediate",
    downloads: 789,
    rating: 4.9,
    author: "Sales Operations Team",
    lastUpdated: "2024-01-15",
    tags: ["sales", "performance", "forecasting", "territory"],
  },
  {
    id: "user-journey-visualization",
    name: "User Journey Visualization",
    description: "Interactive user journey mapping with path analysis and conversion funnels",
    category: "visualization",
    preview: "Interactive user journey maps with conversion paths and drop-off analysis",
    features: [
      "Interactive journey mapping",
      "Path flow visualization",
      "Conversion funnel analysis",
      "Drop-off point identification",
      "Behavioral flow patterns",
      "Segment-based journeys",
    ],
    complexity: "advanced",
    downloads: 345,
    rating: 4.6,
    author: "UX Analytics Team",
    lastUpdated: "2024-01-12",
    tags: ["user-journey", "visualization", "funnel", "ux"],
  },
  {
    id: "financial-reporting-suite",
    name: "Financial Reporting Suite",
    description: "Complete financial reporting suite with P&L, cash flow, and budget analysis",
    category: "report",
    preview: "Comprehensive financial reports with P&L, cash flow, and variance analysis",
    features: [
      "P&L statement generation",
      "Cash flow analysis",
      "Budget vs actual reporting",
      "Variance analysis",
      "Financial trend analysis",
      "Automated report scheduling",
    ],
    complexity: "intermediate",
    downloads: 567,
    rating: 4.8,
    author: "Finance Team",
    lastUpdated: "2024-01-14",
    tags: ["financial", "reporting", "p&l", "budget"],
  },
  {
    id: "marketing-attribution-model",
    name: "Marketing Attribution Model",
    description: "Multi-touch attribution modeling with channel performance and ROI analysis",
    category: "analysis",
    preview: "Marketing attribution analysis with channel performance and customer journey mapping",
    features: [
      "Multi-touch attribution modeling",
      "Channel performance analysis",
      "Customer journey mapping",
      "ROI calculation by channel",
      "Attribution model comparison",
      "Campaign effectiveness metrics",
    ],
    complexity: "advanced",
    downloads: 312,
    rating: 4.7,
    author: "Marketing Analytics Team",
    lastUpdated: "2024-01-11",
    tags: ["attribution", "marketing", "roi", "channel"],
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
const FunctionCard = memo(({
  func,
  isSelected,
  onSelect,
}: {
  func: AnalyticsFunction;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const categoryColors = {
    aggregation: "from-blue-500 to-cyan-600",
    statistical: "from-purple-500 to-pink-600",
    "time-series": "from-green-500 to-teal-600",
    visualization: "from-orange-500 to-red-600",
    ml: "from-indigo-500 to-purple-600",
    utility: "from-gray-500 to-gray-600",
  };

  const complexityColors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-yellow-100 text-yellow-700",
    advanced: "bg-red-100 text-red-700",
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
      onClick={() => onSelect(func.id)}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={`
                w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[func.category]}
                flex items-center justify-center
              `}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Code className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">{func.name}</h3>
              <p className="text-sm text-gray-500">{func.author}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${complexityColors[func.complexity]}`}>
              {func.complexity}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {func.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {func.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {func.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{func.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {func.usage}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {func.rating}
            </span>
          </div>
          <span>{func.lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
});

FunctionCard.displayName = 'FunctionCard';

const TemplateCard = memo(({
  template,
  isSelected,
  onSelect,
}: {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const categoryColors = {
    dashboard: "from-blue-500 to-indigo-600",
    report: "from-green-500 to-emerald-600",
    analysis: "from-purple-500 to-violet-600",
    visualization: "from-orange-500 to-red-600",
  };

  const complexityColors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-yellow-100 text-yellow-700",
    advanced: "bg-red-100 text-red-700",
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
      onClick={() => onSelect(template.id)}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={`
                w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[template.category]}
                flex items-center justify-center
              `}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.author}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${complexityColors[template.complexity]}`}>
              {template.complexity}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Features Preview */}
        <div className="mb-4">
          <ul className="space-y-1">
            {template.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          {template.features.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">+{template.features.length - 3} more features</p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {template.downloads}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {template.rating}
            </span>
          </div>
          <span>{template.lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
});

TemplateCard.displayName = 'TemplateCard';

const StatsCard = memo(({ 
  title, 
  value, 
  icon: Icon, 
  growth, 
  description 
}: { 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  growth?: string; 
  description: string;
}) => (
  <motion.div
    variants={cardVariants}
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      {growth && (
        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
          {growth}
        </span>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
    <p className="text-xs text-gray-500">{description}</p>
  </motion.div>
));

StatsCard.displayName = 'StatsCard';

// Main component
const AnalyticsLibrary = memo(function AnalyticsLibrary() {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'functions' | 'templates'>('overview');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'aggregation' | 'statistical' | 'time-series' | 'visualization' | 'ml' | 'utility'>('all');
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<'all' | 'dashboard' | 'report' | 'analysis' | 'visualization'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleFunctionSelect = useCallback((id: string) => {
    setSelectedFunction(selectedFunction === id ? null : id);
  }, [selectedFunction]);

  const handleTemplateSelect = useCallback((id: string) => {
    setSelectedTemplate(selectedTemplate === id ? null : id);
  }, [selectedTemplate]);

  const selectedFunctionData = useMemo(() => 
    selectedFunction ? analyticsFunctions.find(f => f.id === selectedFunction) : null,
    [selectedFunction]
  );

  const selectedTemplateData = useMemo(() => 
    selectedTemplate ? templates.find(t => t.id === selectedTemplate) : null,
    [selectedTemplate]
  );

  const filteredFunctions = useMemo(() => {
    if (categoryFilter === 'all') return analyticsFunctions;
    return analyticsFunctions.filter(func => func.category === categoryFilter);
  }, [categoryFilter]);

  const filteredTemplates = useMemo(() => {
    if (templateCategoryFilter === 'all') return templates;
    return templates.filter(template => template.category === templateCategoryFilter);
  }, [templateCategoryFilter]);

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
            <Library className="w-4 h-4" />
            Analytics Library
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Comprehensive Analytics
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Library
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Reusable analytics functions, visualization templates, and pre-built analyses. 
            Accelerate your data insights with battle-tested components and comprehensive documentation.
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
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'functions', label: 'Functions', icon: Code },
              { id: 'templates', label: 'Templates', icon: FileText },
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatsCard
                  title="Total Functions"
                  value={analyticsStats.totalFunctions.toLocaleString()}
                  icon={Code}
                  description="Reusable analytics functions"
                />
                <StatsCard
                  title="Templates"
                  value={analyticsStats.totalTemplates.toLocaleString()}
                  icon={FileText}
                  description="Pre-built analysis templates"
                />
                <StatsCard
                  title="Downloads"
                  value={analyticsStats.totalDownloads.toLocaleString()}
                  icon={Download}
                  description="Total component downloads"
                />
                <StatsCard
                  title="Active Users"
                  value={analyticsStats.activeUsers.toLocaleString()}
                  icon={Users}
                  description="Monthly active developers"
                />
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Category Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analyticsStats.categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.count} functions</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                          {category.growth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Functions Preview */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Popular Functions</h3>
                  <motion.button
                    onClick={() => setActiveTab('functions')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                    whileHover={{ x: 4 }}
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analyticsFunctions.slice(0, 3).map((func) => (
                    <FunctionCard
                      key={func.id}
                      func={func}
                      isSelected={selectedFunction === func.id}
                      onSelect={handleFunctionSelect}
                    />
                  ))}
                </div>
              </div>

              {/* Popular Templates Preview */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Popular Templates</h3>
                  <motion.button
                    onClick={() => setActiveTab('templates')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                    whileHover={{ x: 4 }}
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.slice(0, 3).map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate === template.id}
                      onSelect={handleTemplateSelect}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'functions' && (
            <motion.div
              key="functions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Filter */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-xl p-1 inline-flex shadow-sm border border-gray-200">
                  {[
                    { id: 'all', label: 'All Functions', icon: Code },
                    { id: 'aggregation', label: 'Aggregation', icon: BarChart3 },
                    { id: 'statistical', label: 'Statistical', icon: TrendingUp },
                    { id: 'time-series', label: 'Time Series', icon: LineChart },
                    { id: 'visualization', label: 'Visualization', icon: PieChart },
                    { id: 'ml', label: 'ML/AI', icon: Zap },
                    { id: 'utility', label: 'Utility', icon: Settings },
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
                {/* Function Cards */}
                <motion.div
                  className="lg:col-span-2"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={containerVariants}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredFunctions.map((func) => (
                      <FunctionCard
                        key={func.id}
                        func={func}
                        isSelected={selectedFunction === func.id}
                        onSelect={handleFunctionSelect}
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
                        {selectedFunctionData ? (
                          <motion.div
                            key={selectedFunctionData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Code className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedFunctionData.name}</h3>
                                <span className="text-xs font-medium text-indigo-600">
                                  {selectedFunctionData.category}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {selectedFunctionData.description}
                            </p>

                            {/* Code Example */}
                            <div className="bg-gray-900 rounded-lg p-4 mb-4">
                              <h4 className="text-sm font-semibold text-white mb-2">Usage Example</h4>
                              <code className="text-sm text-green-400">
                                {selectedFunctionData.codeExample}
                              </code>
                            </div>

                            {/* Parameters */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Parameters</h4>
                              <div className="space-y-2">
                                {selectedFunctionData.parameters.map((param, index) => (
                                  <div key={index} className="flex items-start gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                      {param.name}
                                    </span>
                                    <div className="flex-1">
                                      <p className="text-sm text-gray-700">{param.description}</p>
                                      <p className="text-xs text-gray-500">Type: {param.type}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Examples */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Examples</h4>
                              <div className="space-y-3">
                                {selectedFunctionData.examples.map((example, index) => (
                                  <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                                    <h5 className="font-medium text-gray-900 mb-1">{example.title}</h5>
                                    <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                                    <code className="text-xs text-gray-800 bg-gray-100 p-1 rounded">
                                      {example.code}
                                    </code>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2">Function Stats</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-blue-600">Usage:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedFunctionData.usage}</span>
                                </div>
                                <div>
                                  <span className="text-blue-600">Rating:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedFunctionData.rating}/5</span>
                                </div>
                                <div>
                                  <span className="text-blue-600">Author:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedFunctionData.author}</span>
                                </div>
                                <div>
                                  <span className="text-blue-600">Updated:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedFunctionData.lastUpdated}</span>
                                </div>
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
                              <Code className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Select a Function
                            </h3>
                            <p className="text-gray-600 text-sm">
                              Click on any function to explore its parameters, examples, and usage documentation.
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

          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Filter */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-xl p-1 inline-flex shadow-sm border border-gray-200">
                  {[
                    { id: 'all', label: 'All Templates', icon: FileText },
                    { id: 'dashboard', label: 'Dashboards', icon: BarChart3 },
                    { id: 'report', label: 'Reports', icon: BookOpen },
                    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
                    { id: 'visualization', label: 'Visualization', icon: PieChart },
                  ].map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setTemplateCategoryFilter(category.id as any)}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm
                        ${templateCategoryFilter === category.id
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
                {/* Template Cards */}
                <motion.div
                  className="lg:col-span-2"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={containerVariants}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={selectedTemplate === template.id}
                        onSelect={handleTemplateSelect}
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
                        {selectedTemplateData ? (
                          <motion.div
                            key={selectedTemplateData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedTemplateData.name}</h3>
                                <span className="text-xs font-medium text-indigo-600">
                                  {selectedTemplateData.category}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {selectedTemplateData.description}
                            </p>

                            {/* Preview */}
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-4">
                              <h4 className="font-semibold mb-2">Preview</h4>
                              <p className="text-sm">{selectedTemplateData.preview}</p>
                            </div>

                            {/* Features */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                              <ul className="space-y-2">
                                {selectedTemplateData.features.map((feature, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Tags */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedTemplateData.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2">Template Stats</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-blue-600">Downloads:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedTemplateData.downloads}</span>
                                </div>
                                <div>
                                  <span className="text-blue-600">Rating:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedTemplateData.rating}/5</span>
                                </div>
                                <div>
                                  <span className="text-blue-600">Author:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedTemplateData.author}</span>
                                </div>
                                <div>
                                  <span className="text-blue-600">Updated:</span>
                                  <span className="font-medium text-blue-800 ml-2">{selectedTemplateData.lastUpdated}</span>
                                </div>
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
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Select a Template
                            </h3>
                            <p className="text-gray-600 text-sm">
                              Click on any template to explore its features, preview, and implementation details.
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
                <Library className="w-8 h-8 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                Ready to Build with Pre-Built Components?
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Access our comprehensive library of analytics functions and templates. 
                Accelerate your development with battle-tested components and extensive documentation.
              </p>
              <motion.button
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Explore Library
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

AnalyticsLibrary.displayName = 'AnalyticsLibrary';

export default AnalyticsLibrary;