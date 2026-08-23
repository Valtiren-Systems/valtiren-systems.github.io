/**
 * Single source of truth for landing-page copy.
 * Structure mirrors the reference UI: 9 solution cards in a 3-column grid,
 * a 2-column services block, a logo strip, and a closing CTA.
 */

export type IconName =
  | "signage"
  | "kiosk"
  | "music"
  | "hold"
  | "scent"
  | "driveThru"
  | "wifi"
  | "menu"
  | "analytics";

export type Solution = {
  icon: IconName;
  title: string;
  body: string;
  href: string;
};

export const NAV_LINKS = [
  { label: "Solutions", href: "#solutions" },
  // { label: "Industries", href: "#industries" },
  { label: "Services", href: "#services" },
  { label: "Resources", href: "#resources" },
  { label: "Company", href: "#company" },
] as const;

export const HERO = {
  eyebrow: "Meet the",
  title: "Valtiren Systems",
  subtitle: "Stop Unbilled Losses, Field Bottlenecks & Compliance Surprises in 30 Days.",
  slides: [],
} as const;

export const SUITE = {
  title: "The Zero-Disruption Overlay",
  body: "Traditional software projects often take too much time and money. They can require years to roll out, large upfront investments, and even replacing existing hardware.",
} as const;

export const SOLUTIONS: Solution[] = [
  {
    icon: "signage",
    title: "Tool & Equipment Location Visibility",
    body: "Crews hoard specialized tools in trailers across job sites \"just in case.\" Meanwhile, another PM on a nearby site rents the exact same equipment, doubling your rental overhead while owned assets gather dust.",
    href: "#digital-signage",
  },
  {
    icon: "menu",
    title: "Material & Laydown Yard Management",
    body: "Materials are delivered to large laydown yards or multi-story builds, but nobody can find them when it's time to install. PMs end up emergency-ordering duplicate stock to keep trades moving, blowing up job budgets.",
    href: "#digital-menu-boards",
  },
  {
    icon: "kiosk",
    title: "Sub-Contractor & Chain-of-Custody Accountability",
    body: "When tools go missing or equipment breaks, nobody takes responsibility. Without clear transfer logs between trades and sites, tool replacement costs come straight out of the general contractor's pocket.",
    href: "#interactive-kiosks",
  },
];

export const SERVICES = {
  heading: "From Site Chaos to Live Map Control in 3 Steps",
  body: "",
  items: [
    {
      title: "Connect Field Data Feeds",
      body: "We ingest data from your current tool tags, rental portals, barcode scanners, or ERP databases. No hardware rip-and-replace required.",
    },
    {
      title: "Auto-Detect Field Exceptions",
      body: "Our AI layer monitors asset movements to flag idle tools, missing material deliveries, and unaccounted equipment movements.",
    },
    {
      title: "Manage Across Interactive Site Maps",
      body: "Project managers and superintendents view live asset positions across job sites, redeploying gear and finding materials instantly.",
    },
  ],
} as const;

export const LOGOS = [
  "Water utilities",
  "Solar operators",
  "battery operators",
  "Electric cooperatives",
  "Construction Industry",
] as const;

export const CTA = {
  title: "Stop Paying for Tools You Already Own",
  body: "Tell us about your toughest job site inventory headache. Our engineering team will review your current tool/material workflow and demonstrate how to solve it before proposing a platform.",
  primary: { label: "Book a Demo", href: "#demo" },
  secondary: { label: "Talk to Sales", href: "#contact" },
} as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Solutions",
    links: [
      "Revenue Leak Engine",
      "LSL Compliance Intelligence",
      "Solar Fault Detector",
      "Site Inventory Tracker",
      "Vegetation Risk Overlay",
    ],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Newsroom", "Partners", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Blog", "Case Studies", "Guides", "Webinars", "Support"],
  },
] as const;
