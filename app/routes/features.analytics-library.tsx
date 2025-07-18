// app/routes/features.analytics-library.tsx
import { MetaFunction } from "@remix-run/node";
import AnalyticsLibrary from "~/components/AnalyticsLibrary";

export const meta: MetaFunction = () => {
  return [
    { title: "Analytics Library | PRISM Analytics" },
    { name: "description", content: "Comprehensive library of reusable analytics functions, visualizations, and templates. Accelerate your data insights with battle-tested components." },
  ];
};

export default function AnalyticsLibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsLibrary />
    </div>
  );
}