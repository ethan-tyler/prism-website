// app/routes/features.lightning-fast-queries.tsx
import { MetaFunction } from "@remix-run/node";
import LightningFastQueries from "~/components/LightningFastQueries";

export const meta: MetaFunction = () => {
  return [
    { title: "Lightning Fast Queries | PRISM Analytics" },
    { name: "description", content: "Process billions of rows in seconds with our optimized Spark engine, intelligent caching layer, and advanced indexing strategies." },
  ];
};

export default function LightningFastQueriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LightningFastQueries />
    </div>
  );
}