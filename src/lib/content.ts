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
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Resources", href: "#resources" },
  { label: "Company", href: "#company" },
] as const;

export const HERO = {
  eyebrow: "Meet the",
  title: "Intelligent Engagement Suite",
  subtitle: "Engaging in Every Sense",
  slides: [
    { kicker: "Amplify", line: "every moment of the customer journey." },
    { kicker: "Analyze", line: "what actually moves the needle." },
    { kicker: "Engage", line: "across sight, sound, and scent." },
  ],
} as const;

export const SUITE = {
  title: "The Intelligent Engagement Suite",
  body: "A comprehensive ecosystem of sight, sound, scent, data solutions, and service offerings that work together to drive engagement across every touchpoint — unified under one platform, one partner, and one strategy.",
} as const;

export const SOLUTIONS: Solution[] = [
  {
    icon: "signage",
    title: "Digital Signage",
    body: "Dynamic on-premise screens that turn dwell time into brand time, managed centrally across every location.",
    href: "#digital-signage",
  },
  {
    icon: "menu",
    title: "Digital Menu Boards",
    body: "Day-parted, price-synced menus that update themselves the moment your POS does.",
    href: "#digital-menu-boards",
  },
  {
    icon: "kiosk",
    title: "Interactive Kiosks",
    body: "Self-service ordering, wayfinding, and check-in that shortens lines and lifts average ticket.",
    href: "#interactive-kiosks",
  },
  {
    icon: "music",
    title: "Overhead Music",
    body: "Fully licensed, brand-matched playlists that set the tempo of the room without the legal risk.",
    href: "#overhead-music",
  },
  {
    icon: "hold",
    title: "On-Hold Marketing",
    body: "Turn hold time into airtime with professionally produced messaging on every inbound call.",
    href: "#on-hold-marketing",
  },
  {
    icon: "scent",
    title: "Scent Marketing",
    body: "Signature scent profiles that anchor memory to your brand long after the visit ends.",
    href: "#scent-marketing",
  },
  {
    icon: "driveThru",
    title: "Drive-Thru Systems",
    body: "Clear audio, timed prompts, and lane analytics engineered for speed of service.",
    href: "#drive-thru",
  },
  {
    icon: "wifi",
    title: "WiFi Marketing",
    body: "Guest WiFi that captures opt-ins, builds audiences, and measures repeat visitation.",
    href: "#wifi-marketing",
  },
  {
    icon: "analytics",
    title: "Data & Analytics",
    body: "One dashboard tying screen, sound, and scent activity to real in-store outcomes.",
    href: "#analytics",
  },
];

export const SERVICES = {
  heading: "Services that carry the whole program",
  body: "Hardware is the easy part. Our teams handle strategy, creative production, installation, network provisioning, and ongoing support so your locations stay live — and your internal team stays focused on the business.",
  items: [
    {
      title: "Creative Studio",
      body: "In-house motion, audio, and copy production tuned per location and per day-part.",
    },
    {
      title: "Nationwide Installation",
      body: "Vetted field technicians, site surveys, and staged rollouts across every market you operate in.",
    },
    {
      title: "Managed Networking",
      body: "Provisioned connectivity, device monitoring, and remote remediation before you notice a fault.",
    },
    {
      title: "Support & Success",
      body: "A named team, defined SLAs, and quarterly business reviews against your own KPIs.",
    },
  ],
} as const;

export const LOGOS = [
  "Northbrook",
  "Cascade Health",
  "Vantage Auto",
  "Harborline",
  "Meridian Bank",
  "Trailhead Co.",
  "Solace Hotels",
  "Kestrel Foods",
] as const;

export const CTA = {
  title: "Ready to engage every sense?",
  body: "Talk to a strategist about what the suite looks like across your footprint.",
  primary: { label: "Book a Demo", href: "#demo" },
  secondary: { label: "Talk to Sales", href: "#contact" },
} as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Solutions",
    links: [
      "Digital Signage",
      "Digital Menu Boards",
      "Interactive Kiosks",
      "Overhead Music",
      "Scent Marketing",
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
