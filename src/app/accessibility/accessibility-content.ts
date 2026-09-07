export interface AccessibilitySection {
  id: string;
  heading: string;
  body: string[];
}

export const ACCESSIBILITY_LAST_UPDATED = "August 21, 2026";

export const ACCESSIBILITY_INTRO =
  "Valtiren Systems is committed to making valtirensystems.com and our operational intelligence platform usable by everyone, including people who rely on assistive technology.";

export const ACCESSIBILITY_SECTIONS: AccessibilitySection[] = [
  {
    id: "commitment",
    heading: "Our commitment",
    body: [
      "We work to ensure our website and platform are accessible to the widest possible audience, regardless of technology or ability, and we're continually improving the user experience for everyone.",
    ],
  },
  {
    id: "standards",
    heading: "Standards we follow",
    body: [
      "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more usable for everyone.",
    ],
  },
  {
    id: "features",
    heading: "Accessibility features",
    body: [
      "Our site is built to support keyboard navigation, screen reader compatibility, resizable text without loss of functionality, and sufficient color contrast between text and background.",
    ],
  },
  {
    id: "assistive-technology",
    heading: "Assistive technology compatibility",
    body: [
      "We test our site using a combination of automated tools and manual checks, including screen readers and keyboard-only navigation, across current versions of major browsers.",
    ],
  },
  {
    id: "known-limitations",
    heading: "Known limitations",
    body: [
      "Some third-party tools embedded on our site — such as scheduling widgets — are provided by external vendors and may not fully meet the same accessibility standards we hold our own content to. We're working with our vendors to improve this over time.",
    ],
  },
  {
    id: "ongoing-efforts",
    heading: "Ongoing efforts",
    body: [
      "Accessibility is an ongoing effort, not a one-time project. We periodically review our site and platform and prioritize fixes as issues are identified.",
    ],
  },
  {
    id: "feedback",
    heading: "Feedback & contact",
    body: [
      "If you encounter an accessibility barrier on our site or platform, please let us know through the contact options listed elsewhere on this site. Include the page you were on and a description of the issue, and we'll do our best to address it.",
    ],
  },
];
