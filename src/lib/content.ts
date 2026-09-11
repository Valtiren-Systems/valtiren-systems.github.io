/**
 * Single source of truth for landing-page copy.
 * Structure mirrors the reference UI: 9 solution cards in a 3-column grid,
 * a 2-column services block, a logo strip, and a closing CTA.
 */

export type IconName = "assetMap" | "fieldAnalytics" | "systemsOps";

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
  { label: "Solutions", href: "/#solutions" },
  // { label: "Industries", href: "/#industries" },
  { label: "Services", href: "/#services" },
  { label: "Resources", href: "/#resources" },
  { label: "Contact", href: "/#footer" },
] as const;

export const HERO = {
  eyebrow: "Meet the",
  title: "Valtiren Systems",
  subtitle:
    "Connects GIS, field data, sensors, and operational systems, then uses AI to help electric utilities understand their grid, identify risks, and act faster.",
} as const;

export const SUITE = {
  title: "Connect What You Already Have. Make It Intelligent.",
  body: "Electric utilities already have GIS maps, asset databases, meters, sensors, field records, work orders, and operational systems. The problem is that the information often lives across different systems. We connect the data you already have into a unified operational layer, then use AI and analytics to find patterns, surface anomalies, identify risks, and support better decisions without replacing everything you already use.",
} as const;

export const SOLUTIONS: Solution[] = [
  {
    icon: "assetMap",
    title: "Build an Intelligent View of Your Grid",
    body: "Grid assets, GIS records, network data, and field updates can be scattered across different systems. We connect them into a spatial operational view and use AI-assisted analysis to help your team understand assets, relationships, and emerging risks.",
    href: "#interactive-assetMap",
  },
  {
    icon: "fieldAnalytics",
    title: "Turn Grid Data Into AI-Powered Insights",
    body: "Inspections, sensors, meters, GPS devices, vegetation records, outage information, and field reports generate valuable data. We connect and analyze that information to detect anomalies, identify potential risks, prioritize issues, and help teams decide what needs attention.",
    href: "#interactive-fieldAnalytics",
  },
  {
    icon: "systemsOps",
    title: "Build AI Around Your Utility Workflows",
    body: "Utilities already rely on GIS, databases, meters, sensors, and operational systems. We build focused software that connects those systems and applies AI where it can reduce manual work, accelerate analysis, and improve operational decision-making.",
    href: "#interactive-systemsOps",
  },
];

export const SERVICES = {
  heading: "From Grid Data to AI-Powered Operations",
  body: "We connect the information your utility already has, make it understandable, and apply AI where it can help your teams work faster and make better decisions.",
  items: [
    {
      title: "01 — Connect",
      body: "Connect GIS, asset databases, sensors, meters, field systems, and operational data into a more consistent view of your grid.",
    },
    {
      title: "02 — Understand",
      body: "Use spatial analytics, data processing, and AI to detect patterns, surface anomalies, identify risks, and turn fragmented grid data into actionable intelligence.",
    },
    {
      title: "03 — Operate",
      body: "Put those insights into focused software and workflows that help utility teams prioritize work, manage assets, monitor risks, and make faster operational decisions.",
    },
  ],
} as const;

export const LOGOS = [
  "Electric Utilities",
  "Electric Cooperatives",
  "Grid Operators",
  "Energy & Infrastructure",
] as const;

export const CTA = {
  title: "Make Your Grid Data Work Smarter.",
  body: "Tell us what your team is managing, where your grid data lives, and which workflows take more manual effort than they should. We'll help identify where GIS, data integration, IoT, AI, and custom software can turn fragmented utility data into practical operational intelligence.",
  primary: { label: "Talk to Our Team", href: "#contact" },
  secondary: {
    label: "Book a meeting",
    href: "https://calendly.com/valtirensystems/30min",
  },
} as const;

export const SOCIALLINKS: SocialLink[] = [
  {
    name: "Email",
    href: "https://mail.google.com/mail/?view=cm&to=valtirensystems@gmail.com&su=Hello%20Valtiren%20Systems%21",
    color: "#EA4335",
    stroke: true,
    shapes: [
      { type: "rect", x: 2, y: 4, width: 20, height: 16, rx: 2 },
      { type: "path", d: "M22 6l-10 7L2 6" },
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
  // {
  //   name: "Website",
  //   href: "https://valtiren-systems.com/",
  //   color: "#4A90D9",
  //   stroke: true,
  //   shapes: [
  //     { type: "circle", cx: 12, cy: 12, r: 10 },
  //     { type: "line", x1: 2, y1: 12, x2: 22, y2: 12 },
  //     {
  //       type: "path",
  //       d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  //     },
  //   ],
  // },

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
      "AI Grid Intelligence",
      "Grid Asset Intelligence",
      "DER & Hosting Capacity",
      "Field Data Intelligence",
    ],
    href: [
      NAV_LINKS[0].href,
      NAV_LINKS[0].href,
      NAV_LINKS[0].href,
      NAV_LINKS[0].href,
      NAV_LINKS[0].href,
    ],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Newsroom", "Partners", "Contact"],
    href: [
      NAV_LINKS[1].href,
      NAV_LINKS[1].href,
      NAV_LINKS[1].href,
      "https://topmapsolutions.com/",
      "/#demo",
    ],
  },
  {
    heading: "Resources",
    links: ["Blog", "Case Studies", "Guides", "Webinars", "Support"],
    href: [
      "https://github.com/orgs/Valtiren-Systems/discussions",
      NAV_LINKS[2].href,
      NAV_LINKS[2].href,
      NAV_LINKS[2].href,
      NAV_LINKS[2].href,
    ],
  },
] as const;
