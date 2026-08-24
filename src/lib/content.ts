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

export type IconShape =
  | { type: "path"; d: string; fill?: string }
  | { type: "circle"; cx: number; cy: number; r: number }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number }
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      rx?: number;
    };

export interface SocialLink {
  name: string;
  href: string;
  color: string;
  stroke: boolean; // true = outline style (stroke), false = solid fill style
  shapes: IconShape[];
}

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
  subtitle:
    "Stop Unbilled Losses, Field Bottlenecks & Compliance Surprises in 30 Days.",
} as const;

export const SUITE = {
  title: "The Zero-Disruption Overlay",
  body: "Traditional software projects often take too much time and money. They can require years to roll out, large upfront investments, and even replacing existing hardware.",
} as const;

export const SOLUTIONS: Solution[] = [
  {
    icon: "signage",
    title: "Tool & Equipment Location Visibility",
    body: 'Crews hoard specialized tools in trailers across job sites "just in case." Meanwhile, another PM on a nearby site rents the exact same equipment, doubling your rental overhead while owned assets gather dust.',
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

export const SOCIALLINKS: SocialLink[] = [
  {
    name: "Email",
    href: "mailto:valtirensystems@gmail.com",
    color: "#EA4335",
    stroke: true,
    shapes: [
      { type: "rect", x: 2, y: 4, width: 20, height: 16, rx: 2 },
      { type: "path", d: "M22 6l-10 7L2 6" },
    ],
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/valtiren-systems/",
    color: "#0A66C2",
    stroke: false,
    shapes: [
      {
        type: "path",
        d: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z",
      },
    ],
  },
  {
    name: "GitHub",
    href: "https://github.com/Valtiren-Systems",
    color: "#181717",
    stroke: false,
    shapes: [
      {
        type: "path",
        d: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10z",
      },
    ],
  },
  {
    name: "Website",
    href: "https://valtiren-systems.com/",
    color: "#4A90D9",
    stroke: true,
    shapes: [
      { type: "circle", cx: 12, cy: 12, r: 10 },
      { type: "line", x1: 2, y1: 12, x2: 22, y2: 12 },
      {
        type: "path",
        d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
      },
    ],
  },
  {
    name: "Slack",
    href: "https://join.slack.com/t/valtiren-systems/shared_invite/zt-401pvx5v9-8Lo~ihaZAvNoIpE5bzYy2Q",
    color: "",
    stroke: false,
    shapes: [
      {
        type: "path",
        fill: "#36C5F0",
        d: "M8.94 15.16a2.11 2.11 0 1 1 0-4.22h2.11v2.11a2.11 2.11 0 0 1-2.11 2.11zm1.06-5.29A2.11 2.11 0 0 1 7.89 7.76a2.11 2.11 0 0 1 2.11-2.11h5.29a2.11 2.11 0 0 1 2.11 2.11 2.11 2.11 0 0 1-2.11 2.11H10z",
      },
      {
        type: "path",
        fill: "#2EB67D",
        d: "M5.04 15.16a2.11 2.11 0 1 1 0-4.22h2.11v2.11a2.11 2.11 0 0 1-2.11 2.11zm1.06-5.29A2.11 2.11 0 0 1 4 7.76a2.11 2.11 0 0 1 2.11-2.11h5.29A2.11 2.11 0 0 1 13.5 7.76a2.11 2.11 0 0 1-2.11 2.11H6.1z",
      },
      {
        type: "path",
        fill: "#ECB22E",
        d: "M18.96 8.84a2.11 2.11 0 1 1 0 4.22h-2.11V10.95a2.11 2.11 0 0 1 2.11-2.11zm-1.06 5.29A2.11 2.11 0 0 1 20 16.24a2.11 2.11 0 0 1-2.11 2.11h-5.29A2.11 2.11 0 0 1 10.5 16.24a2.11 2.11 0 0 1 2.11-2.11h5.29z",
      },
      {
        type: "path",
        fill: "#E01E5A",
        d: "M15.06 18.96a2.11 2.11 0 1 1-4.22 0v-2.11h2.11a2.11 2.11 0 0 1 2.11 2.11zm-5.29 1.06A2.11 2.11 0 0 1 7.76 18a2.11 2.11 0 0 1 2.11-2.11h5.39A2.11 2.11 0 0 1 17.27 18a2.11 2.11 0 0 1-2.11 2.11H9.77z",
      },
    ],
  },
  {
    name: "Community",
    href: "https://github.com/orgs/Valtiren-Systems/discussions",
    color: "#8250DF",
    stroke: true,
    shapes: [
      {
        type: "path",
        d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
      },
    ],
  },
];

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
