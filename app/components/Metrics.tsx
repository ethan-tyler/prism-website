import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  CheckCircle,
  Info,
  AlertTriangle,
  Zap,
  Shield,
  Clock,
  Activity,
  Sparkles,
  Eye,
  Award,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const metrics = [
  {
    label: "Template Usage",
    value: "847",
    change: "+23.5%",
    trend: "positive",
    sparklineData: [50, 45, 48, 35, 30, 32, 25, 20, 15, 10, 5],
  },
  {
    label: "Certified Metrics",
    value: "1.2K",
    change: "+15.8%",
    trend: "positive",
    sparklineData: [40, 35, 38, 30, 25, 28, 20, 15, 10],
  },
  {
    label: "Query Response",
    value: "2.3s",
    change: "-18.4%",
    trend: "positive",
    sparklineData: [20, 25, 22, 28, 35, 30, 32, 40],
  },
  {
    label: "Data Quality",
    value: "98.7%",
    change: "+1.2%",
    trend: "positive",
    sparklineData: [15, 12, 10, 8, 5, 3],
  },
];

const activities = [
  {
    type: "success",
    title: "Customer Cohort Analysis template deployed",
    description:
      "New retention tracking capabilities with 12-month lookback periods",
    time: "5 min ago",
    icon: CheckCircle,
  },
  {
    type: "info",
    title: "Semantic layer refresh scheduled",
    description: "Monthly metric recertification process starts Sunday 3:00 AM",
    time: "22 min ago",
    icon: Info,
  },
  {
    type: "warning",
    title: "High template usage detected on Revenue Analytics",
    description:
      "DataBricks auto-scaling activated to maintain sub-3s performance",
    time: "1 hour ago",
    icon: AlertTriangle,
  },
  {
    type: "success",
    title: "NBRX parameter framework certified",
    description: "Core + variant model approved with 8 governed parameters",
    time: "3 hours ago",
    icon: CheckCircle,
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

export function Metrics() {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  useEffect(() => {
    // Animate metric values on mount
    const timer = setTimeout(() => {
      metrics.forEach((metric, index) => {
        const numericValue = parseFloat(metric.value.replace(/[^0-9.]/g, ""));
        animateValue(metric.label, 0, numericValue, 2000 + index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const animateValue = (
    key: string,
    start: number,
    end: number,
    duration: number
  ) => {
    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;

      setAnimatedValues((prev) => ({ ...prev, [key]: current }));

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  };

  const formatAnimatedValue = (metric: (typeof metrics)[0]) => {
    const animated = animatedValues[metric.label] || 0;

    if (metric.value.includes("K")) {
      return `${(animated / 1000).toFixed(1)}K`;
    } else if (metric.value.includes("%")) {
      return `${animated.toFixed(1)}%`;
    } else if (metric.value.includes("s")) {
      return `${animated.toFixed(1)}s`;
    }

    return Math.round(animated).toLocaleString();
  };

  return (
    <section 
      ref={containerRef}
      id="metrics" 
      className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
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
            <span className="block mb-2">Platform Performance</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Monitoring
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Built on <span className="font-semibold text-gray-900">Databricks</span> with enterprise governance,{" "}
            <span className="font-semibold text-gray-900">real-time monitoring</span>, and{" "}
            <span className="font-semibold text-gray-900">intelligent insights</span>.
            <br />
            Integrated components create compound analytical value.
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="bg-bg-secondary rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
            >
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="text-sm font-medium text-text-muted mb-2">
                    {metric.label}
                  </h4>
                  <div className="text-3xl font-bold text-text-primary">
                    {animatedValues[metric.label]
                      ? formatAnimatedValue(metric)
                      : "0"}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    metric.trend === "positive"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {metric.trend === "positive" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {metric.change}
                </div>
              </div>

              {/* Sparkline */}
              <div className="h-12 relative">
                <svg className="w-full h-full" viewBox="0 0 200 48">
                  <defs>
                    <linearGradient
                      id={`gradient-${index}`}
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#635bff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#635bff" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient fill */}
                  <motion.path
                    d={`M0,${metric.sparklineData[0]} ${metric.sparklineData
                      .map(
                        (point, i) =>
                          `L${(i * 200) / (metric.sparklineData.length - 1)},${point}`
                      )
                      .join(" ")} L200,48 L0,48 Z`}
                    fill={`url(#gradient-${index})`}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />

                  {/* Line */}
                  <motion.path
                    d={`M0,${metric.sparklineData[0]} ${metric.sparklineData
                      .map(
                        (point, i) =>
                          `L${(i * 200) / (metric.sparklineData.length - 1)},${point}`
                      )
                      .join(" ")}`}
                    stroke="#635bff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-text-primary">
              Platform Activity
            </h3>
            <div className="flex items-center gap-2 text-success font-semibold text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              Live Updates
            </div>
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 border-b border-border-light last:border-b-0 transition-colors hover:bg-bg-tertiary rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === "success"
                      ? "bg-green-100 text-green-600"
                      : activity.type === "info"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-text-primary mb-1">
                    {activity.title}
                  </div>
                  <div className="text-sm text-text-muted">
                    {activity.description}
                  </div>
                </div>
                <div className="text-sm text-text-light whitespace-nowrap">
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
