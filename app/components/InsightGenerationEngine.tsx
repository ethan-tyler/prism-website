// app/components/InsightGenerationEngine.tsx
import React, { memo, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Zap,
  Brain,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Play,
  Pause,
  ArrowRight,
  Settings,
  Database,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Search,
  Filter,
  Sparkles,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Download,
  RefreshCw,
  ChevronRight,
  Code,
  FileText,
  Users,
  Shield,
  Calendar,
  Tag,
  Gauge,
  Layers,
  Network,
  Cpu,
  HardDrive,
  Server,
  Monitor,
  Workflow,
  GitBranch,
  Globe,
  MapPin,
  Radar,
  Building,
  Home,
  Factory,
  Warehouse,
  ShoppingCart,
  CreditCard,
  Wallet,
  DollarSign,
  TrendingDown,
  BarChart,
  BarChart2,
  BarChart4,
  Coins,
  Calculator,
  Percent,
  Hash,
  Package,
  Coffee,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  ChevronsDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowUpLeft,
  Hand,
  Crown,
  Gem,
  Gift,
  Trophy,
  Award,
  Badge,
  BadgeCheck,
  BadgeAlert,
  BadgeX,
  BadgePlus,
  BadgeMinus,
  BadgePercent,
  BadgeDollarSign,
  BadgeEuro,
  BadgePoundSterling,
  BadgeCent,
  Anchor,
  Archive,
  Bed,
  Bike,
  Ship,
  Book,
  BookOpen,
  Bot,
  Box,
  Briefcase,
  Bug,
  Building2,
  Bus,
  Camera,
  Car,
  Castle,
  Cat,
  Church,
  Clipboard,
  Cloud,
  CloudRain,
  CloudSnow,
  Cog,
  Compass,
  Computer,
  Construction,
  Contact,
  Copy,
  Sofa,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Dna,
  Dog,
  Edit,
  Edit2,
  Edit3,
  Equal,
  Euro,
  Expand,
  ExternalLink,
  EyeOff,
  Facebook,
  Fan,
  FastForward,
  File,
  FileText as FileTextIcon,
  Film,
  Fingerprint,
  Flag,
  Flame,
  FlaskConical,
  Focus,
  Folder,
  FolderOpen,
  Forward,
  Frame,
  Framer,
  Fuel,
  Fullscreen,
  Gamepad,
  Gavel,
  Ghost,
  GitCommit,
  Github,
  Goal,
  Grab,
  Grid3x3,
  Grip,
  Guitar,
  Hammer,
  HardHat,
  Headphones,
  Heart,
  Hexagon,
  History,
  Image,
  Import,
  Inbox,
  Indent,
  Info,
  Inspect,
  Instagram,
  Italic,
  Joystick,
  Kanban,
  Key,
  Keyboard,
  Lamp,
  Languages,
  Laptop,
  Layout,
  LayoutDashboard,
  LayoutGrid,
  LayoutList,
  Leaf,
  Library,
  LifeBuoy,
  Link,
  Link2,
  Linkedin,
  List,
  ListChecks,
  ListFilter,
  ListOrdered,
  ListPlus,
  Loader,
  Loader2,
  Lock,
  LockKeyhole,
  LogIn,
  LogOut,
  Magnet,
  Mail,
  MailOpen,
  Map,
  MapPinned,
  Maximize,
  Medal,
  Megaphone,
  Menu,
  Merge,
  MessageCircle,
  Mic,
  MicOff,
  Microscope,
  Minimize,
  MonitorSpeaker,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Mountain,
  Mouse,
  MousePointer,
  Move,
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  Music,
  Navigation,
  Newspaper,
  NotebookPen,
  Octagon,
  Orbit,
  Package2,
  Paintbrush,
  Palette,
  TreePine,
  PanelLeft,
  PanelRight,
  PanelTop,
  Paperclip,
  PauseCircle,
  Pen,
  Pentagon,
  PersonStanding,
  Phone,
  Pi,
  Piano,
  PieChart as PieChartIcon,
  Plane,
  PlayCircle,
  PlusCircle,
  Pointer,
  Power,
  Presentation,
  Printer,
  Puzzle,
  QrCode,
  Quote,
  Rabbit,
  Radio,
  Rainbow,
  Receipt,
  Recycle,
  Redo,
  RefreshCcw,
  Regex,
  Repeat,
  Reply,
  Rewind,
  Rocket,
  Rotate3d,
  RotateCcw,
  RotateCw,
  Route,
  Router,
  Rss,
  Ruler,
  Save,
  Scale,
  Scan,
  ScanLine,
  ScatterChart,
  School,
  Scissors,
  ScreenShare,
  Scroll,
  Search as SearchIcon,
  Section,
  Send,
  SeparatorHorizontal,
  SeparatorVertical,
  Settings2,
  Shapes,
  Share,
  Sheet,
  ShieldCheck,
  ShieldX,
  ShipWheel,
  ShoppingBag,
  Shuffle,
  Sidebar,
  Signal,
  Signpost,
  SkipBack,
  SkipForward,
  Skull,
  Slack,
  Slash,
  Sliders,
  Smartphone,
  Smile,
  Snowflake,
  Space,
  Sparkle,
  Speaker,
  Speech,
  SpellCheck,
  Split,
  Square,
  SquareCheck,
  SquareCode,
  SquareDashed,
  SquareFunction,
  SquareKanban,
  SquareLibrary,
  SquareMenu,
  SquareMinus,
  SquarePlay,
  SquarePlus,
  SquareX,
  Stamp,
  StarHalf,
  StarOff,
  StepBack,
  StepForward,
  Stethoscope,
  StopCircle,
  Store,
  Strikethrough,
  Sun,
  Sunrise,
  Sunset,
  SwatchBook,
  SwitchCamera,
  Sword,
  Syringe,
  Table,
  Tablet,
  Tags,
  Telescope,
  Terminal,
  TestTube,
  Text,
  TextCursor,
  TextSearch,
  Theater,
  Thermometer,
  Ticket,
  Timer,
  Tornado,
  Touchpad,
  TowerControl,
  Tractor,
  Train,
  Trash,
  TreeDeciduous,
  Trees,
  Trello,
  Triangle,
  TriangleAlert,
  Truck,
  Turtle,
  Tv,
  Twitch,
  Twitter,
  Type,
  Umbrella,
  Underline,
  Undo,
  Ungroup,
  Unlock,
  Upload,
  User,
  UserCheck,
  UserPlus,
  UserRound,
  Users2,
  Utensils,
  Variable,
  Vault,
  Vibrate,
  Video,
  View,
  Volume,
  Vote,
  Wallet2,
  Wand,
  WashingMachine,
  Watch,
  Waves,
  Webcam,
  Webhook,
  Weight,
  Wheat,
  Wifi,
  Wind,
  Workflow as WorkflowIcon,
  Wrench,
  Youtube,
  ZapOff,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      damping: 10,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

interface InsightData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  impact: string;
  timeframe: string;
  data: any;
}

