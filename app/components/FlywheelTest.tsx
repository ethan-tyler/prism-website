// Simple test version of Flywheel component
import { Sparkles } from "lucide-react";

export function FlywheelTest() {
  return (
    <section className="relative py-20 lg:py-32 bg-white">
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full text-primary-500 font-semibold text-sm mb-4 shadow-sm">
            <Sparkles className="w-4 h-4" />
            PRISM Analytics Strategy
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-text-primary">
            <span className="gradient-text">
              PRISM Analytics Product Flywheel
            </span>
          </h1>
          
          <p className="text-xl text-text-secondary font-semibold mb-2">
            POP Data Analytics Product Team Strategy
          </p>
          
          <p className="text-lg text-text-muted italic">
            Transforming BI&A POP Team Analytics Through Rapid Insights & Scenario Modeling
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 mb-12 shadow-xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            PRISM: Modern Analytics Platform Strategy
          </h2>
          <p className="text-lg leading-relaxed opacity-95">
            PRISM (POP Rapid Insights & Scenario Modeling) leverages DataBricks and modern BI architecture to create a self-reinforcing growth cycle that transforms how the BI&A POP Team delivers analytics value.
          </p>
        </div>

        <div className="text-center">
          <p className="text-text-secondary">
            This is a simplified test version of the Flywheel component.
          </p>
        </div>
      </div>
    </section>
  );
}