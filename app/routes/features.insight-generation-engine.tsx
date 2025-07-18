// app/routes/features.insight-generation-engine.tsx
import { MetaFunction } from "@remix-run/node";
import InsightGenerationEngine from "~/components/InsightGenerationEngine";

export const meta: MetaFunction = () => {
  return [
    { title: "Insight Generation Engine | PRISM Analytics" },
    { name: "description", content: "Unlock insights in seconds with Databricks-powered processing and intuitive, business-ready interfaces. Automated analysis and actionable recommendations." },
  ];
};

export default function InsightGenerationEnginePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InsightGenerationEngine />
    </div>
  );
}