import type { Metadata } from "next";
import { Calendar } from "@/components/Calendar";
import { Reveal } from "@/components/Reveal";
import { JoinCTA } from "@/components/Sections";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Events",
  description: "The Stanford BIOME calendar: meetings, speaker events, workshops, and Shark Tank.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        label="Events"
        title={
          <>
            On the <em>calendar.</em>
          </>
        }
        lede="Meetings, fireside chats, workshops, and pitch nights. Select a highlighted day to see what is on."
      />
      <section className="wrap py-20 sm:py-28">
        <Reveal>
          <Calendar />
        </Reveal>
      </section>
      <JoinCTA />
    </>
  );
}
