import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Valtiren Systems",
  description:
    "How Valtiren Systems collects, uses, and protects information across valtirensystems.com and our operational intelligence platform.",
};

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/site/Nav";
import TermsOfService from "./TermsOfService";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Nav />
      <main>
        return <TermsOfService />
      </main>
      <Footer />
    </>
  );
}
