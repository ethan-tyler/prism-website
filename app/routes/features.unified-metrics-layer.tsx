// app/routes/features.unified-metrics-layer.tsx
import { MetaFunction } from "@remix-run/node";
import UnifiedMetricsLayer from "~/components/UnifiedMetricsLayer";

export const meta: MetaFunction = () => {
  return [
    { title: "Unified Metrics Layer | PRISM Analytics" },
    { name: "description", content: "Single source of truth for all metrics with version control, lineage tracking, and governance. Ensure consistency and reliability across your organization." },
  ];
};

export default function UnifiedMetricsLayerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedMetricsLayer />
    </div>
  );
}