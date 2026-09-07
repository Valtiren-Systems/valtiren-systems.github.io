export interface TermsSection {
  id: string;
  heading: string;
  body: string[];
}

export const TERMS_LAST_UPDATED = "September 7, 2026";

export const TERMS_INTRO =
  "These terms govern your use of valtirensystems.com and our operational intelligence platform. By using our site or services, you agree to the terms below.";

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of terms",
    body: [
      "By accessing or using this website and any associated services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the site or services.",
    ],
  },
  {
    id: "use-of-service",
    heading: "Use of the service",
    body: [
      "You agree to use the service only for lawful purposes and in accordance with these terms. You are responsible for any activity that occurs through your use of the service.",
      "We reserve the right to suspend or terminate access for any use that violates these terms or applicable law.",
    ],
  },
  {
    id: "accounts",
    heading: "Accounts and information you provide",
    body: [
      "Where the service requires you to submit information — for example when booking a call or requesting a demo — you agree that the information you provide is accurate and that you have the right to share it with us.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: [
      "All content on this site, including text, graphics, logos, and software, is the property of its respective owners and is protected by applicable intellectual property laws. Nothing in these terms grants you a license to use our trademarks or branding without prior written consent.",
    ],
  },
  {
    id: "third-party-services",
    heading: "Third-party services",
    body: [
      "This site may link to or embed third-party services (for example, scheduling tools) that are governed by their own terms and privacy policies. We are not responsible for the content or practices of third-party services.",
    ],
  },
  {
    id: "disclaimer",
    heading: "Disclaimer of warranties",
    body: [
      'The service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.',
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      'We may update these terms from time to time. Material changes will be reflected by an updated "last updated" date on this page. Continued use of the service after changes take effect constitutes acceptance of the revised terms.',
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      "If you have questions about these Terms of Service, please reach out through the contact options listed elsewhere on this site.",
    ],
  },
];
