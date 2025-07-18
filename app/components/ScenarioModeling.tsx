// app/components/ScenarioModeling.tsx
import React, { memo, useState, useCallback, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Cog,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Target,
  Zap,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Save,
  Download,
  Share2,
  Copy,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Users,
  Database,
  FileText,
  Code,
  ArrowRight,
  ChevronRight,
  Plus,
  Minus,
  Edit,
  Trash2,
  Sparkles,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bookmark,
  Tag,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Grid3x3,
  List,
  Table,
  MoreHorizontal,
  Maximize,
  Minimize,
  Layers,
  GitBranch,
  Network,
  Shuffle,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Move,
  Resize,
  Crop,
  ZoomIn,
  ZoomOut,
  Focus,
  Crosshair,
  Compass,
  Map,
  Navigation,
  Route,
  MapPin,
  Globe,
  Satellite,
  Radar,
  Scan,
  MousePointer,
  Hand,
  Grab,
  Move3d,
  Rotate3d,
  Box,
  Cube,
  Sphere,
  Cylinder,
  Cone,
  Pyramid,
  Torus,
  Dodecahedron,
  Icosahedron,
  Octahedron,
  Tetrahedron,
  Hexagon,
  Pentagon,
  Triangle,
  Square,
  Circle,
  Diamond,
  Heart,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  Won,
  Rupee,
  Ruble,
  Hryvnia,
  Shekel,
  Dinar,
  Dirham,
  Riyal,
  Peso,
  Real,
  Rand,
  Krone,
  Frank,
  Lira,
  Forint,
  Zloty,
  Koruna,
  Leu,
  Lev,
  Denar,
  Tenge,
  Som,
  Manat,
  Lari,
  Dram,
  Tugrik,
  Kyat,
  Kip,
  Riel,
  Dong,
  Baht,
  Ringgit,
  Rupiah,
  Peso2,
  Rial,
  Afghani,
  Taka,
  Ngultrum,
  Nakfa,
  Birr,
  Cedi,
  Dalasi,
  Leone,
  Naira,
  Kwacha,
  Pula,
  Lilangeni,
  Ariary,
  Ouguiya,
  Escudo,
  Dobra,
  Franc,
  Kwanza,
  Metical,
  Shilling,
  Pound,
  Drachma,
  Peseta,
  Lira2,
  Mark,
  Guilder,
  Schilling,
  Florin,
  Kroon,
  Lat,
  Litas,
  Tolar,
  Kuna,
  Convertible,
  Marka,
  Lek,
  Dinar2,
  Levs,
  Leva,
  Stotinka,
  Bani,
  Filler,
  Halala,
  Piastre,
  Qirsh,
  Fils,
  Centavo,
  Centesimo,
  Centime,
  Pfennig,
  Groschen,
  Heller,
  Kreuzer,
  Pfund,
  Thaler,
  Gulden,
  Ducat,
  Solidus,
  Bezant,
  Talent,
  Shekel2,
  Mina,
  Gerah,
  Beka,
  Pim,
  Kesitah,
  Agorot,
  Pruta,
  Mil,
  Agora,
  Lepton,
  Chalcus,
  Obol,
  Drachma2,
  Stater,
  Mite,
  Farthing,
  Halfpenny,
  Penny,
  Twopence,
  Threepence,
  Groat,
  Sixpence,
  Shilling2,
  Florin2,
  Halfcrown,
  Crown,
  Sovereign,
  Guinea,
  Angel,
  Noble,
  Ryal,
  Laurel,
  Jacobus,
  Carolus,
  Spade,
  Cartwheel,
  Bun,
  Godless,
  Gothic,
  Jubilee,
  Veiled,
  Old,
  Young,
  Mature,
  Mature2,
  Mature3,
  Mature4,
  Mature5,
} from "lucide-react";

// Types
interface ScenarioModel {
  id: string;
  name: string;
  description: string;
  category: "financial" | "operational" | "strategic" | "risk" | "market";
  status: "draft" | "active" | "completed" | "archived";
  owner: string;
  created: string;
  lastModified: string;
  baseCase: {
    name: string;
    assumptions: { [key: string]: number | string };
    results: { [key: string]: number };
  };
  scenarios: ScenarioCase[];
  variables: ModelVariable[];
  constraints: ModelConstraint[];
  outcomes: ModelOutcome[];
  tags: string[];
  collaborators: string[];
  runs: number;
  accuracy: number;
  confidence: number;
}

