import type { MetaFunction } from "@remix-run/node";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Metrics } from "../components/Metrics";
import { Team } from "../components/Team";
import { Roadmap } from "../components/Roadmap";
import { CTA, Footer } from "../components/CTAFooter";
import FlywheelStripe from "../components/FlywheelStripe";
import { ParameterGovernance } from "../components/ParameterGovernance";
import { WhatIsPrism } from "../components/WhatIsPrism";

export const meta: MetaFunction = () => {
  return [
    { title: "PRISM Analytics - Enterprise Data Intelligence Platform" },
    {
      name: "description",
      content:
        "Transform your analytics with PRISM Intelligence. Real-time insights, automated reporting, and predictive analytics powered by our next-generation data platform.",
    },
    {
      name: "keywords",
      content:
        "analytics, business intelligence, data platform, dashboards, real-time analytics",
    },
    {
      property: "og:title",
      content: "PRISM Analytics - Enterprise Data Intelligence Platform",
    },
    {
      property: "og:description",
      content:
        "Transform your analytics with PRISM Intelligence. Real-time insights, automated reporting, and predictive analytics.",
    },
    { property: "og:type", content: "website" },
  ];
};

export default function Index() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <WhatIsPrism />
        <FlywheelStripe />
        <Features />
        <Metrics />
        <ParameterGovernance />
        <Team />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
