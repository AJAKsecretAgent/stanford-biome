import type { Metadata } from "next";
import { JoinCTA } from "@/components/Sections";
import { PageHeader } from "@/components/ui";
import { VentureGrid } from "@/components/VentureGrid";
import { ventures } from "@/data/ventures";

export const metadata: Metadata = {
  title: "Ventures",
  description: "Student-founded bio ventures and flagship projects built at Stanford BIOME.",
};

export default function VenturesPage() {
  return (
    <>
      <PageHeader
        label="Ventures"
        title={
          <>
            What our teams are <em>building.</em>
          </>
        }
        lede="Student-founded ventures and flagship projects across therapeutics, diagnostics, devices, and computational biology."
      />
      <section className="wrap py-20 sm:py-28">
        <VentureGrid ventures={ventures} />
      </section>
      <JoinCTA />
    </>
  );
}
