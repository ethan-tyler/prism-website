// app/routes/features.self-service-portal.tsx
import { MetaFunction } from "@remix-run/node";
import SelfServicePortal from "~/components/SelfServicePortal";

export const meta: MetaFunction = () => {
  return [
    { title: "Self-Service Portal | PRISM Analytics" },
    { name: "description", content: "Empower every user to answer their own questions with a self-service portal designed for speed, simplicity, and scalability. No coding required." },
  ];
};

export default function SelfServicePortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SelfServicePortal />
    </div>
  );
}