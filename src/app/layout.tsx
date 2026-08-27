import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// The reference UI ships Poppins for body/buttons and Metropolis for display.
// Metropolis is not freely licensed; Poppins is the same geometric-grotesk
// classification and is what the reference actually falls back to.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Valtiren Systems | Custom Software, IoT & GIS",
    template: "%s | Valtiren Systems",
  },
  description:
    "Valtiren Systems develops custom software, IoT platforms, GIS solutions, backend systems, and real-time dashboards that power digital infrastructure for utilities and modern businesses.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Valtiren Systems | Custom Software, IoT & GIS",
    description:
      "Custom software, IoT, GIS, backend systems, and real-time dashboards engineered to build reliable digital infrastructure for utilities and modern businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
