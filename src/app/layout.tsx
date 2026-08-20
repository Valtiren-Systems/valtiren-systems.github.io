import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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
    default: "Valtiren Systems — Meet the Intelligent Engagement Suite",
    template: "%s | Valtiren Systems",
  },
  description:
    "A comprehensive ecosystem of sight, sound, scent, data solutions, and service offerings that drives engagement across all touchpoints.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Valtiren Systems — Meet the Intelligent Engagement Suite",
    description:
      "Sight, sound, scent, data, and services — engineered into one connected customer experience.",
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
