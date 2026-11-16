import type { Metadata } from "next";
import { JoinCTA } from "@/components/Sections";
import { Team } from "@/components/Team";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Team",
  description: "The executive board and advisors behind Stanford BIOME.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        label="Team"
        title={
          <>
            The people <em>behind</em> BIOME.
          </>
        }
        lede="A student executive board, backed by faculty and industry advisors."
      />
      <section className="wrap py-20 sm:py-28">
        <Team />
      </section>
      <JoinCTA />
    </>
  );
}