interface CapabilityData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  status: 'active' | 'pending' | 'inactive';
  performance: number;
  lastUpdate: string;
}

interface AutomationData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'running' | 'paused' | 'stopped';
  trigger: string;
  frequency: string;
  lastRun: string;
  successRate: number;
}

const InsightGenerationEngine = memo(() => {
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'capabilities' | 'automation'>('overview');
  const [selectedInsight, setSelectedInsight] = useState<InsightData | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityData | null>(null);
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationData | null>(null);

  const insights: InsightData[] = [
    {
      id: 'insight-1',
      title: 'Revenue Anomaly Detected',
      description: 'Q3 revenue shows 15% deviation from predicted patterns',
      icon: TrendingUp,
      category: 'Revenue',
      priority: 'high',
      confidence: 92,
      impact: 'High',
      timeframe: 'Immediate',
      data: {
        variance: 15,
        period: 'Q3',
        expectedRevenue: 2500000,
        actualRevenue: 2875000,
        factors: ['Seasonal spike', 'New product launch', 'Market expansion']
      }
    },
    {
      id: 'insight-2',
      title: 'Customer Churn Pattern',
      description: 'Enterprise customers showing 23% higher churn in specific regions',
      icon: AlertCircle,
      category: 'Customer',
      priority: 'high',
      confidence: 88,
      impact: 'High',
      timeframe: 'Next 30 days',
      data: {
        churnRate: 23,
        affectedRegions: ['West Coast', 'Northeast'],
        customerSegment: 'Enterprise',
        recommendedActions: ['Proactive outreach', 'Discount offers', 'Success manager assignment']
      }
    },
    {
      id: 'insight-3',
      title: 'Product Performance Trend',
      description: 'Product A showing 40% growth in user engagement',
      icon: TrendingUp,
      category: 'Product',
      priority: 'medium',
      confidence: 85,
      impact: 'Medium',
      timeframe: 'Next 60 days',
      data: {
        growthRate: 40,
        productName: 'Product A',
        engagementMetrics: ['Daily active users', 'Session duration', 'Feature adoption'],
        opportunities: ['Upsell campaigns', 'Feature expansion', 'User onboarding optimization']
      }
    },
    {
      id: 'insight-4',
      title: 'Operational Efficiency Gain',
      description: 'Automation implementation reduced processing time by 60%',
      icon: Zap,
      category: 'Operations',
      priority: 'medium',
      confidence: 94,
      impact: 'High',
      timeframe: 'Ongoing',
      data: {
        efficiencyGain: 60,
        processArea: 'Order Processing',
        timeReduction: '4 hours to 1.6 hours',
        costSavings: '$125,000 annually',
        scalingOpportunities: ['Inventory management', 'Customer service', 'Quality assurance']
      }
    }
  ];

  const capabilities: CapabilityData[] = [
    {
      id: 'cap-1',
      name: 'Real-time Anomaly Detection',
      description: 'Continuously monitors data streams for unusual patterns',
      icon: Radar,
      category: 'Detection',
      status: 'active',
      performance: 94,
      lastUpdate: '2 minutes ago'
    },
    {
      id: 'cap-2',
      name: 'Predictive Analytics',
      description: 'Forecasts future trends based on historical data',
      icon: TrendingUp,
      category: 'Prediction',
      status: 'active',
      performance: 89,
      lastUpdate: '5 minutes ago'
    },
    {
      id: 'cap-3',
      name: 'Natural Language Processing',
      description: 'Analyzes text data for sentiment and insights',
      icon: MessageSquare,
      category: 'NLP',
      status: 'active',
      performance: 91,
      lastUpdate: '1 minute ago'
    },
    {
      id: 'cap-4',
      name: 'Pattern Recognition',
      description: 'Identifies complex patterns in large datasets',
      icon: Eye,
      category: 'Pattern',
      status: 'active',
      performance: 96,
      lastUpdate: '3 minutes ago'
    },
    {
      id: 'cap-5',
      name: 'Automated Reporting',
      description: 'Generates comprehensive reports automatically',
      icon: FileText,
      category: 'Reporting',
      status: 'pending',
      performance: 78,
      lastUpdate: '15 minutes ago'
    },
    {
      id: 'cap-6',
      name: 'Data Quality Assessment',
      description: 'Evaluates and scores data quality metrics',
      icon: Shield,
      category: 'Quality',
      status: 'active',
      performance: 92,
      lastUpdate: '7 minutes ago'
    }
  ];

  const automations: AutomationData[] = [
    {
      id: 'auto-1',
      name: 'Daily Revenue Analysis',
      description: 'Automated daily revenue tracking and anomaly detection',
      icon: DollarSign,
      status: 'running',
      trigger: 'Daily at 6:00 AM',
      frequency: 'Daily',
      lastRun: '6:00 AM today',
      successRate: 98
    },
    {
      id: 'auto-2',
      name: 'Customer Health Score',
      description: 'Automated customer health scoring and risk assessment',
      icon: Heart,
      status: 'running',
      trigger: 'Every 4 hours',
      frequency: 'Every 4 hours',
      lastRun: '2:00 PM today',
      successRate: 95
    },
    {
      id: 'auto-3',
      name: 'Inventory Optimization',
      description: 'Automated inventory level optimization and reorder suggestions',
      icon: Package,
      status: 'running',
      trigger: 'Weekly on Monday',
      frequency: 'Weekly',
      lastRun: 'Yesterday 9:00 AM',
      successRate: 92
    },
    {
      id: 'auto-4',
      name: 'Marketing Campaign Analysis',
      description: 'Automated analysis of marketing campaign performance',
      icon: Target,
      status: 'paused',
      trigger: 'After campaign completion',
      frequency: 'Event-based',
      lastRun: '3 days ago',
      successRate: 89
    },
    {
      id: 'auto-5',
      name: 'Competitive Intelligence',
      description: 'Automated competitive analysis and market positioning',
      icon: Telescope,
      status: 'running',
      trigger: 'Weekly on Friday',
      frequency: 'Weekly',
      lastRun: '2 days ago',
      successRate: 87
    },
    {
      id: 'auto-6',
      name: 'Performance Alerts',
      description: 'Automated system performance monitoring and alerting',
      icon: AlertCircle,
      status: 'running',
      trigger: 'Real-time',
      frequency: 'Continuous',
      lastRun: 'Now',
      successRate: 99
    }
  ];

  const handleInsightSelect = useCallback((insight: InsightData) => {
    setSelectedInsight(insight);
  }, []);

  const handleCapabilitySelect = useCallback((capability: CapabilityData) => {
    setSelectedCapability(capability);
  }, []);

  const handleAutomationSelect = useCallback((automation: AutomationData) => {
    setSelectedAutomation(automation);
  }, []);

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Insights', value: '47', change: '+12%', icon: Lightbulb, color: 'text-blue-600' },
          { title: 'Processing Speed', value: '2.3s', change: '-15%', icon: Zap, color: 'text-green-600' },
          { title: 'Accuracy Rate', value: '94.2%', change: '+2.1%', icon: Target, color: 'text-purple-600' },
          { title: 'Automation Tasks', value: '23', change: '+8%', icon: Cog, color: 'text-orange-600' }
        ].map((metric, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
              <span className="text-sm font-medium text-green-600">{metric.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={cardVariants} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            Recent Insights
          </h3>
          <div className="space-y-3">
            {insights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <insight.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                      insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {insight.priority}
                    </span>
                    <span className="text-xs text-gray-500">Confidence: {insight.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            System Health
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Data Processing', status: 'Healthy', value: 98 },
              { name: 'Model Performance', status: 'Healthy', value: 94 },
              { name: 'API Response Time', status: 'Good', value: 87 },
              { name: 'Storage Usage', status: 'Normal', value: 76 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.value >= 95 ? 'bg-green-500' :
                    item.value >= 85 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{item.value}%</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                    item.status === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Insights</h3>
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleInsightSelect(insight)}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <insight.icon className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {insight.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Confidence: {insight.confidence}%</span>
                  <span>Impact: {insight.impact}</span>
                  <span>Timeframe: {insight.timeframe}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky top-4">
        <AnimatePresence mode="wait">
          {selectedInsight ? (
            <motion.div
              key={selectedInsight.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <selectedInsight.icon className="w-6 h-6 mr-2 text-blue-600" />
                  {selectedInsight.title}
                </h3>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                  <p className="text-sm text-gray-600">{selectedInsight.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</label>
                    <p className="text-sm font-medium text-gray-900">{selectedInsight.priority}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Confidence</label>
                    <p className="text-sm font-medium text-gray-900">{selectedInsight.confidence}%</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Impact</label>
                    <p className="text-sm font-medium text-gray-900">{selectedInsight.impact}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Timeframe</label>
                    <p className="text-sm font-medium text-gray-900">{selectedInsight.timeframe}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                      {JSON.stringify(selectedInsight.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Insight</h3>
              <p className="text-gray-600">Click on any insight to view detailed information</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderCapabilities = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Capabilities</h3>
        {capabilities.map((capability) => (
          <motion.div
            key={capability.id}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleCapabilitySelect(capability)}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <capability.icon className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{capability.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    capability.status === 'active' ? 'bg-green-100 text-green-800' :
                    capability.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {capability.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{capability.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Performance: {capability.performance}%</span>
                  <span>Updated: {capability.lastUpdate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky top-4">
        <AnimatePresence mode="wait">
          {selectedCapability ? (
            <motion.div
              key={selectedCapability.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <selectedCapability.icon className="w-6 h-6 mr-2 text-blue-600" />
                  {selectedCapability.name}
                </h3>
                <button
                  onClick={() => setSelectedCapability(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{selectedCapability.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                    <p className="text-sm font-medium text-gray-900">{selectedCapability.status}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Performance</label>
                    <p className="text-sm font-medium text-gray-900">{selectedCapability.performance}%</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</label>
                    <p className="text-sm font-medium text-gray-900">{selectedCapability.category}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Update</label>
                    <p className="text-sm font-medium text-gray-900">{selectedCapability.lastUpdate}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Accuracy</span>
                      <span className="text-sm font-medium text-gray-900">{selectedCapability.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${selectedCapability.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <Cog className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Capability</h3>
              <p className="text-gray-600">Click on any capability to view detailed information</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Workflows</h3>
        {automations.map((automation) => (
          <motion.div
            key={automation.id}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleAutomationSelect(automation)}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <automation.icon className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{automation.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    automation.status === 'running' ? 'bg-green-100 text-green-800' :
                    automation.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {automation.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{automation.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Success: {automation.successRate}%</span>
                  <span>Last run: {automation.lastRun}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky top-4">
        <AnimatePresence mode="wait">
          {selectedAutomation ? (
            <motion.div
              key={selectedAutomation.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <selectedAutomation.icon className="w-6 h-6 mr-2 text-blue-600" />
                  {selectedAutomation.name}
                </h3>
                <button
                  onClick={() => setSelectedAutomation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{selectedAutomation.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                    <p className="text-sm font-medium text-gray-900">{selectedAutomation.status}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Success Rate</label>
                    <p className="text-sm font-medium text-gray-900">{selectedAutomation.successRate}%</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Frequency</label>
                    <p className="text-sm font-medium text-gray-900">{selectedAutomation.frequency}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Run</label>
                    <p className="text-sm font-medium text-gray-900">{selectedAutomation.lastRun}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Trigger Configuration</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Trigger</span>
                      <span className="text-sm font-medium text-gray-900">{selectedAutomation.trigger}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Frequency</span>
                      <span className="text-sm font-medium text-gray-900">{selectedAutomation.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="text-sm font-medium text-gray-900">{selectedAutomation.successRate}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    {selectedAutomation.status === 'running' ? 'Pause' : 'Start'}
                  </button>
                  <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <Cog className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Automation</h3>
              <p className="text-gray-600">Click on any automation to view detailed information</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'insights':
        return renderInsights();
      case 'capabilities':
        return renderCapabilities();
      case 'automation':
        return renderAutomation();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium text-sm mb-4">
            <Lightbulb className="w-4 h-4" />
            AI-Powered Insights
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Insight Generation Engine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock insights in seconds with Databricks-powered processing and intuitive, business-ready interfaces. 
            Automated analysis and actionable recommendations.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white rounded-xl p-1 shadow-lg border border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'insights', label: 'Insights', icon: Lightbulb },
              { id: 'capabilities', label: 'Capabilities', icon: Brain },
              { id: 'automation', label: 'Automation', icon: Cog }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
});

InsightGenerationEngine.displayName = 'InsightGenerationEngine';

export default InsightGenerationEngine;