interface ScenarioCase {
  id: string;
  name: string;
  description: string;
  type: "optimistic" | "pessimistic" | "stress" | "custom";
  probability: number;
  assumptions: { [key: string]: number | string };
  results: { [key: string]: number };
  variance: { [key: string]: number };
  impact: "low" | "medium" | "high" | "critical";
  created: string;
  lastRun: string;
  status: "pending" | "running" | "completed" | "failed";
}

interface ModelVariable {
  id: string;
  name: string;
  type: "input" | "calculated" | "output";
  dataType: "number" | "percentage" | "currency" | "date" | "text";
  description: string;
  defaultValue: number | string;
  minValue?: number;
  maxValue?: number;
  formula?: string;
  sensitivity: "low" | "medium" | "high";
  unit: string;
  category: string;
  dependencies: string[];
}

interface ModelConstraint {
  id: string;
  name: string;
  type: "range" | "relationship" | "business_rule" | "regulatory";
  description: string;
  expression: string;
  severity: "warning" | "error" | "critical";
  isActive: boolean;
  violationCount: number;
}

interface ModelOutcome {
  id: string;
  name: string;
  description: string;
  type: "kpi" | "metric" | "financial" | "operational";
  formula: string;
  target: number;
  threshold: {
    red: number;
    yellow: number;
    green: number;
  };
  unit: string;
  category: string;
  importance: "low" | "medium" | "high" | "critical";
}

interface ModelingMetrics {
  totalModels: number;
  activeModels: number;
  totalRuns: number;
  avgAccuracy: number;
  popularCategories: {
    name: string;
    count: number;
    growth: string;
  }[];
  recentActivity: {
    type: "created" | "modified" | "run" | "shared";
    model: string;
    user: string;
    timestamp: string;
  }[];
}

// Sample data
const modelingMetrics: ModelingMetrics = {
  totalModels: 156,
  activeModels: 89,
  totalRuns: 3247,
  avgAccuracy: 87.4,
  popularCategories: [
    { name: "Financial Planning", count: 42, growth: "+18%" },
    { name: "Market Analysis", count: 38, growth: "+25%" },
    { name: "Risk Assessment", count: 29, growth: "+12%" },
    { name: "Operational Planning", count: 25, growth: "+15%" },
    { name: "Strategic Planning", count: 22, growth: "+22%" },
  ],
  recentActivity: [
    { type: "created", model: "Q2 Revenue Forecast", user: "Sarah Chen", timestamp: "2 hours ago" },
    { type: "run", model: "Market Expansion Model", user: "Mike Johnson", timestamp: "4 hours ago" },
    { type: "modified", model: "Cost Optimization", user: "Lisa Wang", timestamp: "6 hours ago" },
    { type: "shared", model: "Risk Assessment Framework", user: "David Brown", timestamp: "8 hours ago" },
  ],
};

