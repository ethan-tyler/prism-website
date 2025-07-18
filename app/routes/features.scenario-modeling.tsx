// app/routes/features.scenario-modeling.tsx
import { MetaFunction } from "@remix-run/node";
import ScenarioModeling from "~/components/ScenarioModeling";

export const meta: MetaFunction = () => {
  return [
    { title: "Scenario Modeling | PRISM Analytics" },
    { name: "description", content: "Build and compare scenarios with interactive models that drive smarter, data-backed decisions. Test assumptions, analyze outcomes, and plan for multiple futures." },
  ];
};

export default function ScenarioModelingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScenarioModeling />
    </div>
  );
}