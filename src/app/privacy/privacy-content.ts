// Content for the Privacy Policy page.
// Kept separate from PrivacyPolicy.tsx so copy can be edited or reviewed
// by legal/marketing without touching layout or styling.

export interface PrivacySection {
  /** Used as the element id for anchor links (#overview, #cookies, etc). */
  id: string;
  /** Two-digit label shown next to the title, e.g. "01". */
  number: string;
  title: string;
  /** One or more paragraphs rendered in order. */
  body: string[];
}

export const privacyEffectiveDate = "August 21, 2026";

export const privacyIntro =
  "This page explains what information Valtiren Systems collects, how we use it, and the choices available to you — across valtirensystems.com and our operational intelligence platform.";

export const privacySections: PrivacySection[] = [
  {
    id: "overview",
    number: "01",
    title: "Overview",
    body: [
      'Valtiren Systems ("we," "us," or "our") connects GIS, IoT devices, databases, business systems, and field workflows into one operational layer for our clients. This policy covers the information we collect when you visit our website, request a demo, or otherwise interact with us.',
    ],
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information We Collect",
    body: [
      "Information you give us directly: your name, work email, company, phone number, and anything you share when you request a demo, contact our team, or subscribe to updates.",
      "Information collected automatically: pages visited, browser and device type, IP address, and referring URLs, gathered through cookies and similar technologies as you use our site.",
    ],
  },
  {
    id: "how-we-use-it",
    number: "03",
    title: "How We Use Your Information",
    body: [
      "We use the information we collect to respond to inquiries, schedule and deliver demos, operate and secure our website and platform, send updates you've opted into, and understand how visitors use our site so we can make it more useful.",
    ],
  },
  {
    id: "how-we-share-it",
    number: "04",
    title: "How We Share Information",
    body: [
      "We don't sell your personal information. We share it only with service providers who help us run our business — hosting, email delivery, scheduling, and analytics tools — and only to the extent they need it to perform that service.",
      "We may also disclose information if required by law, or to protect the rights, safety, or property of Valtiren Systems, our clients, or others.",
    ],
  },
  {
    id: "cookies",
    number: "05",
    title: "Cookies & Tracking Technologies",
    body: [
      "Our website uses cookies and similar technologies to keep the site running, remember your preferences, and understand aggregate traffic patterns. You can control or disable cookies through your browser settings; some site features may not work as intended if you do.",
    ],
  },
  {
    id: "security",
    number: "06",
    title: "Data Security",
    body: [
      "We use administrative, technical, and physical safeguards designed to protect information against unauthorized access, disclosure, alteration, or destruction. No method of transmission or storage is completely secure, and we can't guarantee absolute security.",
    ],
  },
  {
    id: "retention",
    number: "07",
    title: "Data Retention",
    body: [
      "We keep personal information for as long as needed to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law.",
    ],
  },
  {
    id: "your-rights",
    number: "08",
    title: "Your Privacy Rights",
    body: [
      "Depending on where you're located, you may have the right to access, correct, delete, or restrict how we use your personal information, and to object to certain processing.",
      "If you're in the European Economic Area, the UK, or Switzerland, these rights are provided under the GDPR. If you're in the Philippines, they're provided under the Data Privacy Act of 2012 (RA 10173). Other jurisdictions may grant additional rights. To exercise any of these, contact us using the details below.",
    ],
  },
  {
    id: "international-transfers",
    number: "09",
    title: "International Data Transfers",
    body: [
      "Valtiren Systems operates internationally, and information we collect may be transferred to, stored, and processed in countries other than your own. Where required, we use appropriate contractual or legal safeguards to protect information transferred across borders.",
    ],
  },
  {
    id: "client-platform-data",
    number: "10",
    title: "Client & Platform Data",
    body: [
      "This policy covers information collected through our website and general business communications. Data that our clients' platforms process through our services — including GIS layers, IoT sensor readings, and other infrastructure records — is handled under the applicable Master Services Agreement and any accompanying Data Processing Agreement between Valtiren Systems and that client.",
    ],
  },
  {
    id: "childrens-privacy",
    number: "11",
    title: "Children's Privacy",
    body: [
      "Our website and services are directed at businesses and are not intended for individuals under the age of 16. We don't knowingly collect personal information from children.",
    ],
  },
  {
    id: "changes",
    number: "12",
    title: "Changes to This Policy",
    body: [
      "We may update this policy as our practices evolve. If we make material changes, we'll update the effective date above and, where appropriate, provide additional notice.",
    ],
  },
  {
    id: "contact",
    number: "13",
    title: "Contact Us",
    body: [
      "Questions about this policy or how we handle your information? Reach us at valtirensystems@gmail.com.",
    ],
  },
];
