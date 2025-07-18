// app/components/SelfServicePortal.tsx
import { memo, useState, useCallback, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Layout,
  Users,
  Search,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Database,
  Play,
  Pause,
  Download,
  Share2,
  Eye,
  Settings,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  ArrowUpDown,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Calendar,
  FileText,
  Code,
  Layers,
  Shield,
  Activity,
  Globe,
  MousePointer,
  Gauge,
  Workflow,
  Building,
  UserCheck,
  Lightbulb,
  Brain,
  RefreshCw,
  GitBranch,
  Cpu,
  HardDrive,
  Network,
  Server,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Mail,
  Bell,
  Home,
  Grid3X3,
  List,
  Table,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Upload,
  FolderOpen,
  Tag,
  Bookmark,
  History,
  Scissors,
  Clipboard,
  Paintbrush,
  Palette,
  Image,
  Video,
  Music,
  File,
  Folder,
  Archive,
  Package,
  Box,
  Briefcase,
  ShoppingCart,
  CreditCard,
  Wallet,
  DollarSign,
  Percent,
  Calculator,
  Ruler,
  Compass,
  Map,
  Navigation,
  Anchor,
  Plane,
  Car,
  Bike,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Camera,
  Webcam,
  Printer,
  Phone,
  PhoneCall,
  Wifi,
  Bluetooth,
  Usb,
  Battery,
  Power,
  Volume,
  VolumeX,
  Volume1,
  Volume2,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Move,
  ZoomIn,
  ZoomOut,
  Focus,
  Timer,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Cloud,
  CloudRain,
  Wind,
  Umbrella,
  Thermometer,
  Waves,
  Mountain,
  Trees,
  Leaf,
  Flower,
  X,
  Check,
  AlertTriangle,
  Loader,
  MoreHorizontal,
  MoreVertical,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Columns,
  RowsIcon,
  Expand,
  Shrink,
  Pin,
  PinOff,
  Lock,
  Unlock,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Crosshair,
  Maximize2,
  Minimize2,
  Square,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Octagon,
  Beaker,
  TestTube,
  FlaskConical,
  Microscope,
  Atom,
  Dna,
  Fingerprint,
  Scan,
  BarChart,
  BarChart2,
  BarChart4,
  AreaChart,
  ScatterChart,
  Radar,
  Route,
  Binary,
  Hash,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  Quote,
  ListOrdered,
  Indent,
  Outdent,
  WrapText,
  Dot,
  Minus as MinusIcon,
  Equal,
  Divide,
  Sigma,
  Infinity,
  Pi,
  Radical,
  Percent as PercentIcon,
} from "lucide-react";

// Types
interface Metric {
  id: string;
  name: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
  sparkline: number[];
  unit?: string;
  description?: string;
  category: "revenue" | "users" | "engagement" | "performance" | "business" | "product" | "financial";
  formula?: string;
  owner: string;
  lastUpdated: string;
  tags: string[];
  verified: boolean;
  lineage: string[];
}

interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  formula: string;
  category: string;
  owner: string;
  tags: string[];
  verified: boolean;
  lastUpdated: string;
  usageCount: number;
  dependencies: string[];
  lineage: {
    source: string;
    transformation: string;
    target: string;
  }[];
}

interface AnalyticsTemplate {
  id: string;
  name: string;
  description: string;
  category: "analysis" | "reporting" | "modeling" | "visualization";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  code: string;
  parameters: {
    name: string;
    type: "string" | "number" | "date" | "boolean";
    required: boolean;
    defaultValue?: any;
  }[];
  tags: string[];
  author: string;
  downloads: number;
  rating: number;
  lastUpdated: string;
}

interface InsightCard {
  id: string;
  title: string;
  description: string;
  type: "trend" | "anomaly" | "correlation" | "forecast" | "opportunity";
  confidence: number;
  impact: "high" | "medium" | "low";
  recommendation: string;
  data: {
    metric: string;
    value: number;
    change: number;
    period: string;
  };
  timestamp: string;
}

interface ScenarioModel {
  id: string;
  name: string;
  description: string;
  category: "financial" | "operational" | "strategic" | "marketing";
  parameters: {
    id: string;
    name: string;
    type: "slider" | "input" | "select" | "toggle";
    value: any;
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    unit?: string;
  }[];
  outputs: {
    id: string;
    name: string;
    formula: string;
    unit: string;
    format: string;
  }[];
  scenarios: {
    id: string;
    name: string;
    description: string;
    parameters: Record<string, any>;
    results: Record<string, number>;
    created: string;
  }[];
  author: string;
  lastModified: string;
  shared: boolean;
}

interface CatalogMetric {
  id: string;
  name: string;
  description: string;
  type: "revenue" | "users" | "engagement" | "performance" | "operational";
  formula: string;
  unit?: string;
  owner: string;
  tags: string[];
  lastUpdated: string;
  status: "active" | "deprecated" | "draft";
  dependencies: string[];
  usage: {
    dashboards: number;
    queries: number;
    lastAccessed: string;
  };
  lineage: {
    source: string;
    transformations: string[];
  };
}

