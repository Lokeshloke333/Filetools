import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Fileinator protects your privacy while processing your files securely. All processing happens in your browser without permanent storage.",
  keywords: [
    "privacy policy",
    "data security",
    "fileinator privacy",
    "secure file processing",
    "browser security"
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Fileinator",
    description: "Learn how Fileinator protects your privacy while processing your files securely. All processing happens in your browser without permanent storage.",
    url: "/privacy-policy",
    siteName: "Fileinator",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Fileinator",
    description: "Learn how Fileinator protects your privacy while processing your files securely. All processing happens in your browser without permanent storage.",
    images: ["/og-image.png"],
  },
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Information" },
  { id: "cookies", title: "Cookies" },
  { id: "analytics", title: "Analytics" },
  { id: "third-party", title: "Third-party Services" },
  { id: "data-security", title: "Data Security" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "your-rights", title: "Your Rights" },
  { id: "changes", title: "Changes to this Policy" },
  { id: "contact", title: "Contact Us" },
];

import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export default function PrivacyPolicyPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Privacy Policy", item: "/privacy-policy" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <LegalLayout
      title="Privacy Policy"
      description="We believe in protecting your personal information. Read our privacy policy to understand how we keep your data secure."
      icon={<ShieldCheck className="w-8 h-8" />}
      lastUpdated="July 2026"
      sections={sections}
    >
      <h2 id="introduction">Introduction</h2>
      <p>
        Welcome to Fileinator. We are committed to protecting your personal information and your right to privacy. 
        When you visit our website and use our services, you trust us with your personal information. 
        We take your privacy very seriously.
      </p>

      <h2 id="information-we-collect">Information We Collect</h2>
      <p>
        We collect personal information that you voluntarily provide to us when you express an interest in obtaining 
        information about us or our products and services. When you use our tools, you may upload files for processing.
        <strong> Files uploaded for processing are not permanently stored on our servers.</strong> We use browser-based 
        processing whenever possible to keep your files on your device.
      </p>

      <h2 id="how-we-use">How We Use Information</h2>
      <p>
        We use the information we collect or receive to facilitate the creation of and secure the tools you use,
        to request feedback, and to protect our Services. Any files uploaded to our server are processed immediately 
        and then securely deleted. <strong>Passwords you enter (e.g., to unlock a PDF) are never stored or logged.</strong>
      </p>

      <h2 id="cookies">Cookies</h2>
      <p>
        We may use cookies and similar tracking technologies to access or store information. Specific information about 
        how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
      </p>

      <h2 id="analytics">Analytics</h2>
      <p>
        We use analytics services to help analyze how users use the site. These services use cookies and scripts to 
        collect and store information such as how users interact with our website, errors they encounter, and pages 
        they visit.
      </p>

      <h2 id="third-party">Third-party Services</h2>
      <p>
        We only share information with your consent, to comply with laws, to provide you with services, to protect 
        your rights, or to fulfill business obligations. We do not sell your personal data to third parties.
      </p>

      <h2 id="data-security">Data Security</h2>
      <p>
        We have implemented appropriate technical and organizational security measures designed to protect the security 
        of any personal information we process. Processing is secure, and we employ encryption in transit to ensure your 
        data cannot be intercepted. User privacy is respected above all else.
      </p>

      <h2 id="childrens-privacy">Children's Privacy</h2>
      <p>
        We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you 
        represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such 
        minor dependent’s use of the Services.
      </p>

      <h2 id="your-rights">Your Rights</h2>
      <p>
        Depending on your location, you may have the right to request access to the personal information we collect from you, 
        change that information, or delete it in some circumstances. To request to review, update, or delete your personal 
        information, please submit a request to our contact email.
      </p>

      <h2 id="changes">Changes to this Policy</h2>
      <p>
        We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last Updated" 
        date and the updated version will be effective as soon as it is accessible.
      </p>

      <h2 id="contact">Contact Us</h2>
      <p>
        If you have questions or comments about this notice, you may email us at privacy@fileinator.example.com.
      </p>
    </LegalLayout>
    </>
  );
}
