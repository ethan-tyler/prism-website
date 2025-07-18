// app/components/Flywheel.tsx
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Database,
  BookOpen,
  Zap,
  Target,
  Users,
  Rocket,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  GitBranch,
  BarChart3,
  Layers,
  Brain,
} from "lucide-react";

interface SegmentData {
  id: number;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  phase: string;
  description: string;
  highlight: string;
  details: string[];
  impact: string;
  metrics?: string;
}

const segments: SegmentData[] = [
  {
    id: 1,
    title: "Semantic Foundation Building",
    shortTitle: "Semantic\nFoundation\nBuilding",
    icon: Database,
    color: "from-primary-500 to-primary-600",
    glowColor: "glow",
    phase: "FOUNDATION",
    description:
      "Establish a modern DataBricks platform foundation with the Core + Variant metric framework that ensures consistency while supporting legitimate business variations across POP teams.",
    highlight:
      "Unified data platform with standardized metrics and governed flexibility",
    details: [
      "DataBricks Lakehouse: Single platform for all data processing, analytics, and AI capabilities",
      "Unity Catalog: Centralized data governance with automatic lineage tracking and access controls",
      "Core + Variant Metrics: Standardized metric definitions with approved business variations",
      "Semantic Layer Integration: Business-friendly metric definitions that maintain consistency",
      "Quality & Governance: Automated data quality monitoring with clear ownership and accountability",
    ],
    metrics:
      "Core + Variant Example: 'Customer Acquisition Cost' has one core definition with approved variants for different time periods, channels, and business contexts",
    impact:
      "Robust platform foundation with governed flexibility enables rapid analytics development while maintaining consistency and trust.",
  },
  {
    id: 2,
    title: "Template & Analytics Library",
    shortTitle: "Template &\nAnalytics\nLibrary",
    icon: BookOpen,
    color: "from-secondary-500 to-secondary-600",
    glowColor: "glow-pink",
    phase: "FOUNDATION",
    description:
      "Build a comprehensive library of reusable analytics templates that leverage SQL and Spark processing to deliver consistent, reliable insights across POP business domains.",
    highlight:
      "Treat analytics like code with version control, testing, and collaborative BI practices",
    details: [
      "Template Library: Pre-built analytical patterns for common POP use cases with proven business value",
      "SQL & Spark Integration: Leverage both SQL simplicity and Spark's distributed processing power",
      "Version Control: All analytics definitions tracked in Git with change history and rollback",
      "Collaborative BI Development: Team-based analytics creation with review processes",
      "Automated Testing: Built-in validation to ensure analytics accuracy",
      "Performance Optimization: Templates designed for speed and efficiency",
    ],
    metrics:
      "Business Value: Faster time-to-insight with higher quality and consistency across all POP analytics",
    impact:
      "BI expert-friendly approach enables rapid deployment of complex analytics while maintaining enterprise-grade quality and governance.",
  },
  {
    id: 3,
    title: "Insight Generation Engine",
    shortTitle: "Insight\nGeneration\nEngine",
    icon: Zap,
    color: "from-primary-400 to-primary-600",
    glowColor: "glow",
    phase: "CORE CAPABILITY",
    description:
      "Deploy a modern analytics engine that combines DataBricks' SQL and Spark processing power with intuitive interfaces, enabling both technical analysts and business users to explore data rapidly.",
    highlight:
      "Enterprise-grade SQL and Spark platform with consumer-grade user experience",
    details: [
      "Unified Platform: Single environment for all analytics needs",
      "SQL-Native Interface: Intelligent assistance for building queries",
      "Spark Processing Power: Distributed computing for large-scale analytics",
      "Instant Performance: Sub-second response times for interactive analysis",
      "Semantic Integration: Direct access to business metrics",
      "Collaborative Analytics: Share queries, results, and insights",
      "Scalable Architecture: Handle growing data volumes without degradation",
    ],
    metrics:
      "User Experience: Point-and-click simplicity with full SQL and Spark analytical power underneath",
    impact:
      "Modern platform eliminates traditional barriers between data and users, enabling rapid discovery and consistent insights.",
  },
  {
    id: 4,
    title: "Scenario Modeling Capabilities",
    shortTitle: "Scenario\nModeling\nCapabilities",
    icon: Target,
    color: "from-accent-500 to-accent-600",
    glowColor: "glow-green",
    phase: "CORE CAPABILITY",
    description:
      "Leverage DataBricks' SQL and Spark computational power for sophisticated what-if analysis and scenario planning that supports strategic decision-making.",
    highlight:
      "Enterprise-scale scenario modeling with real-time collaboration and statistical analysis",
    details: [
      "Interactive Scenario Building: Build and test multiple scenarios with real-time adjustment",
      "SQL & Spark Processing: Leverage SQL for rapid prototyping and Spark for complex calculations",
      "Statistical Confidence: Monte Carlo simulations provide confidence intervals",
      "Collaborative Planning: Shared scenario workspaces with approval workflows",
      "Model Transparency: Clear explanations of scenario drivers and assumptions",
      "Historical Validation: Backtest scenarios against historical data",
      "Scale & Performance: Handle complex scenarios with instant results",
    ],
    metrics:
      "Business Value: Make strategic decisions with confidence through data-driven scenario analysis",
    impact:
      "Advanced modeling capabilities enable sophisticated planning and decision-making while maintaining transparency.",
  },
  {
    id: 5,
    title: "Self-Service Portal Experience",
    shortTitle: "Self-Service\nPortal\nExperience",
    icon: Users,
    color: "from-secondary-400 to-secondary-600",
    glowColor: "glow-pink",
    phase: "USER EXPERIENCE",
    description:
      "Deploy a modern self-service platform with audience-based personalization that empowers business users while providing BI experts with advanced capabilities.",
    highlight:
      "Natural Language Interface + Visual Builder + Audience Personalization + API Gateway",
    details: [
      "Conversational Analytics: Natural language queries for business users",
      "Visual Metric Builder: Drag-and-drop interface for creating custom metrics",
      "Executive Dashboards: High-level KPIs with mobile-optimized experiences",
      "Analytical Workbenches: Advanced SQL and Spark exploration tools",
      "Report Marketplace: Comprehensive library of pre-built reports",
      "Audience Personalization: Dynamic content based on user role",
      "Embedded Analytics: Integration capabilities for business applications",
    ],
    metrics:
      "BI Expert Experience: Advanced SQL/Spark capabilities with collaboration, version control, and component reusability",
    impact:
      "Self-service capabilities reduce BI team workload while empowering business users to get answers instantly.",
  },
  {
    id: 6,
    title: "User Adoption & Training Programs",
    shortTitle: "User Adoption\n& Training\nPrograms",
    icon: Rocket,
    color: "from-accent-400 to-accent-600",
    glowColor: "glow-green",
    phase: "ADOPTION",
    description:
      "Enable organization-wide analytics adoption through the DataBricks platform, providing governed self-service capabilities that empower all users.",
    highlight:
      "Democratize analytics through intuitive tools with enterprise governance built-in",
    details: [
      "Unified Workspace: Single environment for all analytics needs",
      "Smart Governance: Automatic permissions based on roles",
      "Collaborative Features: Share insights with built-in workflows",
      "Progressive Capability: Simple interfaces with advanced features",
      "Training & Support: Comprehensive enablement programs",
      "Quality Assurance: Built-in data lineage and audit trails",
      "Scalable Architecture: Platform grows with the organization",
    ],
    metrics:
      "Adoption Strategy: Start with BI experts, build success stories, and scale through champion networks",
    impact:
      "Wide adoption creates network effects where more users drive more insights, improving platform capabilities.",
  },
  {
    id: 7,
    title: "Strategic Value Demonstration",
    shortTitle: "Strategic\nValue\nDemonstration",
    icon: TrendingUp,
    color: "from-secondary-500 to-warning",
    glowColor: "glow-pink",
    phase: "VALUE REALIZATION",
    description:
      "Measure and communicate tangible business impact to justify continued investment and expansion of PRISM capabilities.",
    highlight:
      "Demonstrable ROI through measurable improvements in POP analytical capabilities",
    details: [
      "Efficiency Gains: Quantifiable reduction in time spent on routine analytics",
      "Decision Speed: Measurable improvement in decision cycle time",
      "Quality Improvements: Reduction in errors and inconsistencies",
      "Innovation Capacity: Increased bandwidth for strategic initiatives",
      "User Satisfaction: High engagement and satisfaction scores",
    ],
    impact:
      "Proven value demonstration secures executive support and drives continued investment in PRISM evolution.",
  },
  {
    id: 8,
    title: "Platform Evolution & Innovation",
    shortTitle: "Platform\nEvolution &\nInnovation",
    icon: RefreshCw,
    color: "from-primary-600 to-secondary-500",
    glowColor: "glow",
    phase: "CONTINUOUS",
    description:
      "Continuously evolve PRISM based on user feedback, new technologies, and expanding POP business needs for sustained competitive advantage.",
    highlight:
      "From analytics platform to intelligent business intelligence ecosystem",
    details: [
      "AI Enhancement: Advanced AI integration for automated insights",
      "Advanced Modeling: Sophisticated scenario modeling capabilities",
      "Integration Expansion: Broader data source connectivity",
      "Mobile Innovation: Enhanced mobile and location-aware analytics",
      "Collaborative Features: Advanced sharing and annotation capabilities",
    ],
    impact:
      "Platform innovation attracts new use cases and users, accelerating the entire PRISM flywheel cycle.",
  },
];