interface DataSource {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "warehouse";
  tables: Table[];
  status: "connected" | "disconnected" | "syncing";
  lastSync: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Table {
  id: string;
  name: string;
  description?: string;
  columns: Column[];
  rowCount: number;
  lastUpdated: string;
}

interface Column {
  id: string;
  name: string;
  type: "string" | "number" | "date" | "boolean";
  description?: string;
  nullable: boolean;
}

interface QueryResult {
  id: string;
  columns: string[];
  rows: (string | number | boolean | null)[][];
  totalRows: number;
  executionTime: number;
  isComplete: boolean;
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  author: string;
  lastModified: string;
  views: number;
  status: "published" | "draft" | "archived";
  widgets: Widget[];
  tags: string[];
  thumbnail: string;
  shared: boolean;
  permissions: "view" | "edit" | "admin";
}

interface Widget {
  id: string;
  type: "chart" | "table" | "metric" | "text";
  title: string;
  query: string;
  visualization: "bar" | "line" | "pie" | "table" | "number";
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, any>;
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  members: number;
  dashboards: number;
  queries: number;
  lastActivity: string;
  role: "admin" | "editor" | "viewer";
  avatar: string;
}

interface RecentActivity {
  id: string;
  type: "query" | "dashboard" | "share" | "comment" | "metric" | "template" | "insight" | "scenario";
  title: string;
  description: string;
  timestamp: string;
  user: string;
  avatar: string;
}

// Mock data
const mockMetrics: Metric[] = [
  {
    id: "1",
    name: "Monthly Recurring Revenue",
    value: "$2.4M",
    change: 12.3,
    trend: "up",
    sparkline: [65, 68, 72, 69, 75, 78, 82, 85, 88, 92, 95, 98],
    unit: "$",
    description: "Monthly recurring revenue from all subscription plans",
    category: "revenue",
    formula: "SUM(subscriptions.amount) WHERE status = 'active'",
    owner: "Finance Team",
    lastUpdated: "2 hours ago",
    tags: ["revenue", "subscription", "recurring"],
    verified: true,
    lineage: ["subscriptions", "payment_methods", "customers"]
  },
  {
    id: "2",
    name: "Customer Acquisition Cost",
    value: "$127",
    change: -8.4,
    trend: "down",
    sparkline: [85, 82, 78, 75, 72, 68, 65, 62, 58, 55, 52, 48],
    unit: "$",
    description: "Average cost to acquire a new customer",
    category: "business",
    formula: "marketing_spend / new_customers",
    owner: "Marketing Team",
    lastUpdated: "1 hour ago",
    tags: ["acquisition", "cost", "marketing"],
    verified: true,
    lineage: ["marketing_campaigns", "customers", "expenses"]
  },
  {
    id: "3",
    name: "Monthly Active Users",
    value: "24,547",
    change: 8.7,
    trend: "up",
    sparkline: [45, 52, 48, 61, 65, 68, 72, 75, 78, 82, 85, 88],
    description: "Unique users who logged in within the last 30 days",
    category: "users",
    formula: "COUNT(DISTINCT user_id) WHERE last_login >= NOW() - INTERVAL '30 days'",
    owner: "Product Team",
    lastUpdated: "30 minutes ago",
    tags: ["users", "engagement", "monthly"],
    verified: true,
    lineage: ["user_sessions", "users", "activities"]
  },
  {
    id: "4",
    name: "Net Promoter Score",
    value: "72",
    change: 4.2,
    trend: "up",
    sparkline: [65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 72],
    description: "Customer satisfaction and loyalty metric",
    category: "product",
    formula: "((promoters - detractors) / total_responses) * 100",
    owner: "Customer Success",
    lastUpdated: "4 hours ago",
    tags: ["nps", "satisfaction", "loyalty"],
    verified: true,
    lineage: ["surveys", "customers", "feedback"]
  },
  {
    id: "5",
    name: "Gross Margin",
    value: "68.5%",
    change: 2.1,
    trend: "up",
    sparkline: [62, 63, 64, 65, 66, 67, 68, 69, 68, 67, 68, 69],
    unit: "%",
    description: "Percentage of revenue remaining after cost of goods sold",
    category: "financial",
    formula: "((revenue - cogs) / revenue) * 100",
    owner: "Finance Team",
    lastUpdated: "1 day ago",
    tags: ["margin", "profitability", "financial"],
    verified: true,
    lineage: ["revenue", "expenses", "cost_of_goods"]
  },
  {
    id: "6",
    name: "Query Performance",
    value: "1.2s",
    change: -15.4,
    trend: "down",
    sparkline: [95, 88, 82, 78, 75, 72, 68, 65, 61, 58, 55, 52],
    unit: "s",
    description: "Average query execution time across all data sources",
    category: "performance",
    formula: "AVG(query_execution_time)",
    owner: "Data Engineering",
    lastUpdated: "10 minutes ago",
    tags: ["performance", "query", "latency"],
    verified: true,
    lineage: ["query_logs", "system_metrics", "performance"]
  }
];

const mockMetricDefinitions: MetricDefinition[] = [
  {
    id: "1",
    name: "Customer Lifetime Value",
    description: "The total revenue expected from a customer over their entire relationship",
    formula: "(avg_order_value * purchase_frequency * gross_margin) / churn_rate",
    category: "business",
    owner: "Analytics Team",
    tags: ["clv", "revenue", "customer"],
    verified: true,
    lastUpdated: "2 days ago",
    usageCount: 45,
    dependencies: ["avg_order_value", "purchase_frequency", "gross_margin", "churn_rate"],
    lineage: [
      { source: "orders", transformation: "AVG(amount)", target: "avg_order_value" },
      { source: "customers", transformation: "COUNT(orders) / tenure", target: "purchase_frequency" },
      { source: "financials", transformation: "(revenue - cogs) / revenue", target: "gross_margin" }
    ]
  },
  {
    id: "2",
    name: "Product Market Fit Score",
    description: "Composite score measuring how well a product satisfies market demand",
    formula: "WEIGHTED_AVG(nps_score * 0.3, retention_rate * 0.4, growth_rate * 0.3)",
    category: "product",
    owner: "Product Team",
    tags: ["pmf", "product", "market"],
    verified: true,
    lastUpdated: "1 week ago",
    usageCount: 23,
    dependencies: ["nps_score", "retention_rate", "growth_rate"],
    lineage: [
      { source: "surveys", transformation: "NPS calculation", target: "nps_score" },
      { source: "users", transformation: "retention analysis", target: "retention_rate" },
      { source: "metrics", transformation: "growth calculation", target: "growth_rate" }
    ]
  }
];

const mockAnalyticsTemplates: AnalyticsTemplate[] = [
  {
    id: "1",
    name: "Cohort Analysis",
    description: "Analyze user behavior and retention across different cohorts",
    category: "analysis",
    difficulty: "intermediate",
    estimatedTime: "15 minutes",
    code: `WITH cohorts AS (
  SELECT 
    DATE_TRUNC('month', created_at) as cohort_month,
    user_id
  FROM users
),
user_activities AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', activity_date) as activity_month
  FROM user_activities
  WHERE activity_date >= {{start_date}}
)
SELECT 
  cohort_month,
  activity_month,
  COUNT(DISTINCT ua.user_id) as active_users,
  COUNT(DISTINCT c.user_id) as total_users,
  ROUND(COUNT(DISTINCT ua.user_id) * 100.0 / COUNT(DISTINCT c.user_id), 2) as retention_rate
FROM cohorts c
LEFT JOIN user_activities ua ON c.user_id = ua.user_id
GROUP BY cohort_month, activity_month
ORDER BY cohort_month, activity_month`,
    parameters: [
      { name: "start_date", type: "date", required: true },
      { name: "cohort_size_min", type: "number", required: false, defaultValue: 100 }
    ],
    tags: ["cohort", "retention", "analysis"],
    author: "Analytics Team",
    downloads: 156,
    rating: 4.8,
    lastUpdated: "1 week ago"
  },
  {
    id: "2",
    name: "Revenue Attribution",
    description: "Attribution analysis for revenue across different channels",
    category: "analysis",
    difficulty: "advanced",
    estimatedTime: "25 minutes",
    code: `WITH channel_touches AS (
  SELECT 
    customer_id,
    channel,
    touch_date,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY touch_date) as touch_order,
    COUNT(*) OVER (PARTITION BY customer_id) as total_touches
  FROM customer_touchpoints
  WHERE touch_date >= {{start_date}} AND touch_date <= {{end_date}}
),
attributed_revenue AS (
  SELECT 
    ct.customer_id,
    ct.channel,
    r.revenue,
    CASE 
      WHEN {{attribution_model}} = 'first_touch' THEN 
        CASE WHEN ct.touch_order = 1 THEN r.revenue ELSE 0 END
      WHEN {{attribution_model}} = 'last_touch' THEN 
        CASE WHEN ct.touch_order = ct.total_touches THEN r.revenue ELSE 0 END
      ELSE r.revenue / ct.total_touches
    END as attributed_revenue
  FROM channel_touches ct
  JOIN revenue r ON ct.customer_id = r.customer_id
)
SELECT 
  channel,
  SUM(attributed_revenue) as total_attributed_revenue,
  COUNT(DISTINCT customer_id) as customers,
  AVG(attributed_revenue) as avg_revenue_per_customer
FROM attributed_revenue
GROUP BY channel
ORDER BY total_attributed_revenue DESC`,
    parameters: [
      { name: "start_date", type: "date", required: true },
      { name: "end_date", type: "date", required: true },
      { name: "attribution_model", type: "string", required: true, defaultValue: "linear" }
    ],
    tags: ["attribution", "revenue", "channels"],
    author: "Marketing Team",
    downloads: 89,
    rating: 4.6,
    lastUpdated: "3 days ago"
  },
  {
    id: "3",
    name: "Churn Prediction",
    description: "Machine learning model to predict customer churn risk",
    category: "modeling",
    difficulty: "advanced",
    estimatedTime: "45 minutes",
    code: `WITH customer_features AS (
  SELECT 
    customer_id,
    -- Recency features
    EXTRACT(DAYS FROM NOW() - MAX(last_login)) as days_since_last_login,
    EXTRACT(DAYS FROM NOW() - MAX(last_purchase)) as days_since_last_purchase,
    
    -- Frequency features
    COUNT(DISTINCT session_id) as session_count_30d,
    COUNT(DISTINCT order_id) as order_count_30d,
    
    -- Monetary features
    SUM(order_amount) as total_spent_30d,
    AVG(order_amount) as avg_order_value,
    
    -- Engagement features
    AVG(session_duration) as avg_session_duration,
    COUNT(DISTINCT feature_used) as features_used_count,
    
    -- Support features
    COUNT(DISTINCT support_ticket_id) as support_tickets_30d
  FROM customer_activity_summary
  WHERE activity_date >= NOW() - INTERVAL '30 days'
  GROUP BY customer_id
),
churn_scores AS (
  SELECT 
    customer_id,
    -- Simple scoring model (replace with ML model)
    CASE 
      WHEN days_since_last_login > 14 THEN 0.8
      WHEN days_since_last_login > 7 THEN 0.6
      WHEN days_since_last_login > 3 THEN 0.4
      ELSE 0.2
    END +
    CASE 
      WHEN session_count_30d < 5 THEN 0.6
      WHEN session_count_30d < 10 THEN 0.3
      ELSE 0.1
    END +
    CASE 
      WHEN total_spent_30d < 100 THEN 0.4
      WHEN total_spent_30d < 500 THEN 0.2
      ELSE 0.0
    END as churn_score
  FROM customer_features
)
SELECT 
  customer_id,
  churn_score,
  CASE 
    WHEN churn_score >= {{high_risk_threshold}} THEN 'High Risk'
    WHEN churn_score >= {{medium_risk_threshold}} THEN 'Medium Risk'
    ELSE 'Low Risk'
  END as risk_level
FROM churn_scores
WHERE churn_score >= {{min_score_threshold}}
ORDER BY churn_score DESC`,
    parameters: [
      { name: "high_risk_threshold", type: "number", required: false, defaultValue: 0.7 },
      { name: "medium_risk_threshold", type: "number", required: false, defaultValue: 0.5 },
      { name: "min_score_threshold", type: "number", required: false, defaultValue: 0.3 }
    ],
    tags: ["churn", "prediction", "ml"],
    author: "Data Science Team",
    downloads: 234,
    rating: 4.9,
    lastUpdated: "5 days ago"
  }
];

const mockInsights: InsightCard[] = [
  {
    id: "1",
    title: "Revenue Spike Detected",
    description: "Monthly recurring revenue increased by 23% compared to last month, driven by enterprise plan upgrades",
    type: "trend",
    confidence: 0.94,
    impact: "high",
    recommendation: "Investigate the drivers behind enterprise upgrades and consider expanding this segment",
    data: {
      metric: "Monthly Recurring Revenue",
      value: 2400000,
      change: 23.1,
      period: "Last 30 days"
    },
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    title: "Unusual Query Performance",
    description: "Average query execution time increased by 45% in the last week, potentially indicating system issues",
    type: "anomaly",
    confidence: 0.87,
    impact: "medium",
    recommendation: "Review database performance and consider query optimization or infrastructure scaling",
    data: {
      metric: "Query Performance",
      value: 1.2,
      change: 45.2,
      period: "Last 7 days"
    },
    timestamp: "1 hour ago"
  },
  {
    id: "3",
    title: "Customer Satisfaction Correlation",
    description: "Strong positive correlation (r=0.82) between feature usage and NPS scores",
    type: "correlation",
    confidence: 0.82,
    impact: "high",
    recommendation: "Focus on increasing feature adoption to improve customer satisfaction and retention",
    data: {
      metric: "Net Promoter Score",
      value: 72,
      change: 4.2,
      period: "Last quarter"
    },
    timestamp: "3 hours ago"
  },
  {
    id: "4",
    title: "Growth Forecast",
    description: "Based on current trends, user growth is projected to reach 35K by end of quarter",
    type: "forecast",
    confidence: 0.76,
    impact: "medium",
    recommendation: "Prepare infrastructure and support capacity for projected user growth",
    data: {
      metric: "Monthly Active Users",
      value: 24547,
      change: 8.7,
      period: "Next 90 days"
    },
    timestamp: "5 hours ago"
  }
];

const mockScenarioModels: ScenarioModel[] = [
  {
    id: "1",
    name: "Pricing Strategy Impact",
    description: "Model the impact of different pricing strategies on revenue and customer acquisition",
    category: "financial",
    parameters: [
      {
        id: "base_price",
        name: "Base Plan Price",
        type: "slider",
        value: 29,
        min: 19,
        max: 49,
        step: 1,
        unit: "$"
      },
      {
        id: "pro_price",
        name: "Pro Plan Price",
        type: "slider",
        value: 79,
        min: 59,
        max: 99,
        step: 1,
        unit: "$"
      },
      {
        id: "enterprise_price",
        name: "Enterprise Plan Price",
        type: "slider",
        value: 199,
        min: 149,
        max: 299,
        step: 1,
        unit: "$"
      },
      {
        id: "price_elasticity",
        name: "Price Elasticity",
        type: "slider",
        value: -0.8,
        min: -2,
        max: 0,
        step: 0.1,
        unit: ""
      },
      {
        id: "churn_sensitivity",
        name: "Churn Sensitivity",
        type: "slider",
        value: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        unit: ""
      }
    ],
    outputs: [
      {
        id: "monthly_revenue",
        name: "Monthly Revenue",
        formula: "(base_customers * base_price) + (pro_customers * pro_price) + (enterprise_customers * enterprise_price)",
        unit: "$",
        format: "currency"
      },
      {
        id: "customer_acquisition",
        name: "New Customers/Month",
        formula: "base_acquisition * (1 + price_elasticity * price_change)",
        unit: "",
        format: "number"
      },
      {
        id: "churn_rate",
        name: "Monthly Churn Rate",
        formula: "base_churn + (churn_sensitivity * price_increase)",
        unit: "%",
        format: "percentage"
      },
      {
        id: "net_revenue_growth",
        name: "Net Revenue Growth",
        formula: "((new_revenue - base_revenue) / base_revenue) * 100",
        unit: "%",
        format: "percentage"
      }
    ],
    scenarios: [
      {
        id: "s1",
        name: "Current Pricing",
        description: "Baseline scenario with current pricing structure",
        parameters: {
          base_price: 29,
          pro_price: 79,
          enterprise_price: 199,
          price_elasticity: -0.8,
          churn_sensitivity: 0.3
        },
        results: {
          monthly_revenue: 2400000,
          customer_acquisition: 1200,
          churn_rate: 5.2,
          net_revenue_growth: 0
        },
        created: "2024-01-15"
      },
      {
        id: "s2",
        name: "Premium Pricing",
        description: "Increase all plan prices by 25%",
        parameters: {
          base_price: 36,
          pro_price: 99,
          enterprise_price: 249,
          price_elasticity: -0.8,
          churn_sensitivity: 0.3
        },
        results: {
          monthly_revenue: 2760000,
          customer_acquisition: 960,
          churn_rate: 7.8,
          net_revenue_growth: 15
        },
        created: "2024-01-15"
      },
      {
        id: "s3",
        name: "Value Pricing",
        description: "Decrease base price, increase premium prices",
        parameters: {
          base_price: 24,
          pro_price: 89,
          enterprise_price: 229,
          price_elasticity: -0.8,
          churn_sensitivity: 0.3
        },
        results: {
          monthly_revenue: 2520000,
          customer_acquisition: 1440,
          churn_rate: 4.1,
          net_revenue_growth: 5
        },
        created: "2024-01-15"
      }
    ],
    author: "Finance Team",
    lastModified: "2 days ago",
    shared: true
  },
  {
    id: "2",
    name: "Marketing Campaign ROI",
    description: "Evaluate the return on investment for different marketing campaign strategies",
    category: "marketing",
    parameters: [
      {
        id: "campaign_budget",
        name: "Campaign Budget",
        type: "slider",
        value: 50000,
        min: 10000,
        max: 200000,
        step: 5000,
        unit: "$"
      },
      {
        id: "conversion_rate",
        name: "Conversion Rate",
        type: "slider",
        value: 3.2,
        min: 1,
        max: 10,
        step: 0.1,
        unit: "%"
      },
      {
        id: "avg_order_value",
        name: "Average Order Value",
        type: "slider",
        value: 150,
        min: 50,
        max: 500,
        step: 10,
        unit: "$"
      },
      {
        id: "customer_ltv",
        name: "Customer LTV",
        type: "slider",
        value: 850,
        min: 200,
        max: 2000,
        step: 50,
        unit: "$"
      }
    ],
    outputs: [
      {
        id: "leads_generated",
        name: "Leads Generated",
        formula: "campaign_budget / cost_per_lead",
        unit: "",
        format: "number"
      },
      {
        id: "customers_acquired",
        name: "Customers Acquired",
        formula: "leads_generated * (conversion_rate / 100)",
        unit: "",
        format: "number"
      },
      {
        id: "immediate_revenue",
        name: "Immediate Revenue",
        formula: "customers_acquired * avg_order_value",
        unit: "$",
        format: "currency"
      },
      {
        id: "total_ltv",
        name: "Total Customer LTV",
        formula: "customers_acquired * customer_ltv",
        unit: "$",
        format: "currency"
      },
      {
        id: "roi_percentage",
        name: "ROI Percentage",
        formula: "((total_ltv - campaign_budget) / campaign_budget) * 100",
        unit: "%",
        format: "percentage"
      }
    ],
    scenarios: [
      {
        id: "s1",
        name: "Conservative Approach",
        description: "Lower budget with proven conversion rates",
        parameters: {
          campaign_budget: 30000,
          conversion_rate: 2.8,
          avg_order_value: 120,
          customer_ltv: 650
        },
        results: {
          leads_generated: 3000,
          customers_acquired: 84,
          immediate_revenue: 10080,
          total_ltv: 54600,
          roi_percentage: 82
        },
        created: "2024-01-14"
      }
    ],
    author: "Marketing Team",
    lastModified: "1 day ago",
    shared: false
  }
];

const mockDataSources: DataSource[] = [
  {
    id: "1",
    name: "Production Database",
    type: "database",
    status: "connected",
    lastSync: "2 minutes ago",
    icon: Database,
    tables: [
      {
        id: "1",
        name: "users",
        description: "User account information",
        columns: [
          { id: "1", name: "id", type: "string", nullable: false },
          { id: "2", name: "email", type: "string", nullable: false },
          { id: "3", name: "created_at", type: "date", nullable: false },
          { id: "4", name: "last_login", type: "date", nullable: true }
        ],
        rowCount: 24547,
        lastUpdated: "5 minutes ago"
      },
      {
        id: "2",
        name: "orders",
        description: "Customer orders and transactions",
        columns: [
          { id: "1", name: "id", type: "string", nullable: false },
          { id: "2", name: "user_id", type: "string", nullable: false },
          { id: "3", name: "amount", type: "number", nullable: false },
          { id: "4", name: "status", type: "string", nullable: false }
        ],
        rowCount: 156789,
        lastUpdated: "3 minutes ago"
      }
    ]
  },
  {
    id: "2",
    name: "Analytics Warehouse",
    type: "warehouse",
    status: "connected",
    lastSync: "1 hour ago",
    icon: Server,
    tables: [
      {
        id: "3",
        name: "page_views",
        description: "Website page view events",
        columns: [
          { id: "1", name: "timestamp", type: "date", nullable: false },
          { id: "2", name: "user_id", type: "string", nullable: true },
          { id: "3", name: "page_url", type: "string", nullable: false },
          { id: "4", name: "session_id", type: "string", nullable: false }
        ],
        rowCount: 2456789,
        lastUpdated: "1 hour ago"
      }
    ]
  },
  {
    id: "3",
    name: "Stripe API",
    type: "api",
    status: "syncing",
    lastSync: "Syncing...",
    icon: CreditCard,
    tables: [
      {
        id: "4",
        name: "payments",
        description: "Payment transactions from Stripe",
        columns: [
          { id: "1", name: "id", type: "string", nullable: false },
          { id: "2", name: "amount", type: "number", nullable: false },
          { id: "3", name: "currency", type: "string", nullable: false },
          { id: "4", name: "status", type: "string", nullable: false }
        ],
        rowCount: 45678,
        lastUpdated: "2 hours ago"
      }
    ]
  }
];

const mockWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "Marketing Analytics",
    description: "Campaign performance and user acquisition metrics",
    members: 12,
    dashboards: 8,
    queries: 45,
    lastActivity: "2 hours ago",
    role: "admin",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: "2",
    name: "Product Insights",
    description: "User behavior and product performance analysis",
    members: 6,
    dashboards: 15,
    queries: 78,
    lastActivity: "30 minutes ago",
    role: "editor",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: "3",
    name: "Executive Dashboard",
    description: "High-level business metrics and KPIs",
    members: 4,
    dashboards: 3,
    queries: 12,
    lastActivity: "1 day ago",
    role: "viewer",
    avatar: "/api/placeholder/40/40"
  }
];

const mockRecentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "metric",
    title: "Customer Lifetime Value",
    description: "Created new metric definition with automated lineage tracking",
    timestamp: "1 hour ago",
    user: "Sarah Johnson",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: "2",
    type: "template",
    title: "Cohort Analysis Template",
    description: "Shared advanced cohort analysis template with the team",
    timestamp: "2 hours ago",
    user: "Mike Chen",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: "3",
    type: "insight",
    title: "Revenue Anomaly Alert",
    description: "AI detected unusual revenue pattern requiring investigation",
    timestamp: "3 hours ago",
    user: "PRISM AI",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: "4",
    type: "scenario",
    title: "Pricing Strategy Model",
    description: "Updated pricing model with new elasticity parameters",
    timestamp: "4 hours ago",
    user: "Emily Rodriguez",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: "5",
    type: "query",
    title: "Revenue by Region Analysis",
    description: "Created new query to analyze Q4 revenue by geographic region",
    timestamp: "5 hours ago",
    user: "David Park",
    avatar: "/api/placeholder/32/32"
  }
];

const mockCatalogMetrics: CatalogMetric[] = [
  {
    id: "1",
    name: "Monthly Recurring Revenue",
    description: "Total recurring revenue generated each month from active subscriptions",
    type: "revenue",
    formula: "SUM(subscription_amount) WHERE status = 'active'",
    unit: "$",
    owner: "Finance Team",
    tags: ["revenue", "subscription", "monthly"],
    lastUpdated: "2024-01-15",
    status: "active",
    dependencies: ["subscriptions.amount", "subscriptions.status"],
    usage: {
      dashboards: 12,
      queries: 45,
      lastAccessed: "2 hours ago"
    },
    lineage: {
      source: "subscriptions",
      transformations: ["filter_active", "sum_by_month"]
    }
  },
  {
    id: "2",
    name: "Customer Acquisition Cost",
    description: "Cost to acquire a new customer including marketing and sales expenses",
    type: "operational",
    formula: "(marketing_spend + sales_spend) / new_customers",
    unit: "$",
    owner: "Marketing Team",
    tags: ["acquisition", "cost", "marketing"],
    lastUpdated: "2024-01-14",
    status: "active",
    dependencies: ["marketing_spend", "sales_spend", "new_customers"],
    usage: {
      dashboards: 8,
      queries: 23,
      lastAccessed: "1 day ago"
    },
    lineage: {
      source: "marketing_data",
      transformations: ["calculate_total_spend", "count_new_customers"]
    }
  },
  {
    id: "3",
    name: "Daily Active Users",
    description: "Number of unique users who engage with the platform daily",
    type: "users",
    formula: "COUNT(DISTINCT user_id) WHERE last_activity >= DATE_SUB(NOW(), INTERVAL 1 DAY)",
    owner: "Product Team",
    tags: ["engagement", "users", "daily"],
    lastUpdated: "2024-01-13",
    status: "active",
    dependencies: ["user_sessions.user_id", "user_sessions.last_activity"],
    usage: {
      dashboards: 15,
      queries: 67,
      lastAccessed: "30 minutes ago"
    },
    lineage: {
      source: "user_sessions",
      transformations: ["filter_recent", "count_distinct"]
    }
  },
  {
    id: "4",
    name: "Query Performance Score",
    description: "Composite score measuring query execution time and success rate",
    type: "performance",
    formula: "((successful_queries / total_queries) * 100) - (avg_execution_time * 10)",
    owner: "Engineering Team",
    tags: ["performance", "queries", "system"],
    lastUpdated: "2024-01-12",
    status: "active",
    dependencies: ["query_logs.status", "query_logs.execution_time"],
    usage: {
      dashboards: 6,
      queries: 18,
      lastAccessed: "4 hours ago"
    },
    lineage: {
      source: "query_logs",
      transformations: ["calculate_success_rate", "calculate_avg_time"]
    }
  },
  {
    id: "5",
    name: "Conversion Rate",
    description: "Percentage of visitors who complete desired actions",
    type: "engagement",
    formula: "((conversions / total_visitors) * 100)",
    unit: "%",
    owner: "Growth Team",
    tags: ["conversion", "engagement", "funnel"],
    lastUpdated: "2024-01-10",
    status: "deprecated",
    dependencies: ["conversions", "total_visitors"],
    usage: {
      dashboards: 3,
      queries: 8,
      lastAccessed: "1 week ago"
    },
    lineage: {
      source: "events",
      transformations: ["filter_conversions", "calculate_percentage"]
    }
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    } as const,
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
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

// Sparkline component
const Sparkline = memo(({ data, trend }: { data: number[]; trend: "up" | "down" | "stable" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const color = trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#6b7280";

  return (
    <svg width="80" height="24" viewBox="0 0 100 100" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

Sparkline.displayName = "Sparkline";

// Main Component
const SelfServicePortal = memo(() => {
  const [activeView, setActiveView] = useState<"home" | "explore" | "query" | "dashboards" | "workspaces" | "metrics" | "workbench" | "scenarios">("home");
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [queryText, setQueryText] = useState("");
  const [queryResults, setQueryResults] = useState<QueryResult | null>(null);
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<AnalyticsTemplate | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<InsightCard | null>(null);
  const [selectedCatalogMetric, setSelectedCatalogMetric] = useState<CatalogMetric | null>(null);
  const [metricSearchQuery, setMetricSearchQuery] = useState("");
  const [selectedMetricType, setSelectedMetricType] = useState<string>("all");
  const [selectedMetricStatus, setSelectedMetricStatus] = useState<string>("all");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioModel | null>(null);
  const [activeWorkbenchTab, setActiveWorkbenchTab] = useState<"templates" | "insights" | "notebooks" | "collaboration">("templates");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [metricSearchTerm, setMetricSearchTerm] = useState("");
  const [templateSearchTerm, setTemplateSearchTerm] = useState("");

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDataSourceSelect = useCallback((dataSource: DataSource) => {
    setSelectedDataSource(dataSource);
    setSelectedTable(null);
  }, []);

  const handleTableSelect = useCallback((table: Table) => {
    setSelectedTable(table);
  }, []);

  const handleRunQuery = useCallback(async () => {
    if (!queryText.trim()) return;
    
    setIsQueryRunning(true);
    
    // Simulate query execution
    setTimeout(() => {
      setQueryResults({
        id: "1",
        columns: ["id", "name", "email", "created_at"],
        rows: [
          ["1", "John Doe", "john@example.com", "2024-01-15"],
          ["2", "Jane Smith", "jane@example.com", "2024-01-16"],
          ["3", "Bob Johnson", "bob@example.com", "2024-01-17"],
        ],
        totalRows: 24547,
        executionTime: 1.2,
        isComplete: true
      });
      setIsQueryRunning(false);
    }, 2000);
  }, [queryText]);

  const handleMetricSelect = useCallback((metric: Metric) => {
    setSelectedMetric(metric);
  }, []);

  const handleTemplateSelect = useCallback((template: AnalyticsTemplate) => {
    setSelectedTemplate(template);
    setQueryText(template.code);
  }, []);

  const handleInsightSelect = useCallback((insight: InsightCard) => {
    setSelectedInsight(insight);
  }, []);

  const handleScenarioSelect = useCallback((scenario: ScenarioModel) => {
    setSelectedScenario(scenario);
  }, []);

  const filteredMetrics = useMemo(() => {
    return mockMetrics.filter(metric => {
      const matchesSearch = metric.name.toLowerCase().includes(metricSearchTerm.toLowerCase()) ||
                           metric.description?.toLowerCase().includes(metricSearchTerm.toLowerCase()) ||
                           metric.tags.some(tag => tag.toLowerCase().includes(metricSearchTerm.toLowerCase()));
      const matchesCategory = filterCategory === "all" || metric.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [metricSearchTerm, filterCategory]);

  const filteredTemplates = useMemo(() => {
    return mockAnalyticsTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(templateSearchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(templateSearchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(templateSearchTerm.toLowerCase()));
      const matchesCategory = filterCategory === "all" || template.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [templateSearchTerm, filterCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800";
      case "disconnected":
        return "bg-red-100 text-red-800";
      case "syncing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowRight className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "revenue":
        return "bg-green-100 text-green-800";
      case "users":
        return "bg-blue-100 text-blue-800";
      case "engagement":
        return "bg-purple-100 text-purple-800";
      case "performance":
        return "bg-orange-100 text-orange-800";
      case "business":
        return "bg-indigo-100 text-indigo-800";
      case "product":
        return "bg-pink-100 text-pink-800";
      case "financial":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case "trend":
        return "bg-blue-100 text-blue-800";
      case "anomaly":
        return "bg-red-100 text-red-800";
      case "correlation":
        return "bg-purple-100 text-purple-800";
      case "forecast":
        return "bg-green-100 text-green-800";
      case "opportunity":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Streamlined Optimized Header */}
      <header className="bg-white/98 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-6">
              <motion.div 
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg border border-gray-200">
                    <img src="/prism_logo.svg" alt="PRISM" className="h-6 w-6" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    PRISM Analytics
                  </h1>
                </div>
              </motion.div>
              
              {/* Compact Navigation */}
              <nav className="hidden lg:flex items-center bg-gray-50 rounded-lg p-0.5">
                {[
                  { id: "home", label: "Home", icon: Home },
                  { id: "explore", label: "Explore", icon: Search },
                  { id: "query", label: "Query", icon: Code },
                  { id: "metrics", label: "Metrics", icon: BarChart3 },
                  { id: "workbench", label: "Workbench", icon: Beaker },
                  { id: "scenarios", label: "Scenarios", icon: TestTube },
                  { id: "dashboards", label: "Dashboards", icon: Grid3X3 },
                  { id: "workspaces", label: "Workspaces", icon: Users },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveView(item.id as any)}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all group ${
                      activeView === item.id
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <item.icon className={`h-4 w-4 ${
                      activeView === item.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                    }`} />
                    <span className="hidden xl:inline">{item.label}</span>
                    
                    {/* Active indicator */}
                    {activeView === item.id && (
                      <motion.div
                        className="absolute -bottom-0.5 left-1/2 w-1 h-1 bg-blue-600 rounded-full"
                        layoutId="activeIndicator"
                        style={{ x: "-50%" }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2">
              {/* Global Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 w-56 bg-gray-50 border-0 rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>


              {/* Notifications */}
              <motion.button 
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </motion.button>

              {/* Settings Menu */}
              <motion.button 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-5 w-5" />
              </motion.button>

              {/* User Profile */}
              <motion.div 
                className="relative ml-1"
                whileHover={{ scale: 1.05 }}
              >
                <button className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm hover:shadow-md transition-all">
                  SC
                </button>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button 
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-8"
            >
              {/* Enhanced Welcome Section */}
              <motion.div 
                variants={itemVariants} 
                className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-2xl p-8 shadow-lg border border-gray-200/50"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </motion.div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                          Welcome back, Sarah Chen! 👋
                        </h2>
                      </div>
                      <p className="text-gray-600 text-lg font-medium mb-2">Here's what's happening with your analytics today</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Last login: 2 hours ago</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4" />
                          <span>12 active sessions</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Status Indicator */}
                    <motion.div 
                      className="flex items-center gap-3 px-4 py-2.5 bg-green-50 rounded-xl border border-green-200/50 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className="relative">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
                        <p className="text-xs text-green-600">99.9% uptime</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        id: "query",
                        title: "New Query",
                        description: "Explore your data",
                        icon: Code,
                        gradient: "from-blue-500 to-blue-600",
                        bgColor: "bg-blue-50",
                        borderColor: "border-blue-200/50",
                        iconBg: "bg-blue-100",
                        iconColor: "text-blue-600",
                        count: "24 today"
                      },
                      {
                        id: "metrics",
                        title: "Metrics Catalog",
                        description: "Browse metrics",
                        icon: BarChart3,
                        gradient: "from-purple-500 to-purple-600",
                        bgColor: "bg-purple-50",
                        borderColor: "border-purple-200/50",
                        iconBg: "bg-purple-100",
                        iconColor: "text-purple-600",
                        count: "186 metrics"
                      },
                      {
                        id: "workbench",
                        title: "AI Workbench",
                        description: "Templates & AI",
                        icon: Beaker,
                        gradient: "from-green-500 to-green-600",
                        bgColor: "bg-green-50",
                        borderColor: "border-green-200/50",
                        iconBg: "bg-green-100",
                        iconColor: "text-green-600",
                        count: "5 new templates"
                      },
                      {
                        id: "scenarios",
                        title: "Scenarios",
                        description: "Model outcomes",
                        icon: TestTube,
                        gradient: "from-orange-500 to-orange-600",
                        bgColor: "bg-orange-50",
                        borderColor: "border-orange-200/50",
                        iconBg: "bg-orange-100",
                        iconColor: "text-orange-600",
                        count: "3 running"
                      }
                    ].map((action, index) => (
                      <motion.button
                        key={action.id}
                        onClick={() => setActiveView(action.id as any)}
                        className={`group relative overflow-hidden ${action.bgColor} rounded-xl p-6 ${action.borderColor} border transition-all duration-300 text-left hover:shadow-md hover:-translate-y-0.5`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.1,
                          type: "spring", 
                          stiffness: 400, 
                          damping: 17 
                        }}
                      >
                        {/* Hover Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 ${action.iconBg} rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                              <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                            </div>
                            <div className="text-xs text-gray-500 font-medium">{action.count}</div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                              {action.description}
                            </p>
                          </div>
                          
                          {/* Arrow Icon */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Alerts Section */}
              <motion.div 
                variants={itemVariants} 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50 overflow-hidden relative"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Bell className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Alerts & Notifications</h3>
                        <p className="text-sm text-gray-600 mt-1">Stay informed about your data and systems</p>
                      </div>
                    </div>
                    <motion.button 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View all alerts
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        id: "1",
                        type: "critical",
                        title: "Revenue Metric Anomaly Detected",
                        description: "Daily revenue dropped 15% below expected range",
                        timestamp: "2 minutes ago",
                        action: "Investigate",
                        metric: "Daily Revenue",
                        impact: "High",
                        trend: "down"
                      },
                      {
                        id: "2", 
                        type: "warning",
                        title: "Query Performance Alert",
                        description: "Customer segmentation query running 3x slower than usual",
                        timestamp: "15 minutes ago",
                        action: "Optimize",
                        metric: "Query Performance",
                        impact: "Medium",
                        trend: "down"
                      },
                      {
                        id: "3",
                        type: "info",
                        title: "New Data Source Available",
                        description: "Marketing automation data sync completed successfully",
                        timestamp: "1 hour ago",
                        action: "Explore",
                        metric: "Data Sources",
                        impact: "Low",
                        trend: "up"
                      }
                    ].map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
                          alert.type === "critical" ? "bg-red-50/80 border-red-200/50 hover:bg-red-50" :
                          alert.type === "warning" ? "bg-amber-50/80 border-amber-200/50 hover:bg-amber-50" :
                          "bg-blue-50/80 border-blue-200/50 hover:bg-blue-50"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                      >
                        {/* Left Accent Bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                          alert.type === "critical" ? "bg-red-500" :
                          alert.type === "warning" ? "bg-amber-500" :
                          "bg-blue-500"
                        }`}></div>
                        
                        <div className="flex items-start gap-4 p-6 pl-8">
                          {/* Enhanced Icon */}
                          <motion.div 
                            className={`p-2.5 rounded-xl shadow-sm ${
                              alert.type === "critical" ? "bg-red-100" :
                              alert.type === "warning" ? "bg-amber-100" :
                              "bg-blue-100"
                            }`}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            {alert.type === "critical" ? 
                              <AlertTriangle className="h-5 w-5 text-red-600" /> :
                              alert.type === "warning" ? 
                              <AlertCircle className="h-5 w-5 text-amber-600" /> :
                              <Info className="h-5 w-5 text-blue-600" />
                            }
                          </motion.div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className={`font-semibold text-lg ${
                                  alert.type === "critical" ? "text-red-900" :
                                  alert.type === "warning" ? "text-amber-900" :
                                  "text-blue-900"
                                }`}>
                                  {alert.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <div className="flex items-center gap-1">
                                    {alert.trend === "down" ? 
                                      <TrendingDown className="h-3 w-3 text-red-500" /> :
                                      <TrendingUp className="h-3 w-3 text-green-500" />
                                    }
                                    <span className={`text-xs font-medium ${
                                      alert.impact === "High" ? "text-red-600" :
                                      alert.impact === "Medium" ? "text-amber-600" :
                                      "text-green-600"
                                    }`}>
                                      {alert.impact} Impact
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Action Button */}
                              <motion.button 
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  alert.type === "critical" ? "bg-red-100 text-red-800 hover:bg-red-200" :
                                  alert.type === "warning" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                                  "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {alert.action}
                              </motion.button>
                            </div>
                            
                            <p className={`text-sm mb-3 ${
                              alert.type === "critical" ? "text-red-700" :
                              alert.type === "warning" ? "text-amber-700" :
                              "text-blue-700"
                            }`}>
                              {alert.description}
                            </p>
                            
                            {/* Metric Badge */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                                📊 {alert.metric}
                              </span>
                            </div>
                          </div>
                          
                          {/* Hover Arrow */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Workspaces Section */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Recent Workspaces</h3>
                  </div>
                  <button
                    onClick={() => setActiveView("workspaces")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all workspaces →
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: "1",
                      name: "Q4 Revenue Analysis",
                      description: "Comprehensive revenue breakdown and forecasting",
                      members: ["Sarah Chen", "Mike Johnson", "Anna Martinez"],
                      lastActive: "2 hours ago",
                      status: "active",
                      progress: 75,
                      category: "finance"
                    },
                    {
                      id: "2",
                      name: "Customer Segmentation",
                      description: "Advanced customer clustering and behavioral analysis",
                      members: ["David Kim", "Lisa Wang", "Tom Rodriguez"],
                      lastActive: "1 day ago",
                      status: "review",
                      progress: 90,
                      category: "marketing"
                    },
                    {
                      id: "3",
                      name: "Product Performance",
                      description: "Feature usage analytics and user engagement metrics",
                      members: ["Alex Chen", "Maya Patel"],
                      lastActive: "3 days ago",
                      status: "archived",
                      progress: 100,
                      category: "product"
                    }
                  ].map((workspace) => (
                    <motion.div
                      key={workspace.id}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => setActiveView("workspaces")}
                      className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            workspace.category === "finance" ? "bg-green-500" :
                            workspace.category === "marketing" ? "bg-blue-500" :
                            "bg-purple-500"
                          }`} />
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            workspace.status === "active" ? "bg-green-100 text-green-800" :
                            workspace.status === "review" ? "bg-amber-100 text-amber-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {workspace.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{workspace.lastActive}</span>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-2">{workspace.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{workspace.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-gray-700">{workspace.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${
                              workspace.progress === 100 ? "bg-green-500" :
                              workspace.progress >= 75 ? "bg-blue-500" :
                              "bg-amber-500"
                            }`}
                            style={{ width: `${workspace.progress}%` }}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex -space-x-2">
                            {workspace.members.slice(0, 3).map((member, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center"
                                title={member}
                              >
                                <span className="text-xs font-medium text-gray-700">
                                  {member.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {workspace.members.length} member{workspace.members.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Key Metrics Dashboard */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 rounded-2xl p-8 shadow-lg border border-gray-200/50 overflow-hidden relative"
              >
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/5 to-transparent rounded-full -translate-y-20 -translate-x-20"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/5 to-transparent rounded-full translate-y-16 translate-x-16"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <BarChart3 className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Key Metrics Dashboard</h3>
                        <p className="text-sm text-gray-600 mt-1">Real-time insights into your business performance</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setActiveView("metrics")}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View all metrics
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockMetrics.slice(0, 6).map((metric, index) => (
                      <motion.div
                        key={metric.id}
                        variants={cardVariants}
                        whileHover="hover"
                        onClick={() => handleMetricSelect(metric)}
                        className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full shadow-sm ${
                              metric.category === "revenue" ? "bg-green-500" :
                              metric.category === "users" ? "bg-blue-500" :
                              metric.category === "engagement" ? "bg-purple-500" :
                              metric.category === "performance" ? "bg-orange-500" :
                              metric.category === "business" ? "bg-indigo-500" :
                              metric.category === "product" ? "bg-pink-500" :
                              "bg-emerald-500"
                            }`} />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                              {metric.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {metric.verified && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.2 }}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </motion.div>
                            )}
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              {getTrendIcon(metric.trend)}
                            </motion.div>
                          </div>
                        </div>
                        
                        <div className="flex items-end justify-between">
                          <div>
                            <motion.div 
                              className="text-3xl font-bold text-gray-900 mb-2"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.05 + 0.1 }}
                            >
                              {metric.value}
                            </motion.div>
                            <div className={`text-sm font-semibold flex items-center gap-1 ${getChangeColor(metric.change)}`}>
                              {metric.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {metric.change > 0 ? '+' : ''}{metric.change}% vs last week
                            </div>
                          </div>
                          <div className="ml-4 opacity-70 group-hover:opacity-100 transition-opacity">
                            <Sparkline data={metric.sparkline} trend={metric.trend} />
                          </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all activity →
                  </button>
                </div>
                
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <img
                        src={activity.avatar}
                        alt={activity.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{activity.user}</span>
                          <span className="text-sm text-gray-500">{activity.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.type === "metric" ? "bg-blue-100 text-blue-700" :
                            activity.type === "template" ? "bg-green-100 text-green-700" :
                            activity.type === "insight" ? "bg-purple-100 text-purple-700" :
                            activity.type === "scenario" ? "bg-orange-100 text-orange-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {activity.type}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeView === "workbench" && (
            <motion.div
              key="workbench"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Analytics Workbench</h2>
                  <p className="text-gray-600 mt-1">Templates, AI insights, and collaborative notebooks</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Users className="h-4 w-4" />
                    Collaborate
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    New Notebook
                  </button>
                </div>
              </div>

              {/* Workbench Navigation */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    {[
                      { id: "templates", label: "Template Library", icon: BookOpen },
                      { id: "insights", label: "AI Insights", icon: Brain },
                      { id: "notebooks", label: "Notebooks", icon: FileText },
                      { id: "collaboration", label: "Collaboration", icon: Users },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveWorkbenchTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                          activeWorkbenchTab === tab.id
                            ? "border-blue-500 text-blue-600 bg-blue-50"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeWorkbenchTab === "templates" && (
                    <div className="space-y-4">
                      {/* Template Search and Filters */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search templates by name, author, or technology..."
                              value={templateSearchTerm}
                              onChange={(e) => setTemplateSearchTerm(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="all">All Categories</option>
                            <option value="analysis">Analysis</option>
                            <option value="reporting">Reporting</option>
                            <option value="modeling">Modeling</option>
                            <option value="visualization">Visualization</option>
                          </select>
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Upload className="h-4 w-4" />
                            Upload Template
                          </button>
                        </div>
                        
                        {/* Template Categories */}
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: "popular", label: "Popular", icon: Star },
                            { id: "recent", label: "Recently Added", icon: Clock },
                            { id: "featured", label: "Featured", icon: Sparkles },
                            { id: "my-templates", label: "My Templates", icon: UserCheck },
                          ].map((category) => (
                            <button
                              key={category.id}
                              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <category.icon className="h-3 w-3" />
                              {category.label}
                            </button>
                          ))}
                        </div>
                        
                        {/* Template Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span>{filteredTemplates.length} templates</span>
                          <span>•</span>
                          <span>{filteredTemplates.filter(t => t.difficulty === "beginner").length} beginner-friendly</span>
                          <span>•</span>
                          <span>{filteredTemplates.reduce((sum, t) => sum + t.downloads, 0)} total downloads</span>
                        </div>
                      </div>

                      {/* Templates Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredTemplates.map((template) => (
                          <motion.div
                            key={template.id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                                    {template.difficulty}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-600">{template.rating}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                              
                              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                <div>
                                  <span className="text-gray-500">Category:</span>
                                  <div className="font-medium">{template.category}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Time:</span>
                                  <div className="font-medium">{template.estimatedTime}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Downloads:</span>
                                  <div className="font-medium">{template.downloads}</div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-4">
                                {template.tags.slice(0, 3).map((tag: string, index: number) => (
                                  <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {template.tags.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded-full">
                                    +{template.tags.length - 3}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">By {template.author}</span>
                                <span className="text-gray-500">{template.lastUpdated}</span>
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Preview template
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                  Preview
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Fork template
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <GitBranch className="h-4 w-4" />
                                  Fork
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Add to favorites
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <Bookmark className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTemplateSelect(template);
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  <Play className="h-4 w-4" />
                                  Use Template
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Template Detail Modal */}
                      {selectedTemplate && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                          onClick={() => setSelectedTemplate(null)}
                        >
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="p-6 border-b border-gray-200">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h2 className="text-xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                                  <p className="text-gray-600 mt-1">{selectedTemplate.description}</p>
                                  <div className="flex items-center gap-3 mt-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(selectedTemplate.difficulty)}`}>
                                      {selectedTemplate.difficulty}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="text-sm text-gray-600">{selectedTemplate.rating}</span>
                                    </div>
                                    <span className="text-sm text-gray-600">{selectedTemplate.downloads} downloads</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setSelectedTemplate(null)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="h-6 w-6" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Code Preview */}
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-3">Code Preview</h3>
                                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-gray-100">
                                      <code>{selectedTemplate.code}</code>
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Parameters */}
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-3">Parameters</h3>
                                  <div className="space-y-4">
                                    {selectedTemplate.parameters.map((param, index) => (
                                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <label className="font-medium text-gray-900">{param.name}</label>
                                          <span className={`text-xs px-2 py-1 rounded-full ${
                                            param.required ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                                          }`}>
                                            {param.required ? "Required" : "Optional"}
                                          </span>
                                        </div>
                                        
                                        {param.type === "string" && (
                                          <input
                                            type="text"
                                            placeholder={param.defaultValue || `Enter ${param.name}`}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          />
                                        )}
                                        
                                        {param.type === "number" && (
                                          <input
                                            type="number"
                                            placeholder={param.defaultValue || `Enter ${param.name}`}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          />
                                        )}
                                        
                                        {param.type === "date" && (
                                          <input
                                            type="date"
                                            defaultValue={param.defaultValue}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          />
                                        )}
                                        
                                        {param.type === "boolean" && (
                                          <div className="flex items-center gap-2">
                                            <input
                                              type="checkbox"
                                              defaultChecked={param.defaultValue}
                                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <span className="text-sm text-gray-600">Enable {param.name}</span>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className="mt-6 space-y-3">
                                    <button
                                      onClick={() => {
                                        setQueryText(selectedTemplate.code);
                                        setActiveView("query");
                                        setSelectedTemplate(null);
                                      }}
                                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                      <Play className="h-4 w-4" />
                                      Run in Query Editor
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        // Create new notebook with template
                                        setActiveWorkbenchTab("notebooks");
                                        setSelectedTemplate(null);
                                      }}
                                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                      <FileText className="h-4 w-4" />
                                      Create Notebook
                                    </button>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3">Template Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <span className="text-sm text-gray-500">Author:</span>
                                    <div className="font-medium">{selectedTemplate.author}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Category:</span>
                                    <div className="font-medium">{selectedTemplate.category}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Estimated Time:</span>
                                    <div className="font-medium">{selectedTemplate.estimatedTime}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Last Updated:</span>
                                    <div className="font-medium">{selectedTemplate.lastUpdated}</div>
                                  </div>
                                </div>
                                
                                <div className="mt-4">
                                  <span className="text-sm text-gray-500">Tags:</span>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedTemplate.tags.map((tag: string, index: number) => (
                                      <span
                                        key={index}
                                        className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {activeWorkbenchTab === "insights" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">AI-Generated Insights</h3>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Settings className="h-4 w-4" />
                            Configure
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <RefreshCw className="h-4 w-4" />
                            Refresh Insights
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Lightbulb className="h-4 w-4" />
                            Generate Insight
                          </button>
                        </div>
                      </div>
                      
                      {/* Insights Filters */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Filter by:</span>
                            {[
                              { id: "all", label: "All Types", count: mockInsights.length },
                              { id: "trend", label: "Trends", count: mockInsights.filter(i => i.type === "trend").length },
                              { id: "anomaly", label: "Anomalies", count: mockInsights.filter(i => i.type === "anomaly").length },
                              { id: "correlation", label: "Correlations", count: mockInsights.filter(i => i.type === "correlation").length },
                              { id: "forecast", label: "Forecasts", count: mockInsights.filter(i => i.type === "forecast").length },
                              { id: "opportunity", label: "Opportunities", count: mockInsights.filter(i => i.type === "opportunity").length },
                            ].map((filter) => (
                              <button
                                key={filter.id}
                                className="flex items-center gap-1 px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                              >
                                {filter.label}
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                                  {filter.count}
                                </span>
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Impact:</span>
                            {["high", "medium", "low"].map((impact) => (
                              <button
                                key={impact}
                                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                                  impact === "high" ? "bg-red-50 border-red-200 text-red-700" :
                                  impact === "medium" ? "bg-yellow-50 border-yellow-200 text-yellow-700" :
                                  "bg-green-50 border-green-200 text-green-700"
                                } hover:bg-opacity-80`}
                              >
                                {impact} ({mockInsights.filter(i => i.impact === impact).length})
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {mockInsights.map((insight) => (
                          <motion.div
                            key={insight.id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden"
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${
                                    insight.type === "trend" ? "bg-blue-100" :
                                    insight.type === "anomaly" ? "bg-red-100" :
                                    insight.type === "correlation" ? "bg-purple-100" :
                                    insight.type === "forecast" ? "bg-green-100" :
                                    "bg-yellow-100"
                                  }`}>
                                    {insight.type === "trend" && <TrendingUp className="h-5 w-5 text-blue-600" />}
                                    {insight.type === "anomaly" && <AlertTriangle className="h-5 w-5 text-red-600" />}
                                    {insight.type === "correlation" && <GitBranch className="h-5 w-5 text-purple-600" />}
                                    {insight.type === "forecast" && <Target className="h-5 w-5 text-green-600" />}
                                    {insight.type === "opportunity" && <Lightbulb className="h-5 w-5 text-yellow-600" />}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                                    <span className="text-sm text-gray-500">{insight.timestamp}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getInsightTypeColor(insight.type)}`}>
                                    {insight.type}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                                    {insight.impact} impact
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-xs text-gray-500">{Math.round(insight.confidence * 100)}%</span>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                              
                              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h5 className="font-medium text-gray-900 mb-3">Key Data:</h5>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <span className="text-gray-600">Metric:</span>
                                      <div className="font-medium text-gray-900">{insight.data.metric}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <span className="text-gray-600">Change:</span>
                                      <div className={`font-medium ${getChangeColor(insight.data.change)}`}>
                                        {insight.data.change > 0 ? '+' : ''}{insight.data.change}%
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <span className="text-gray-600">Value:</span>
                                      <div className="font-medium text-gray-900">{insight.data.value.toLocaleString()}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <span className="text-gray-600">Period:</span>
                                      <div className="font-medium text-gray-900">{insight.data.period}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border-t border-gray-200 pt-4">
                                <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                                  Recommendation:
                                </h5>
                                <p className="text-sm text-gray-600 mb-4">{insight.recommendation}</p>
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleInsightSelect(insight)}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => {
                                    // Create query based on insight
                                    const query = `-- Query generated from insight: ${insight.title}
SELECT * FROM ${insight.data.metric.toLowerCase().replace(/\s+/g, '_')} 
WHERE date_column >= '${insight.data.period}'
ORDER BY date_column DESC
LIMIT 100;`;
                                    setQueryText(query);
                                    setActiveView("query");
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <Code className="h-4 w-4" />
                                  Generate Query
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    // Share insight
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </button>
                                <button
                                  onClick={() => {
                                    // Create alert/notification
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  <Bell className="h-4 w-4" />
                                  Create Alert
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Custom Insight Generation */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Generate Custom Insight</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Metric
                              </label>
                              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="">Choose a metric...</option>
                                {mockMetrics.map((metric) => (
                                  <option key={metric.id} value={metric.id}>
                                    {metric.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Insight Type
                              </label>
                              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="">Choose type...</option>
                                <option value="trend">Trend Analysis</option>
                                <option value="anomaly">Anomaly Detection</option>
                                <option value="correlation">Correlation Analysis</option>
                                <option value="forecast">Forecast</option>
                                <option value="opportunity">Opportunity</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Time Period
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Start date"
                              />
                              <input
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="End date"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Additional Context (Optional)
                            </label>
                            <textarea
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows={3}
                              placeholder="Provide any additional context or specific questions you'd like the AI to consider..."
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id="schedule-insight"
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor="schedule-insight" className="text-sm text-gray-700">
                                Schedule recurring insight generation
                              </label>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              <Brain className="h-4 w-4" />
                              Generate Insight
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Insight Analytics */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Insight Analytics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{mockInsights.length}</div>
                            <div className="text-sm text-gray-600">Total Insights</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {mockInsights.filter(i => i.impact === "high").length}
                            </div>
                            <div className="text-sm text-gray-600">High Impact</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {Math.round(mockInsights.reduce((sum, i) => sum + i.confidence, 0) / mockInsights.length * 100)}%
                            </div>
                            <div className="text-sm text-gray-600">Avg Confidence</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {mockInsights.filter(i => i.type === "trend").length}
                            </div>
                            <div className="text-sm text-gray-600">Trend Insights</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeWorkbenchTab === "notebooks" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Collaborative Notebooks</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Plus className="h-4 w-4" />
                          New Notebook
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          {
                            name: "Customer Segmentation Analysis",
                            description: "Advanced clustering analysis for customer segmentation",
                            author: "Data Science Team",
                            lastModified: "2 hours ago",
                            cells: 24,
                            collaborators: 3
                          },
                          {
                            name: "Revenue Forecasting Model",
                            description: "Time series forecasting for monthly revenue prediction",
                            author: "Analytics Team",
                            lastModified: "1 day ago",
                            cells: 18,
                            collaborators: 2
                          },
                          {
                            name: "A/B Test Results",
                            description: "Statistical analysis of recent pricing experiment",
                            author: "Product Team",
                            lastModified: "3 days ago",
                            cells: 12,
                            collaborators: 4
                          }
                        ].map((notebook, index) => (
                          <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <FileText className="h-5 w-5 text-gray-600" />
                              <h4 className="font-semibold text-gray-900">{notebook.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{notebook.description}</p>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center justify-between">
                                <span>Author:</span>
                                <span className="font-medium">{notebook.author}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Modified:</span>
                                <span className="font-medium">{notebook.lastModified}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Cells:</span>
                                <span className="font-medium">{notebook.cells}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Collaborators:</span>
                                <span className="font-medium">{notebook.collaborators}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeWorkbenchTab === "collaboration" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Collaborative Workspace</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Share2 className="h-4 w-4" />
                          Share Workspace
                        </button>
                      </div>
                      
                      {/* Live Collaboration Status */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-800">Live Collaboration Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[
                              { name: "Sarah Chen", color: "bg-blue-500" },
                              { name: "Mike Johnson", color: "bg-green-500" },
                              { name: "Anna Martinez", color: "bg-purple-500" },
                              { name: "David Kim", color: "bg-orange-500" },
                            ].map((user, index) => (
                              <div
                                key={index}
                                className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-sm font-medium border-2 border-white`}
                                title={user.name}
                              >
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-green-700">4 active collaborators</span>
                        </div>
                      </div>
                      
                      {/* Shared Resources */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Shared Notebooks */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <h4 className="font-semibold text-gray-900">Shared Notebooks</h4>
                          </div>
                          <div className="space-y-3">
                            {[
                              {
                                name: "Q4 Revenue Analysis",
                                author: "Sarah Chen",
                                status: "editing",
                                lastEdit: "2 min ago",
                                comments: 5
                              },
                              {
                                name: "Customer Cohort Study",
                                author: "Mike Johnson",
                                status: "reviewing",
                                lastEdit: "15 min ago",
                                comments: 12
                              },
                              {
                                name: "Product Feature Impact",
                                author: "Anna Martinez",
                                status: "completed",
                                lastEdit: "1 hour ago",
                                comments: 8
                              }
                            ].map((notebook, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${
                                    notebook.status === "editing" ? "bg-blue-500" :
                                    notebook.status === "reviewing" ? "bg-orange-500" :
                                    "bg-green-500"
                                  }`}></div>
                                  <div>
                                    <h5 className="font-medium text-gray-900">{notebook.name}</h5>
                                    <p className="text-sm text-gray-600">{notebook.author} • {notebook.lastEdit}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <MessageSquare className="h-3 w-3" />
                                    {notebook.comments}
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    notebook.status === "editing" ? "bg-blue-100 text-blue-700" :
                                    notebook.status === "reviewing" ? "bg-orange-100 text-orange-700" :
                                    "bg-green-100 text-green-700"
                                  }`}>
                                    {notebook.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Shared Insights */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="h-5 w-5 text-gray-600" />
                            <h4 className="font-semibold text-gray-900">Shared Insights</h4>
                          </div>
                          <div className="space-y-3">
                            {[
                              {
                                title: "Revenue Spike Analysis",
                                author: "David Kim",
                                type: "automated",
                                reactions: 8,
                                timestamp: "5 min ago"
                              },
                              {
                                title: "Customer Churn Prediction",
                                author: "Sarah Chen",
                                type: "manual",
                                reactions: 12,
                                timestamp: "1 hour ago"
                              },
                              {
                                title: "Market Trend Correlation",
                                author: "AI Assistant",
                                type: "ai-generated",
                                reactions: 6,
                                timestamp: "2 hours ago"
                              }
                            ].map((insight, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${
                                    insight.type === "automated" ? "bg-blue-500" :
                                    insight.type === "manual" ? "bg-green-500" :
                                    "bg-purple-500"
                                  }`}></div>
                                  <div>
                                    <h5 className="font-medium text-gray-900">{insight.title}</h5>
                                    <p className="text-sm text-gray-600">{insight.author} • {insight.timestamp}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <ThumbsUp className="h-3 w-3" />
                                    {insight.reactions}
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    insight.type === "automated" ? "bg-blue-100 text-blue-700" :
                                    insight.type === "manual" ? "bg-green-100 text-green-700" :
                                    "bg-purple-100 text-purple-700"
                                  }`}>
                                    {insight.type}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Real-time Activity Feed */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Activity className="h-5 w-5 text-gray-600" />
                          <h4 className="font-semibold text-gray-900">Real-time Activity</h4>
                        </div>
                        <div className="space-y-3">
                          {[
                            {
                              user: "Sarah Chen",
                              action: "updated",
                              target: "Q4 Revenue Analysis",
                              timestamp: "Just now",
                              type: "edit"
                            },
                            {
                              user: "Mike Johnson",
                              action: "commented on",
                              target: "Customer Cohort Study",
                              timestamp: "2 min ago",
                              type: "comment"
                            },
                            {
                              user: "Anna Martinez",
                              action: "shared",
                              target: "Product Feature Impact",
                              timestamp: "5 min ago",
                              type: "share"
                            },
                            {
                              user: "David Kim",
                              action: "created",
                              target: "Revenue Spike Analysis",
                              timestamp: "10 min ago",
                              type: "create"
                            }
                          ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                              <div className={`w-2 h-2 rounded-full ${
                                activity.type === "edit" ? "bg-blue-500" :
                                activity.type === "comment" ? "bg-green-500" :
                                activity.type === "share" ? "bg-purple-500" :
                                "bg-orange-500"
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">
                                  <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                                </p>
                                <p className="text-xs text-gray-500">{activity.timestamp}</p>
                              </div>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Collaboration Settings */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Settings className="h-5 w-5 text-gray-600" />
                          <h4 className="font-semibold text-gray-900">Collaboration Settings</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Real-time Notifications</h5>
                              <p className="text-sm text-gray-600">Get notified when collaborators make changes</p>
                            </div>
                            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Auto-save</h5>
                              <p className="text-sm text-gray-600">Automatically save changes every 30 seconds</p>
                            </div>
                            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">Version Control</h5>
                              <p className="text-sm text-gray-600">Track changes and enable rollback</p>
                            </div>
                            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "scenarios" && (
            <motion.div
              key="scenarios"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Scenario Modeling</h2>
                  <p className="text-gray-600 mt-1">Interactive models for strategic planning and what-if analysis</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  New Model
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Model List */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Models</h3>
                  <div className="space-y-3">
                    {mockScenarioModels.map((model) => (
                      <motion.div
                        key={model.id}
                        variants={cardVariants}
                        whileHover="hover"
                        onClick={() => handleScenarioSelect(model)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedScenario?.id === model.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            model.category === "financial" ? "bg-green-100" :
                            model.category === "marketing" ? "bg-blue-100" :
                            model.category === "operational" ? "bg-purple-100" :
                            "bg-orange-100"
                          }`}>
                            <TestTube className={`h-5 w-5 ${
                              model.category === "financial" ? "text-green-600" :
                              model.category === "marketing" ? "text-blue-600" :
                              model.category === "operational" ? "text-purple-600" :
                              "text-orange-600"
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{model.name}</h4>
                            <p className="text-sm text-gray-600">{model.category}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{model.scenarios.length} scenarios</span>
                          <span>{model.lastModified}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Model Interface */}
                <div className="lg:col-span-2">
                  {selectedScenario ? (
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{selectedScenario.name}</h3>
                            <p className="text-gray-600">{selectedScenario.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                              <Save className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Parameters */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Parameters</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedScenario.parameters.map((param) => (
                              <div key={param.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-sm font-medium text-gray-700">{param.name}</label>
                                  <span className="text-sm text-gray-600">{param.value}{param.unit}</span>
                                </div>
                                {param.type === "slider" && (
                                  <input
                                    type="range"
                                    min={param.min}
                                    max={param.max}
                                    step={param.step}
                                    value={param.value}
                                    className="w-full"
                                  />
                                )}
                                {param.type === "input" && (
                                  <input
                                    type="number"
                                    value={param.value}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4">Results</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedScenario.outputs.map((output) => (
                            <div key={output.id} className="p-4 bg-gray-50 rounded-lg">
                              <h5 className="font-medium text-gray-900 mb-2">{output.name}</h5>
                              <div className="text-2xl font-bold text-blue-600 mb-1">
                                {output.format === "currency" ? "$2,400,000" :
                                 output.format === "percentage" ? "12.5%" :
                                 "1,250"}
                              </div>
                              <p className="text-sm text-gray-600">{output.unit}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Saved Scenarios */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Saved Scenarios</h4>
                          <button className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="h-3 w-3" />
                            Save Current
                          </button>
                        </div>
                        <div className="space-y-3">
                          {selectedScenario.scenarios.map((scenario) => (
                            <div key={scenario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <h5 className="font-medium text-gray-900">{scenario.name}</h5>
                                <p className="text-sm text-gray-600">{scenario.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">{scenario.created}</span>
                                <button className="p-1 text-gray-600 hover:text-gray-900">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TestTube className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a model to start scenario planning</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "explore" && (
            <motion.div
              key="explore"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Enhanced Page Header */}
              <motion.div 
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Search className="h-7 w-7 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      Data Explorer
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg font-medium">AI-powered data discovery and advanced analytics exploration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button 
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg font-medium"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(168, 85, 247, 0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Sparkles className="h-4 w-4" />
                    AI Discovery
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-300/50 text-gray-700 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm font-medium"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Source
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced AI-Powered Search Bar */}
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50/50 to-indigo-50/30 rounded-2xl p-8 border border-blue-200/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-6 mb-6">
                    <motion.div 
                      className="relative flex-1"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: 999999, ease: "linear" }}
                        >
                          <Search className="h-5 w-5 text-blue-600" />
                        </motion.div>
                        <Sparkles className="h-4 w-4 text-purple-600" />
                      </div>
                      <input
                        type="text"
                        placeholder="Ask AI: 'Show me tables with customer data' or 'Find revenue-related columns'"
                        className="w-full pl-16 pr-6 py-4 bg-white/90 backdrop-blur-sm border border-blue-300/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-lg font-medium transition-all duration-200"
                      />
                    </motion.div>
                    <motion.button 
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg font-semibold"
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      Search
                    </motion.button>
                  </div>
                
                  {/* Enhanced AI Suggestions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-gray-700">✨ Try asking:</span>
                    {[
                      "Show me tables with user behavior data",
                      "Find columns containing PII",
                      "Identify revenue metrics",
                      "Show data quality issues"
                    ].map((suggestion, index) => (
                      <motion.button
                        key={index}
                        className="text-sm px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:shadow-md transition-all duration-200 border border-gray-200/50 font-medium"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Interactive Data Landscape */}
              <motion.div 
                className="bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 rounded-2xl border border-gray-200/50 overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="px-8 py-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Database className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Data Landscape</h3>
                        <p className="text-sm text-gray-600 mt-1">Real-time overview of your data ecosystem</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200/50"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">24 Connected</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200/50"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-amber-700">3 Syncing</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-lg border border-red-200/50"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-red-700">1 Error</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Data Sources", value: "28", change: "+2", trend: "up", color: "blue" },
                      { label: "Active Tables", value: "186", change: "+12", trend: "up", color: "green" },
                      { label: "Total Records", value: "2.4B", change: "+145M", trend: "up", color: "purple" },
                      { label: "Quality Score", value: "87%", change: "+3%", trend: "up", color: "amber" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                            stat.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            stat.color === 'green' ? 'bg-green-100 text-green-700' :
                            stat.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            <TrendingUp className="h-3 w-3" />
                            {stat.change}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Data Source Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        category: "Production Databases",
                        count: 8,
                        icon: Database,
                        color: "blue",
                        sources: [
                          { name: "Users Database", tables: 12, size: "2.1GB", status: "healthy" },
                          { name: "Orders Database", tables: 18, size: "5.4GB", status: "healthy" },
                          { name: "Analytics DB", tables: 24, size: "12.8GB", status: "warning" }
                        ]
                      },
                      {
                        category: "Data Warehouses",
                        count: 4,
                        icon: Server,
                        color: "purple",
                        sources: [
                          { name: "Snowflake Prod", tables: 156, size: "2.1TB", status: "healthy" },
                          { name: "BigQuery Analytics", tables: 89, size: "890GB", status: "healthy" },
                          { name: "Databricks Lakehouse", tables: 234, size: "3.2TB", status: "healthy" }
                        ]
                      },
                      {
                        category: "External APIs",
                        count: 12,
                        icon: Globe,
                        color: "green",
                        sources: [
                          { name: "Stripe API", tables: 8, size: "450MB", status: "healthy" },
                          { name: "Salesforce", tables: 15, size: "1.2GB", status: "syncing" },
                          { name: "HubSpot", tables: 11, size: "680MB", status: "healthy" }
                        ]
                      }
                    ].map((category, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                      >
                        <div className={`px-4 py-3 border-b border-gray-200 ${
                          category.color === 'blue' ? 'bg-blue-50' :
                          category.color === 'purple' ? 'bg-purple-50' :
                          'bg-green-50'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              category.color === 'blue' ? 'bg-blue-100' :
                              category.color === 'purple' ? 'bg-purple-100' :
                              'bg-green-100'
                            }`}>
                              <category.icon className={`h-5 w-5 ${
                                category.color === 'blue' ? 'text-blue-600' :
                                category.color === 'purple' ? 'text-purple-600' :
                                'text-green-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{category.category}</h4>
                              <p className="text-sm text-gray-600">{category.count} sources</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          {category.sources.map((source, sourceIndex) => (
                            <motion.div
                              key={sourceIndex}
                              variants={cardVariants}
                              whileHover="hover"
                              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 cursor-pointer transition-all"
                              onClick={() => {
                                // Handle source selection
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  source.status === 'healthy' ? 'bg-green-500' :
                                  source.status === 'syncing' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`} />
                                <div>
                                  <h5 className="font-medium text-gray-900 text-sm">{source.name}</h5>
                                  <p className="text-xs text-gray-500">{source.tables} tables • {source.size}</p>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Interactive Data Explorer */}
              {selectedDataSource && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <selectedDataSource.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{selectedDataSource.name}</h3>
                          <p className="text-sm text-gray-600">{selectedDataSource.tables.length} tables • Last sync: 2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <RefreshCw className="h-4 w-4" />
                          Sync Now
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Eye className="h-4 w-4" />
                          Explore All
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Table List with Advanced Filters */}
                      <div className="lg:col-span-1">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Tables</h4>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                              <Filter className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                              <SortAsc className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {selectedDataSource.tables.map((table) => (
                            <motion.div
                              key={table.id}
                              variants={cardVariants}
                              whileHover="hover"
                              onClick={() => handleTableSelect(table)}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedTable?.id === table.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gray-100 rounded-lg">
                                    <Table className="h-4 w-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-gray-900">{table.name}</h5>
                                    <p className="text-xs text-gray-500 mt-1">{table.rowCount.toLocaleString()} rows</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                    <Eye className="h-3 w-3" />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                    <BarChart3 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{table.columns.length} columns</span>
                                <span>•</span>
                                <span>Updated {table.lastUpdated}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Table Details & Schema */}
                      <div className="lg:col-span-2">
                        {selectedTable ? (
                          <div className="space-y-6">
                            {/* Table Overview */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h4 className="text-xl font-semibold text-gray-900">{selectedTable.name}</h4>
                                  <p className="text-gray-600 mt-1">Comprehensive table analysis and schema details</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Code className="h-4 w-4 mr-2" />
                                    Query
                                  </button>
                                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                  </button>
                                </div>
                              </div>
                              
                              {/* Table Stats */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-lg font-bold text-gray-900">{selectedTable.rowCount.toLocaleString()}</div>
                                  <div className="text-sm text-gray-600">Total Rows</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-lg font-bold text-gray-900">{selectedTable.columns.length}</div>
                                  <div className="text-sm text-gray-600">Columns</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-lg font-bold text-gray-900">2.1GB</div>
                                  <div className="text-sm text-gray-600">Table Size</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-lg font-bold text-green-600">94%</div>
                                  <div className="text-sm text-gray-600">Data Quality</div>
                                </div>
                              </div>
                            </div>

                            {/* Enhanced Schema View */}
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-semibold text-gray-900">Schema & Data Profile</h5>
                                  <div className="flex items-center gap-2">
                                    <button className="text-sm text-blue-600 hover:text-blue-700">
                                      <Sparkles className="h-4 w-4 mr-1" />
                                      AI Analysis
                                    </button>
                                    <button className="text-sm text-gray-600 hover:text-gray-700">
                                      <BarChart3 className="h-4 w-4 mr-1" />
                                      Full Profile
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="p-6">
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                  {selectedTable.columns.map((column) => (
                                    <motion.div
                                      key={column.id}
                                      variants={cardVariants}
                                      whileHover="hover"
                                      className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                                    >
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                          <div className={`p-2 rounded-lg ${
                                            column.type.includes('int') || column.type.includes('decimal') || column.type === 'number' ? 'bg-green-100' :
                                            column.type.includes('varchar') || column.type.includes('text') || column.type === 'string' ? 'bg-blue-100' :
                                            column.type.includes('date') || column.type.includes('time') || column.type === 'date' ? 'bg-purple-100' :
                                            'bg-gray-100'
                                          }`}>
                                            <div className={`h-4 w-4 flex items-center justify-center text-xs font-bold ${
                                              column.type.includes('int') || column.type.includes('decimal') || column.type === 'number' ? 'text-green-600' :
                                              column.type.includes('varchar') || column.type.includes('text') || column.type === 'string' ? 'text-blue-600' :
                                              column.type.includes('date') || column.type.includes('time') || column.type === 'date' ? 'text-purple-600' :
                                              'text-gray-600'
                                            }`}>
                                              {column.type.includes('int') || column.type.includes('decimal') || column.type === 'number' ? '#' :
                                               column.type.includes('varchar') || column.type.includes('text') || column.type === 'string' ? 'T' :
                                               column.type.includes('date') || column.type.includes('time') || column.type === 'date' ? 'D' :
                                               '?'}
                                            </div>
                                          </div>
                                          <div>
                                            <h6 className="font-medium text-gray-900">{column.name}</h6>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                              <span>{column.type}</span>
                                              <span>•</span>
                                              <span className={column.nullable ? "text-amber-600" : "text-red-600"}>
                                                {column.nullable ? "Nullable" : "Required"}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                            <BarChart3 className="h-4 w-4" />
                                          </button>
                                          <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                            <Eye className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </div>
                                      
                                      {/* Column Statistics */}
                                      <div className="grid grid-cols-3 gap-4 text-xs">
                                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                                          <div className="font-medium text-gray-900">
                                            {column.type.includes('int') || column.type === 'number' ? '15,234' : '98.2%'}
                                          </div>
                                          <div className="text-gray-600">
                                            {column.type.includes('int') || column.type === 'number' ? 'Avg Value' : 'Unique'}
                                          </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                                          <div className="font-medium text-gray-900">
                                            {column.nullable ? '3.2%' : '0%'}
                                          </div>
                                          <div className="text-gray-600">Null Rate</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                                          <div className="font-medium text-green-600">Valid</div>
                                          <div className="text-gray-600">Quality</div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-24 text-gray-500">
                            <Table className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Select a table to explore</h4>
                            <p>Choose a table from the list to view its schema, data profile, and analytics</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeView === "query" && (
            <motion.div
              key="query"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Enhanced Query Page Header */}
              <motion.div 
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Code className="h-7 w-7 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      Advanced Query Builder
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg font-medium">Professional SQL editor with AI assistance and query optimization</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <MousePointer className="h-4 w-4" />
                    Visual Builder
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg font-medium"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(168, 85, 247, 0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Sparkles className="h-4 w-4" />
                    AI Assistant
                  </motion.button>
                  <motion.button
                    onClick={handleRunQuery}
                    disabled={!queryText.trim() || isQueryRunning}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 shadow-sm font-medium"
                    whileHover={!queryText.trim() || isQueryRunning ? {} : { scale: 1.02, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)" }}
                    whileTap={!queryText.trim() || isQueryRunning ? {} : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {isQueryRunning ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {isQueryRunning ? "Running..." : "Execute Query"}
                  </motion.button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Query Editor */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Enhanced SQL Editor */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">SQL Editor</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Connected</span>
                            </div>
                            <span>•</span>
                            <span>Database: analytics_prod</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Save className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Download className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Share2 className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {/* Line Numbers */}
                      <div className="bg-gray-50 px-3 py-4 border-r border-gray-200">
                        <div className="flex flex-col gap-1 text-xs text-gray-500 font-mono">
                          {Array.from({ length: 20 }, (_, i) => (
                            <span key={i} className="leading-5">{i + 1}</span>
                          ))}
                        </div>
                      </div>
                      {/* Editor */}
                      <div className="flex-1 p-4">
                        <textarea
                          value={queryText}
                          onChange={(e) => setQueryText(e.target.value)}
                          placeholder={`-- Start typing your SQL query here
SELECT 
    u.id,
    u.email,
    u.created_at,
    COUNT(o.id) as order_count,
    AVG(o.total_amount) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.email, u.created_at
ORDER BY order_count DESC
LIMIT 100;`}
                          className="w-full h-64 resize-none border-none outline-none font-mono text-sm leading-5 text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    </div>
                    
                    {/* Query Analysis Bar */}
                    <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">Syntax Valid</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-700">Estimated Cost: $0.02</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-700">Est. Runtime: 1.2s</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Optimize Query
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-700">
                            Explain Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Query Results with Enhanced Features */}
                  {(queryResults || isQueryRunning) && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="border-b border-gray-200 px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Table className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">Query Results</span>
                          </div>
                          {queryResults && (
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{queryResults.totalRows.toLocaleString()} rows</span>
                                <span>{queryResults.executionTime}s</span>
                                <span>•</span>
                                <span className="text-green-600">Success</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                                  <Download className="h-3 w-3" />
                                  CSV
                                </button>
                                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                                  <FileText className="h-3 w-3" />
                                  JSON
                                </button>
                                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
                                  <BarChart3 className="h-3 w-3" />
                                  Chart
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="overflow-hidden">
                        {isQueryRunning ? (
                          <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                              <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                              <p className="text-gray-600 mb-2">Executing query...</p>
                              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                              </div>
                            </div>
                          </div>
                        ) : queryResults ? (
                          <div className="max-h-96 overflow-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 sticky top-0">
                                <tr className="border-b border-gray-200">
                                  {queryResults.columns.map((column, index) => (
                                    <th key={index} className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                                      <div className="flex items-center gap-2">
                                        <span>{column}</span>
                                        <ArrowUpDown className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-600" />
                                      </div>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {queryResults.rows.map((row, rowIndex) => (
                                  <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50">
                                    {row.map((cell, cellIndex) => (
                                      <td key={cellIndex} className="py-3 px-4 text-sm text-gray-700">
                                        {cell?.toString() || ''}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Database Explorer */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Explorer</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <button className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-50">
                          <Database className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">analytics_prod</span>
                        </button>
                        <div className="ml-6 space-y-1">
                          {['users', 'orders', 'products', 'reviews', 'sessions'].map((table, index) => (
                            <button
                              key={index}
                              className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-50 group"
                            >
                              <Table className="h-3 w-3 text-gray-500" />
                              <span className="text-sm text-gray-700">{table}</span>
                              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <Info className="h-3 w-3 text-gray-400" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Saved Queries */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Saved Queries</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "User Growth Analysis", description: "Monthly active users trend", saved: "2 days ago" },
                        { name: "Revenue by Product", description: "Product performance metrics", saved: "1 week ago" },
                        { name: "Customer Segments", description: "Behavioral user clustering", saved: "2 weeks ago" }
                      ].map((query, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 text-sm">{query.name}</h4>
                            <Star className="h-3 w-3 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{query.description}</p>
                          <p className="text-xs text-gray-500">Saved {query.saved}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Query Templates */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Templates</h3>
                    <div className="space-y-3">
                      {mockAnalyticsTemplates.slice(0, 4).map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                              {template.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{template.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Query History */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Query History</h3>
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { 
                          query: "SELECT COUNT(*) FROM users WHERE created_at >= '2024-01-01'", 
                          time: "2 minutes ago",
                          status: "success",
                          rows: 15234
                        },
                        { 
                          query: "SELECT product_name, SUM(quantity) FROM orders GROUP BY product_name", 
                          time: "1 hour ago",
                          status: "success",
                          rows: 847
                        },
                        { 
                          query: "SELECT * FROM users WHERE email LIKE '%@company.com'", 
                          time: "3 hours ago",
                          status: "error",
                          rows: 0
                        }
                      ].map((item, index) => (
                        <button
                          key={index}
                          onClick={() => setQueryText(item.query)}
                          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                item.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                              }`} />
                              <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                            <span className="text-xs text-gray-500">{item.rows} rows</span>
                          </div>
                          <p className="text-xs text-gray-900 font-mono truncate">{item.query}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "dashboards" && (
            <motion.div
              key="dashboards"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dashboards</h2>
                  <p className="text-gray-600 mt-1">Create and manage your analytics dashboards</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  Create Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Executive Overview",
                    description: "High-level business metrics and KPIs",
                    thumbnail: "/api/placeholder/400/240",
                    views: 1247,
                    lastModified: "2 hours ago",
                    status: "published",
                    shared: true
                  },
                  {
                    name: "Marketing Performance",
                    description: "Campaign metrics and conversion funnels",
                    thumbnail: "/api/placeholder/400/240",
                    views: 892,
                    lastModified: "1 day ago",
                    status: "published",
                    shared: false
                  },
                  {
                    name: "Product Analytics",
                    description: "User behavior and feature adoption",
                    thumbnail: "/api/placeholder/400/240",
                    views: 634,
                    lastModified: "3 days ago",
                    status: "draft",
                    shared: false
                  }
                ].map((dashboard, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer"
                  >
                    <div className="aspect-video bg-gray-100">
                      <img
                        src={dashboard.thumbnail}
                        alt={dashboard.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{dashboard.name}</h3>
                        <div className="flex items-center gap-2">
                          {dashboard.shared && (
                            <Share2 className="h-4 w-4 text-gray-400" />
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            dashboard.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {dashboard.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{dashboard.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{dashboard.views}</span>
                        </div>
                        <span>{dashboard.lastModified}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === "workspaces" && (
            <motion.div
              key="workspaces"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Workspaces</h2>
                  <p className="text-gray-600 mt-1">Collaborate with your team on analytics projects</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  Create Workspace
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWorkspaces.map((workspace) => (
                  <motion.div
                    key={workspace.id}
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => setSelectedWorkspace(workspace)}
                    className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={workspace.avatar}
                        alt={workspace.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{workspace.name}</h3>
                        <p className="text-sm text-gray-600">{workspace.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{workspace.members}</div>
                        <div className="text-xs text-gray-600">Members</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{workspace.dashboards}</div>
                        <div className="text-xs text-gray-600">Dashboards</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{workspace.queries}</div>
                        <div className="text-xs text-gray-600">Queries</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        workspace.role === "admin" ? "bg-red-100 text-red-700" :
                        workspace.role === "editor" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {workspace.role}
                      </span>
                      <span className="text-sm text-gray-500">{workspace.lastActivity}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === "metrics" && (
            <motion.div
              key="metrics"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Unified Metrics Catalog</h2>
                  <p className="text-gray-600 mt-1">Discover, explore, and govern your organization's metrics</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Shield className="h-4 w-4" />
                    Governance
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Create Metric
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search metrics by name, owner, or tags..."
                        value={metricSearchQuery}
                        onChange={(e) => setMetricSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={selectedMetricType}
                      onChange={(e) => setSelectedMetricType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="revenue">Revenue</option>
                      <option value="users">Users</option>
                      <option value="engagement">Engagement</option>
                      <option value="performance">Performance</option>
                      <option value="operational">Operational</option>
                    </select>
                    <select
                      value={selectedMetricStatus}
                      onChange={(e) => setSelectedMetricStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="deprecated">Deprecated</option>
                      <option value="draft">Draft</option>
                    </select>
                    <button className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                      <CheckCircle className="h-4 w-4" />
                      Certified Only
                    </button>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockCatalogMetrics
                  .filter(metric => {
                    const matchesSearch = metricSearchQuery === "" || 
                      metric.name.toLowerCase().includes(metricSearchQuery.toLowerCase()) ||
                      metric.owner.toLowerCase().includes(metricSearchQuery.toLowerCase()) ||
                      metric.tags.some((tag: string) => tag.toLowerCase().includes(metricSearchQuery.toLowerCase()));
                    
                    const matchesType = selectedMetricType === "all" || metric.type === selectedMetricType;
                    const matchesStatus = selectedMetricStatus === "all" || metric.status === selectedMetricStatus;
                    
                    return matchesSearch && matchesType && matchesStatus;
                  })
                  .map((metric) => (
                    <motion.div
                      key={metric.id}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => setSelectedCatalogMetric(metric)}
                      className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            metric.type === "revenue" ? "bg-green-500" :
                            metric.type === "users" ? "bg-blue-500" :
                            metric.type === "engagement" ? "bg-purple-500" :
                            metric.type === "performance" ? "bg-orange-500" :
                            "bg-gray-500"
                          }`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                              {metric.status === "active" && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-xs text-green-600">Certified</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{metric.owner}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            metric.status === "active" ? "bg-green-100 text-green-700" :
                            metric.status === "deprecated" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {metric.status}
                          </span>
                          {metric.status === "active" && (
                            <div title="Governance Approved"><Shield className="h-4 w-4 text-blue-500" /></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{metric.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Code className="h-4 w-4 text-gray-400" />
                          <span className="font-mono text-gray-600 truncate">{metric.formula}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {metric.tags.slice(0, 3).map((tag: string, index: number) => (
                            <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                              {tag}
                            </span>
                          ))}
                          {metric.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded">
                              +{metric.tags.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{metric.usage.dashboards}</div>
                            <div className="text-xs text-gray-600">Dashboards</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{metric.usage.queries}</div>
                            <div className="text-xs text-gray-600">Queries</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-600">{metric.usage.lastAccessed}</div>
                            <div className="text-xs text-gray-600">Last used</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Metric Detail Modal */}
              {selectedCatalogMetric && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedCatalogMetric(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${
                            selectedCatalogMetric.type === "revenue" ? "bg-green-500" :
                            selectedCatalogMetric.type === "users" ? "bg-blue-500" :
                            selectedCatalogMetric.type === "engagement" ? "bg-purple-500" :
                            selectedCatalogMetric.type === "performance" ? "bg-orange-500" :
                            "bg-gray-500"
                          }`} />
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{selectedCatalogMetric.name}</h2>
                            <p className="text-gray-600">{selectedCatalogMetric.owner}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedCatalogMetric(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 overflow-y-auto">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                          <p className="text-gray-600">{selectedCatalogMetric.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Formula</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <code className="text-sm text-gray-800">{selectedCatalogMetric.formula}</code>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Dependencies</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedCatalogMetric.dependencies.map((dep: string, index: number) => (
                              <span key={index} className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Data Lineage</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            {/* Lineage Graph */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Lineage Flow</span>
                                <button className="text-xs text-blue-600 hover:text-blue-800">View Full Graph</button>
                              </div>
                              <div className="relative">
                                <svg viewBox="0 0 400 120" className="w-full h-24">
                                  {/* Source */}
                                  <rect x="10" y="40" width="80" height="40" rx="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1"/>
                                  <text x="50" y="62" textAnchor="middle" className="text-xs fill-gray-700">Source DB</text>
                                  
                                  {/* Arrow 1 */}
                                  <line x1="90" y1="60" x2="110" y2="60" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                                  
                                  {/* Transform 1 */}
                                  <rect x="110" y="40" width="80" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1"/>
                                  <text x="150" y="62" textAnchor="middle" className="text-xs fill-blue-700">Transform</text>
                                  
                                  {/* Arrow 2 */}
                                  <line x1="190" y1="60" x2="210" y2="60" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                                  
                                  {/* Transform 2 */}
                                  <rect x="210" y="40" width="80" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1"/>
                                  <text x="250" y="62" textAnchor="middle" className="text-xs fill-blue-700">Aggregate</text>
                                  
                                  {/* Arrow 3 */}
                                  <line x1="290" y1="60" x2="310" y2="60" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                                  
                                  {/* Metric */}
                                  <rect x="310" y="40" width="80" height="40" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
                                  <text x="350" y="62" textAnchor="middle" className="text-xs fill-green-700">Metric</text>
                                  
                                  {/* Arrow marker */}
                                  <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                      <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af"/>
                                    </marker>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                            
                            {/* Lineage Details */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Database className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">Source: {selectedCatalogMetric.lineage.source}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <GitBranch className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  Transformations: {selectedCatalogMetric.lineage.transformations.join(" → ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Governance Section */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Governance</h3>
                          <div className="space-y-3">
                            {/* Certification Status */}
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                  <span className="text-sm font-medium text-green-800">Certified</span>
                                  <p className="text-xs text-green-600">Approved by Data Governance Team</p>
                                </div>
                              </div>
                              <span className="text-xs text-green-600">v2.1</span>
                            </div>
                            
                            {/* Impact Analysis */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                <span className="text-sm font-medium text-gray-700">Impact Analysis</span>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">Downstream metrics</span>
                                  <span className="text-gray-900">12 affected</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">Active dashboards</span>
                                  <span className="text-gray-900">8 impacted</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">Automated alerts</span>
                                  <span className="text-gray-900">3 configured</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Approval Workflow */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <UserCheck className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">Approval Workflow</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Data Owner: Sarah Chen</span>
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Data Steward: Mike Johnson</span>
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Governance Team: Approved</span>
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Version History */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Version History</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">v2.1</span>
                                <span className="text-xs text-gray-500">Current</span>
                              </div>
                              <div className="text-xs text-gray-500">2 days ago</div>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <span className="text-sm text-gray-700">v2.0</span>
                                <span className="text-xs text-gray-500">Previous</span>
                              </div>
                              <div className="text-xs text-gray-500">1 week ago</div>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <span className="text-sm text-gray-700">v1.9</span>
                                <span className="text-xs text-gray-500">Deprecated</span>
                              </div>
                              <div className="text-xs text-gray-500">3 weeks ago</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Change Log */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Recent Changes</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                              <div>
                                <p className="text-sm text-blue-800">Formula updated to include tax adjustments</p>
                                <p className="text-xs text-blue-600">Sarah Chen • 2 days ago</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <div>
                                <p className="text-sm text-green-800">Governance approval received</p>
                                <p className="text-xs text-green-600">Data Governance Team • 3 days ago</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                              <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm text-gray-700">Performance optimization applied</p>
                                <p className="text-xs text-gray-600">Mike Johnson • 1 week ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Usage Statistics</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="text-2xl font-bold text-gray-900">{selectedCatalogMetric.usage.dashboards}</div>
                              <div className="text-sm text-gray-600">Dashboards using this metric</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="text-2xl font-bold text-gray-900">{selectedCatalogMetric.usage.queries}</div>
                              <div className="text-sm text-gray-600">Queries using this metric</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedCatalogMetric.tags.map((tag: string, index: number) => (
                              <span key={index} className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

SelfServicePortal.displayName = "SelfServicePortal";

export default SelfServicePortal;