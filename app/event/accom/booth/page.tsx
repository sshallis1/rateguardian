import type { Metadata } from "next";
import { BoothMode } from "@/components/event/BoothMode";

export const metadata: Metadata = {
  title: "Rosie — Live Booth Mode",
  description:
    "Live conference demo: introduce your prospect to Rosie and watch the magic happen.",
};

export default function BoothPage() {
  return <BoothMode />;
}