const scenarioModels: ScenarioModel[] = [
  {
    id: "revenue-forecast",
    name: "Q2 Revenue Forecast",
    description: "Comprehensive revenue forecasting model with multiple scenarios for Q2 planning",
    category: "financial",
    status: "active",
    owner: "Sarah Chen",
    created: "2024-01-10",
    lastModified: "2024-01-15",
    baseCase: {
      name: "Expected Case",
      assumptions: {
        "Monthly Growth Rate": 5.2,
        "Customer Acquisition Cost": 125,
        "Average Deal Size": 2500,
        "Churn Rate": 2.1,
        "Marketing Spend": 45000,
      },
      results: {
        "Total Revenue": 1250000,
        "New Customers": 450,
        "Customer Lifetime Value": 12500,
        "Gross Margin": 78.5,
        "Net Profit": 325000,
      },
    },
    scenarios: [
      {
        id: "optimistic",
        name: "Best Case",
        description: "Optimistic scenario with accelerated growth and market expansion",
        type: "optimistic",
        probability: 0.25,
        assumptions: {
          "Monthly Growth Rate": 8.5,
          "Customer Acquisition Cost": 95,
          "Average Deal Size": 3200,
          "Churn Rate": 1.5,
          "Marketing Spend": 52000,
        },
        results: {
          "Total Revenue": 1680000,
          "New Customers": 620,
          "Customer Lifetime Value": 16800,
          "Gross Margin": 82.3,
          "Net Profit": 485000,
        },
        variance: {
          "Total Revenue": 34.4,
          "New Customers": 37.8,
          "Customer Lifetime Value": 34.4,
          "Gross Margin": 4.8,
          "Net Profit": 49.2,
        },
        impact: "high",
        created: "2024-01-12",
        lastRun: "2024-01-15",
        status: "completed",
      },
      {
        id: "pessimistic",
        name: "Worst Case",
        description: "Conservative scenario with market challenges and reduced growth",
        type: "pessimistic",
        probability: 0.15,
        assumptions: {
          "Monthly Growth Rate": 2.1,
          "Customer Acquisition Cost": 165,
          "Average Deal Size": 1900,
          "Churn Rate": 3.2,
          "Marketing Spend": 38000,
        },
        results: {
          "Total Revenue": 890000,
          "New Customers": 285,
          "Customer Lifetime Value": 8200,
          "Gross Margin": 72.1,
          "Net Profit": 145000,
        },
        variance: {
          "Total Revenue": -28.8,
          "New Customers": -36.7,
          "Customer Lifetime Value": -34.4,
          "Gross Margin": -8.2,
          "Net Profit": -55.4,
        },
        impact: "high",
        created: "2024-01-12",
        lastRun: "2024-01-15",
        status: "completed",
      },
    ],
    variables: [
      {
        id: "growth-rate",
        name: "Monthly Growth Rate",
        type: "input",
        dataType: "percentage",
        description: "Monthly revenue growth rate",
        defaultValue: 5.2,
        minValue: 0,
        maxValue: 20,
        sensitivity: "high",
        unit: "%",
        category: "Growth",
        dependencies: [],
      },
      {
        id: "cac",
        name: "Customer Acquisition Cost",
        type: "input",
        dataType: "currency",
        description: "Average cost to acquire a new customer",
        defaultValue: 125,
        minValue: 50,
        maxValue: 300,
        sensitivity: "medium",
        unit: "$",
        category: "Marketing",
        dependencies: [],
      },
      {
        id: "deal-size",
        name: "Average Deal Size",
        type: "input",
        dataType: "currency",
        description: "Average revenue per customer deal",
        defaultValue: 2500,
        minValue: 1000,
        maxValue: 10000,
        sensitivity: "high",
        unit: "$",
        category: "Sales",
        dependencies: [],
      },
    ],
    constraints: [
      {
        id: "growth-constraint",
        name: "Growth Rate Limit",
        type: "range",
        description: "Monthly growth rate should not exceed 15% for sustainability",
        expression: "Monthly Growth Rate <= 15",
        severity: "warning",
        isActive: true,
        violationCount: 0,
      },
      {
        id: "margin-constraint",
        name: "Minimum Gross Margin",
        type: "business_rule",
        description: "Gross margin must be at least 70% to maintain profitability",
        expression: "Gross Margin >= 70",
        severity: "error",
        isActive: true,
        violationCount: 0,
      },
    ],
    outcomes: [
      {
        id: "revenue-outcome",
        name: "Total Revenue",
        description: "Total quarterly revenue",
        type: "financial",
        formula: "SUM(Monthly Revenue)",
        target: 1500000,
        threshold: {
          red: 1000000,
          yellow: 1200000,
          green: 1500000,
        },
        unit: "$",
        category: "Revenue",
        importance: "critical",
      },
      {
        id: "profit-outcome",
        name: "Net Profit",
        description: "Net profit after all expenses",
        type: "financial",
        formula: "Total Revenue - Total Costs",
        target: 400000,
        threshold: {
          red: 200000,
          yellow: 300000,
          green: 400000,
        },
        unit: "$",
        category: "Profitability",
        importance: "critical",
      },
    ],
    tags: ["revenue", "forecast", "quarterly", "growth"],
    collaborators: ["mike.johnson@company.com", "lisa.wang@company.com"],
    runs: 23,
    accuracy: 89.2,
    confidence: 0.85,
  },
  {
    id: "market-expansion",
    name: "Market Expansion Model",
    description: "Strategic analysis of market expansion opportunities across different regions",
    category: "strategic",
    status: "active",
    owner: "Mike Johnson",
    created: "2024-01-08",
    lastModified: "2024-01-14",
    baseCase: {
      name: "Current Market",
      assumptions: {
        "Market Size": 500000000,
        "Market Share": 3.2,
        "Expansion Cost": 2500000,
        "Time to Break Even": 18,
        "Competition Level": 7.5,
      },
      results: {
        "Revenue Potential": 16000000,
        "Market Penetration": 2.8,
        "ROI": 24.5,
        "Break Even Period": 22,
        "Risk Score": 4.2,
      },
    },
    scenarios: [
      {
        id: "rapid-expansion",
        name: "Rapid Expansion",
        description: "Aggressive market entry with high investment",
        type: "optimistic",
        probability: 0.3,
        assumptions: {
          "Market Size": 500000000,
          "Market Share": 5.8,
          "Expansion Cost": 4200000,
          "Time to Break Even": 14,
          "Competition Level": 8.2,
        },
        results: {
          "Revenue Potential": 29000000,
          "Market Penetration": 4.6,
          "ROI": 38.2,
          "Break Even Period": 16,
          "Risk Score": 6.8,
        },
        variance: {
          "Revenue Potential": 81.3,
          "Market Penetration": 64.3,
          "ROI": 55.9,
          "Break Even Period": -27.3,
          "Risk Score": 61.9,
        },
        impact: "high",
        created: "2024-01-10",
        lastRun: "2024-01-14",
        status: "completed",
      },
    ],
    variables: [
      {
        id: "market-size",
        name: "Market Size",
        type: "input",
        dataType: "currency",
        description: "Total addressable market size",
        defaultValue: 500000000,
        minValue: 100000000,
        maxValue: 1000000000,
        sensitivity: "high",
        unit: "$",
        category: "Market",
        dependencies: [],
      },
    ],
    constraints: [
      {
        id: "investment-limit",
        name: "Investment Limit",
        type: "business_rule",
        description: "Expansion cost should not exceed $5M",
        expression: "Expansion Cost <= 5000000",
        severity: "error",
        isActive: true,
        violationCount: 0,
      },
    ],
    outcomes: [
      {
        id: "roi-outcome",
        name: "Return on Investment",
        description: "ROI for market expansion",
        type: "financial",
        formula: "(Revenue Potential - Expansion Cost) / Expansion Cost * 100",
        target: 30,
        threshold: {
          red: 15,
          yellow: 25,
          green: 35,
        },
        unit: "%",
        category: "ROI",
        importance: "critical",
      },
    ],
    tags: ["expansion", "market", "strategic", "roi"],
    collaborators: ["sarah.chen@company.com", "david.brown@company.com"],
    runs: 18,
    accuracy: 82.7,
    confidence: 0.78,
  },
  {
    id: "cost-optimization",
    name: "Cost Optimization Model",
    description: "Operational cost optimization with scenario analysis for different efficiency improvements",
    category: "operational",
    status: "active",
    owner: "Lisa Wang",
    created: "2024-01-05",
    lastModified: "2024-01-13",
    baseCase: {
      name: "Current Operations",
      assumptions: {
        "Staff Productivity": 85,
        "Process Efficiency": 78,
        "Technology Investment": 150000,
        "Training Cost": 45000,
        "Automation Level": 35,
      },
      results: {
        "Total Cost Savings": 425000,
        "Operational Efficiency": 82,
        "Employee Satisfaction": 7.2,
        "Quality Score": 88,
        "Implementation Time": 6,
      },
    },
    scenarios: [
      {
        id: "full-automation",
        name: "Full Automation",
        description: "Maximum automation with AI and robotics implementation",
        type: "optimistic",
        probability: 0.4,
        assumptions: {
          "Staff Productivity": 95,
          "Process Efficiency": 92,
          "Technology Investment": 850000,
          "Training Cost": 120000,
          "Automation Level": 85,
        },
        results: {
          "Total Cost Savings": 1200000,
          "Operational Efficiency": 94,
          "Employee Satisfaction": 6.8,
          "Quality Score": 95,
          "Implementation Time": 12,
        },
        variance: {
          "Total Cost Savings": 182.4,
          "Operational Efficiency": 14.6,
          "Employee Satisfaction": -5.6,
          "Quality Score": 8.0,
          "Implementation Time": 100.0,
        },
        impact: "critical",
        created: "2024-01-08",
        lastRun: "2024-01-13",
        status: "completed",
      },
    ],
    variables: [
      {
        id: "productivity",
        name: "Staff Productivity",
        type: "input",
        dataType: "percentage",
        description: "Overall staff productivity index",
        defaultValue: 85,
        minValue: 60,
        maxValue: 100,
        sensitivity: "high",
        unit: "%",
        category: "Human Resources",
        dependencies: [],
      },
    ],
    constraints: [
      {
        id: "satisfaction-constraint",
        name: "Employee Satisfaction",
        type: "business_rule",
        description: "Employee satisfaction should remain above 6.5",
        expression: "Employee Satisfaction >= 6.5",
        severity: "warning",
        isActive: true,
        violationCount: 0,
      },
    ],
    outcomes: [
      {
        id: "savings-outcome",
        name: "Total Cost Savings",
        description: "Annual cost savings from optimization",
        type: "financial",
        formula: "Current Costs - Optimized Costs",
        target: 500000,
        threshold: {
          red: 250000,
          yellow: 400000,
          green: 600000,
        },
        unit: "$",
        category: "Savings",
        importance: "high",
      },
    ],
    tags: ["cost", "optimization", "efficiency", "automation"],
    collaborators: ["mike.johnson@company.com", "sarah.chen@company.com"],
    runs: 31,
    accuracy: 91.3,
    confidence: 0.88,
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment Framework",
    description: "Comprehensive risk assessment model with scenario planning for various risk factors",
    category: "risk",
    status: "active",
    owner: "David Brown",
    created: "2024-01-03",
    lastModified: "2024-01-12",
    baseCase: {
      name: "Current Risk Profile",
      assumptions: {
        "Market Risk": 4.2,
        "Operational Risk": 3.8,
        "Financial Risk": 2.9,
        "Regulatory Risk": 3.5,
        "Technology Risk": 4.1,
      },
      results: {
        "Overall Risk Score": 3.7,
        "Risk Mitigation Cost": 280000,
        "Potential Loss": 1200000,
        "Insurance Coverage": 75,
        "Contingency Reserve": 450000,
      },
    },
    scenarios: [
      {
        id: "stress-test",
        name: "Stress Test",
        description: "High-stress scenario with multiple risk factors activated",
        type: "stress",
        probability: 0.05,
        assumptions: {
          "Market Risk": 8.5,
          "Operational Risk": 7.2,
          "Financial Risk": 6.8,
          "Regulatory Risk": 7.9,
          "Technology Risk": 8.1,
        },
        results: {
          "Overall Risk Score": 7.7,
          "Risk Mitigation Cost": 850000,
          "Potential Loss": 4800000,
          "Insurance Coverage": 65,
          "Contingency Reserve": 1200000,
        },
        variance: {
          "Overall Risk Score": 108.1,
          "Risk Mitigation Cost": 203.6,
          "Potential Loss": 300.0,
          "Insurance Coverage": -13.3,
          "Contingency Reserve": 166.7,
        },
        impact: "critical",
        created: "2024-01-06",
        lastRun: "2024-01-12",
        status: "completed",
      },
    ],
    variables: [
      {
        id: "market-risk",
        name: "Market Risk",
        type: "input",
        dataType: "number",
        description: "Market volatility risk score (1-10)",
        defaultValue: 4.2,
        minValue: 1,
        maxValue: 10,
        sensitivity: "high",
        unit: "score",
        category: "Market",
        dependencies: [],
      },
    ],
    constraints: [
      {
        id: "risk-limit",
        name: "Risk Tolerance",
        type: "business_rule",
        description: "Overall risk score should not exceed 6.0",
        expression: "Overall Risk Score <= 6.0",
        severity: "error",
        isActive: true,
        violationCount: 1,
      },
    ],
    outcomes: [
      {
        id: "risk-outcome",
        name: "Overall Risk Score",
        description: "Composite risk score across all categories",
        type: "operational",
        formula: "WEIGHTED_AVERAGE(Risk Categories)",
        target: 3.0,
        threshold: {
          red: 6.0,
          yellow: 4.5,
          green: 3.0,
        },
        unit: "score",
        category: "Risk",
        importance: "critical",
      },
    ],
    tags: ["risk", "assessment", "mitigation", "stress-test"],
    collaborators: ["lisa.wang@company.com", "mike.johnson@company.com"],
    runs: 12,
    accuracy: 85.9,
    confidence: 0.82,
  },
  {
    id: "product-launch",
    name: "Product Launch Strategy",
    description: "Market launch strategy with different go-to-market scenarios and timing analysis",
    category: "strategic",
    status: "draft",
    owner: "Sarah Chen",
    created: "2024-01-12",
    lastModified: "2024-01-15",
    baseCase: {
      name: "Standard Launch",
      assumptions: {
        "Marketing Budget": 500000,
        "Launch Timeline": 6,
        "Initial Price": 99,
        "Target Market Size": 1000000,
        "Competitive Response": 5,
      },
      results: {
        "First Year Revenue": 2400000,
        "Market Share": 2.4,
        "Customer Acquisition": 8500,
        "Break Even Time": 8,
        "Brand Awareness": 35,
      },
    },
    scenarios: [
      {
        id: "aggressive-launch",
        name: "Aggressive Launch",
        description: "High-investment launch with premium positioning",
        type: "optimistic",
        probability: 0.35,
        assumptions: {
          "Marketing Budget": 1200000,
          "Launch Timeline": 4,
          "Initial Price": 149,
          "Target Market Size": 1000000,
          "Competitive Response": 7,
        },
        results: {
          "First Year Revenue": 4200000,
          "Market Share": 4.2,
          "Customer Acquisition": 12800,
          "Break Even Time": 6,
          "Brand Awareness": 58,
        },
        variance: {
          "First Year Revenue": 75.0,
          "Market Share": 75.0,
          "Customer Acquisition": 50.6,
          "Break Even Time": -25.0,
          "Brand Awareness": 65.7,
        },
        impact: "high",
        created: "2024-01-13",
        lastRun: "2024-01-15",
        status: "completed",
      },
    ],
    variables: [
      {
        id: "marketing-budget",
        name: "Marketing Budget",
        type: "input",
        dataType: "currency",
        description: "Total marketing budget for launch",
        defaultValue: 500000,
        minValue: 200000,
        maxValue: 2000000,
        sensitivity: "high",
        unit: "$",
        category: "Marketing",
        dependencies: [],
      },
    ],
    constraints: [
      {
        id: "budget-limit",
        name: "Budget Constraint",
        type: "business_rule",
        description: "Total launch budget should not exceed $2M",
        expression: "Marketing Budget <= 2000000",
        severity: "error",
        isActive: true,
        violationCount: 0,
      },
    ],
    outcomes: [
      {
        id: "revenue-outcome",
        name: "First Year Revenue",
        description: "Revenue in first year after launch",
        type: "financial",
        formula: "Customer Acquisition * Initial Price * Retention Rate",
        target: 3000000,
        threshold: {
          red: 1500000,
          yellow: 2500000,
          green: 3500000,
        },
        unit: "$",
        category: "Revenue",
        importance: "critical",
      },
    ],
    tags: ["product", "launch", "strategy", "market"],
    collaborators: ["mike.johnson@company.com", "david.brown@company.com"],
    runs: 7,
    accuracy: 78.5,
    confidence: 0.72,
  },
  {
    id: "capacity-planning",
    name: "Capacity Planning Model",
    description: "Infrastructure capacity planning with demand forecasting and scaling scenarios",
    category: "operational",
    status: "active",
    owner: "Mike Johnson",
    created: "2024-01-07",
    lastModified: "2024-01-14",
    baseCase: {
      name: "Current Capacity",
      assumptions: {
        "Current Utilization": 72,
        "Growth Rate": 15,
        "Scaling Cost": 120000,
        "Efficiency Improvement": 8,
        "Demand Seasonality": 25,
      },
      results: {
        "Required Capacity": 850,
        "Infrastructure Cost": 680000,
        "Utilization Rate": 78,
        "Scalability Index": 85,
        "Maintenance Cost": 145000,
      },
    },
    scenarios: [
      {
        id: "high-demand",
        name: "High Demand",
        description: "Scenario with accelerated growth and high demand",
        type: "optimistic",
        probability: 0.25,
        assumptions: {
          "Current Utilization": 72,
          "Growth Rate": 35,
          "Scaling Cost": 280000,
          "Efficiency Improvement": 12,
          "Demand Seasonality": 40,
        },
        results: {
          "Required Capacity": 1250,
          "Infrastructure Cost": 1200000,
          "Utilization Rate": 85,
          "Scalability Index": 92,
          "Maintenance Cost": 285000,
        },
        variance: {
          "Required Capacity": 47.1,
          "Infrastructure Cost": 76.5,
          "Utilization Rate": 9.0,
          "Scalability Index": 8.2,
          "Maintenance Cost": 96.6,
        },
        impact: "high",
        created: "2024-01-09",
        lastRun: "2024-01-14",
        status: "completed",
      },
    ],
    variables: [
      {
        id: "utilization",
        name: "Current Utilization",
        type: "input",
        dataType: "percentage",
        description: "Current capacity utilization rate",
        defaultValue: 72,
        minValue: 40,
        maxValue: 95,
        sensitivity: "medium",
        unit: "%",
        category: "Capacity",
        dependencies: [],
      },
    ],
    constraints: [
      {
        id: "utilization-limit",
        name: "Utilization Limit",
        type: "business_rule",
        description: "Utilization should not exceed 90% for reliability",
        expression: "Utilization Rate <= 90",
        severity: "warning",
        isActive: true,
        violationCount: 0,
      },
    ],
    outcomes: [
      {
        id: "capacity-outcome",
        name: "Required Capacity",
        description: "Total required capacity units",
        type: "operational",
        formula: "Base Capacity * (1 + Growth Rate / 100)",
        target: 1000,
        threshold: {
          red: 1200,
          yellow: 1100,
          green: 1000,
        },
        unit: "units",
        category: "Capacity",
        importance: "high",
      },
    ],
    tags: ["capacity", "planning", "infrastructure", "scaling"],
    collaborators: ["lisa.wang@company.com", "sarah.chen@company.com"],
    runs: 15,
    accuracy: 88.7,
    confidence: 0.84,
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
const ModelCard = memo(({
  model,
  isSelected,
  onSelect,
}: {
  model: ScenarioModel;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const categoryColors = {
    financial: "from-green-500 to-emerald-600",
    operational: "from-blue-500 to-indigo-600",
    strategic: "from-purple-500 to-violet-600",
    risk: "from-red-500 to-orange-600",
    market: "from-cyan-500 to-teal-600",
  };

  const statusColors = {
    draft: "bg-gray-100 text-gray-700",
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    archived: "bg-yellow-100 text-yellow-700",
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
      onClick={() => onSelect(model.id)}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={`
                w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[model.category]}
                flex items-center justify-center
              `}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Cog className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">{model.name}</h3>
              <p className="text-sm text-gray-500">{model.owner}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[model.status]}`}>
              {model.status}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {model.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{model.scenarios.length + 1}</div>
            <div className="text-xs text-gray-500">Scenarios</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{model.runs}</div>
            <div className="text-xs text-gray-500">Runs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{model.accuracy}%</div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {model.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {model.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{model.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{model.collaborators.length} collaborators</span>
          </div>
          <span>Modified {model.lastModified}</span>
        </div>
      </div>
    </motion.div>
  );
});

ModelCard.displayName = 'ModelCard';

const ScenarioCard = memo(({
  scenario,
  baseCase,
  isSelected,
  onSelect,
}: {
  scenario: ScenarioCase;
  baseCase: { results: { [key: string]: number } };
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const typeColors = {
    optimistic: "from-green-500 to-emerald-600",
    pessimistic: "from-red-500 to-orange-600",
    stress: "from-purple-500 to-pink-600",
    custom: "from-blue-500 to-indigo-600",
  };

  const impactColors = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
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
      onClick={() => onSelect(scenario.id)}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={`
                w-12 h-12 rounded-lg bg-gradient-to-br ${typeColors[scenario.type]}
                flex items-center justify-center
              `}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">{scenario.name}</h3>
              <p className="text-sm text-gray-500">{scenario.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[scenario.impact]}`}>
              {scenario.impact}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {scenario.description}
        </p>

        {/* Key Results */}
        <div className="space-y-3 mb-4">
          {Object.entries(scenario.results).slice(0, 2).map(([key, value]) => {
            const variance = scenario.variance?.[key] || 0;
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{key}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </span>
                  {variance !== 0 && (
                    <span className={`text-xs font-medium ${
                      variance > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              {Math.round(scenario.probability * 100)}%
            </span>
          </div>
          <span>Run {scenario.lastRun}</span>
        </div>
      </div>
    </motion.div>
  );
});

ScenarioCard.displayName = 'ScenarioCard';

const MetricCard = memo(({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description 
}: { 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  trend?: string; 
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
      {trend && (
        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
    <p className="text-xs text-gray-500">{description}</p>
  </motion.div>
));

MetricCard.displayName = 'MetricCard';

// Main component
const ScenarioModeling = memo(function ScenarioModeling() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'scenarios' | 'variables'>('overview');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'financial' | 'operational' | 'strategic' | 'risk' | 'market'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'active' | 'completed' | 'archived'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleModelSelect = useCallback((id: string) => {
    setSelectedModel(selectedModel === id ? null : id);
  }, [selectedModel]);

  const handleScenarioSelect = useCallback((id: string) => {
    setSelectedScenario(selectedScenario === id ? null : id);
  }, [selectedScenario]);

  const selectedModelData = useMemo(() => 
    selectedModel ? scenarioModels.find(m => m.id === selectedModel) : null,
    [selectedModel]
  );

  const selectedScenarioData = useMemo(() => {
    if (!selectedScenario || !selectedModelData) return null;
    return selectedModelData.scenarios.find(s => s.id === selectedScenario);
  }, [selectedScenario, selectedModelData]);

  const filteredModels = useMemo(() => {
    let filtered = scenarioModels;
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(model => model.category === categoryFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(model => model.status === statusFilter);
    }
    
    return filtered;
  }, [categoryFilter, statusFilter]);

  const allScenarios = useMemo(() => {
    return scenarioModels.flatMap(model => 
      model.scenarios.map(scenario => ({
        ...scenario,
        modelName: model.name,
        baseCase: model.baseCase,
      }))
    );
  }, []);

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
            <Cog className="w-4 h-4" />
            Scenario Modeling
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Scenario
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Modeling
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Build and compare scenarios with interactive models that drive smarter, data-backed decisions. 
            Test assumptions, analyze outcomes, and plan for multiple futures.
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
              { id: 'models', label: 'Models', icon: Cog },
              { id: 'scenarios', label: 'Scenarios', icon: Target },
              { id: 'variables', label: 'Variables', icon: Settings },
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
              {/* Modeling Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <MetricCard
                  title="Total Models"
                  value={modelingMetrics.totalModels.toString()}
                  icon={Cog}
                  description="Created scenario models"
                />
                <MetricCard
                  title="Active Models"
                  value={modelingMetrics.activeModels.toString()}
                  icon={Activity}
                  trend="+12%"
                  description="Currently active models"
                />
                <MetricCard
                  title="Total Runs"
                  value={modelingMetrics.totalRuns.toLocaleString()}
                  icon={Play}
                  trend="+28%"
                  description="Scenario executions"
                />
                <MetricCard
                  title="Avg Accuracy"
                  value={`${modelingMetrics.avgAccuracy}%`}
                  icon={Target}
                  trend="+2.3%"
                  description="Model prediction accuracy"
                />
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modelingMetrics.popularCategories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.count} models</p>
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

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {modelingMetrics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        {activity.type === 'created' && <Plus className="w-5 h-5 text-indigo-600" />}
                        {activity.type === 'run' && <Play className="w-5 h-5 text-indigo-600" />}
                        {activity.type === 'modified' && <Edit className="w-5 h-5 text-indigo-600" />}
                        {activity.type === 'shared' && <Share2 className="w-5 h-5 text-indigo-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {activity.user} {activity.type} <span className="text-indigo-600">{activity.model}</span>
                        </p>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Models</h3>
                  <div className="space-y-6">
                    {scenarioModels.slice(0, 3).map((model) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        isSelected={selectedModel === model.id}
                        onSelect={handleModelSelect}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Scenarios</h3>
                  <div className="space-y-6">
                    {allScenarios.slice(0, 3).map((scenario) => (
                      <ScenarioCard
                        key={scenario.id}
                        scenario={scenario}
                        baseCase={scenario.baseCase}
                        isSelected={selectedScenario === scenario.id}
                        onSelect={handleScenarioSelect}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Continue with other tabs implementation... */}
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
                <Cog className="w-8 h-8 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                Ready to Model Your Future?
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Start building scenario models to test assumptions, analyze outcomes, and make data-driven decisions. 
                Compare multiple futures and plan with confidence.
              </p>
              <motion.button
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Build Your Model
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

ScenarioModeling.displayName = 'ScenarioModeling';

export default ScenarioModeling;