const principles = [
  {
    icon: GitBranch,
    title: "BI Expert-First Analytics",
    description:
      "Build on SQL-native, Git-integrated workflows that enable rapid development while maintaining quality through version control, testing, and collaborative BI practices.",
  },
  {
    icon: BarChart3,
    title: "Core + Variant Metric Model",
    description:
      "Implement standardized core metrics with approved business variations, enabling consistency while supporting legitimate use case differences.",
  },
  {
    icon: Users,
    title: "Audience-Centric Design",
    description:
      "Create tailored experiences for different POP team roles: simple interfaces for business users and advanced SQL/Spark capabilities for BI experts.",
  },
  {
    icon: Rocket,
    title: "Self-Service Empowerment",
    description:
      "Enable POP team members to explore data and generate insights independently while maintaining governance and quality standards.",
  },
  {
    icon: Brain,
    title: "Collaborative BI Development",
    description:
      "Enable team-based analytics development through Git workflows, peer review, and shared component libraries that scale analytical capabilities.",
  },
  {
    icon: Layers,
    title: "Ecosystem Thinking",
    description:
      "Build PRISM as an integrated ecosystem where each component strengthens the others, creating sustainable competitive advantages.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Flywheel() {
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const selectedData = selectedSegment
    ? segments.find((s) => s.id === selectedSegment)
    : null;

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-bg-tertiary via-white to-primary-50/30 overflow-visible">
      {/* Background Elements */}

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full text-primary-500 font-semibold text-sm mb-4 shadow-sm"
            variants={fadeInUp}
          >
            <Sparkles className="w-4 h-4" />
            PRISM Analytics Strategy
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-text-primary"
            variants={fadeInUp}
          >
            <span className="gradient-text">
              PRISM Analytics Product Flywheel
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-text-secondary font-semibold mb-2"
            variants={fadeInUp}
          >
            POP Data Analytics Product Team Strategy
          </motion.p>

          <motion.p
            className="text-lg text-text-muted italic"
            variants={fadeInUp}
          >
            Transforming BI&A POP Team Analytics Through Rapid Insights &
            Scenario Modeling
          </motion.p>
        </motion.div>

        {/* Overview Card */}
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 mb-12 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            PRISM: Modern Analytics Platform Strategy
          </h2>
          <p className="text-lg leading-relaxed opacity-95">
            PRISM (POP Rapid Insights & Scenario Modeling) leverages DataBricks
            and modern BI architecture to create a self-reinforcing growth cycle
            that transforms how the BI&A POP Team delivers analytics value.
            Built on a developer-friendly platform with business user
            accessibility, each component amplifies the others, creating
            momentum that evolves from reactive reporting to proactive strategic
            insights.
          </p>
        </motion.div>

        {/* Flywheel Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16 overflow-visible">
          {/* Flywheel Visual */}
          <motion.div
            className="relative overflow-visible"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[600px] mx-auto aspect-square">
              {/* Static Background Rings */}
              <div className="absolute inset-8 rounded-full border-2 border-primary-200/30" />
              <div className="absolute inset-16 rounded-full border border-primary-300/20" />
              <div className="absolute inset-24 rounded-full border border-accent-300/20" />

              {/* Static Background Gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-100/50 via-secondary-100/50 to-accent-100/50" />

              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-center shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-300">
                  <div className="text-lg leading-tight">
                    PRISM
                    <br />
                    ANALYTICS
                    <br />
                    FLYWHEEL
                  </div>
                </div>
              </div>

              {/* Segments */}
              {segments.map((segment, index) => {
                const angle = index * 45 - 90; // Start from top
                const radius = 200; // Distance from center
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={segment.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <motion.button
                      className={`
                        w-32 h-32 rounded-full flex flex-col items-center justify-center text-center
                        text-white font-semibold text-xs leading-tight p-3
                        bg-gradient-to-br ${segment.color} shadow-lg
                        border-2 border-white/30 cursor-pointer relative overflow-hidden
                        ${selectedSegment === segment.id ? "ring-4 ring-primary-400 ring-offset-2" : ""}
                      `}
                      whileHover={{
                        scale: 1.15,
                        zIndex: 10,
                        boxShadow: `0 20px 40px -12px var(--tw-shadow-color)`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSegment(segment.id)}
                      onHoverStart={() => setIsHovering(segment.id)}
                      onHoverEnd={() => setIsHovering(null)}
                      animate={
                        isHovering === segment.id
                          ? {
                              rotate: [0, 5, -5, 0],
                            }
                          : {}
                      }
                      transition={{
                        rotate: { duration: 0.5 },
                        scale: { type: "spring", stiffness: 300 },
                      }}
                    >
                      {/* Animated background overlay */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <segment.icon className="w-6 h-6 mb-1 relative z-10" />
                      <span className="whitespace-pre-line relative z-10">
                        {segment.shortTitle}
                      </span>
                    </motion.button>
                  </motion.div>
                );
              })}

              {/* Simplified Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient
                    id="staticGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#ff69b4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00ff94" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {segments.map((_, index) => {
                  const angle1 = index * 45 - 90;
                  const angle2 = ((index + 1) % 8) * 45 - 90;
                  const radius = 200;
                  const x1 = 300 + Math.cos((angle1 * Math.PI) / 180) * radius;
                  const y1 = 300 + Math.sin((angle1 * Math.PI) / 180) * radius;
                  const x2 = 300 + Math.cos((angle2 * Math.PI) / 180) * radius;
                  const y2 = 300 + Math.sin((angle2 * Math.PI) / 180) * radius;

                  return (
                    <path
                      key={index}
                      d={`M ${x1} ${y1} L ${x2} ${y2}`}
                      stroke="url(#staticGradient)"
                      strokeWidth="2"
                      strokeDasharray="4,2"
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Details Panel */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedData ? (
                <motion.div
                  key={selectedData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-primary-500"
                >
                  <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                    {selectedData.phase}
                  </div>

                  <h3 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <selectedData.icon className="w-8 h-8 text-primary-500" />
                    {selectedData.title}
                  </h3>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {selectedData.description}
                  </p>

                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-lg mb-6">
                    <p className="font-semibold">{selectedData.highlight}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {selectedData.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {selectedData.metrics && (
                    <div className="bg-primary-50 p-4 rounded-lg mb-6">
                      <p className="text-primary-900 font-medium">
                        {selectedData.metrics}
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <p className="text-text-primary">
                      <span className="font-semibold">Flywheel Impact:</span>{" "}
                      {selectedData.impact}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <h3 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-primary-500" />
                    PRISM: Strategic Analytics Platform
                  </h3>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    Click on any segment to explore how the POP Data Analytics
                    Product Team leverages modern platform architecture to build
                    self-reinforcing growth cycles that transform the BI&A POP
                    Teams analytical capabilities.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-lg">
                      <p className="font-semibold">
                        Strategic Foundation: DataBricks Platform + Modern BI
                        Architecture + Developer-Friendly Workflows + Business
                        User Accessibility
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-secondary-500 to-accent-500 text-white p-4 rounded-lg">
                      <p className="font-semibold">
                        Key Innovation: Core + Variant Metric Model ensures
                        consistency while supporting legitimate business
                        variations
                      </p>
                    </div>
                  </div>

                  <p className="text-text-secondary mt-6 leading-relaxed">
                    This ecosystem enables rapid insights through modern data
                    architecture while building strategic capacity for
                    high-value initiatives that drive transformational business
                    outcomes for the POP team.
                  </p>

                  <div className="mt-6 text-center text-text-muted italic bg-bg-tertiary p-4 rounded-lg">
                    💡 Click on any flywheel segment to explore the PRISM
                    analytics strategy
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Key Principles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full text-primary-500 font-semibold text-sm mb-4 shadow-sm">
              <Brain className="w-4 h-4" />
              Core Principles
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Key Strategic Principles
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle) => (
              <motion.div
                key={principle.title}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-lg p-6 border-t-4 border-primary-500 hover:shadow-xl transition-all duration-300 hover:border-secondary-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <principle.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
