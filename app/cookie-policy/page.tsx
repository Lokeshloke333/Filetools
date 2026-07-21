import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | FileTools",
  description: "Learn how FileTools uses cookies to improve your browsing experience.",
};

const sections = [
  { id: "what-are-cookies", title: "What Cookies Are" },
  { id: "types-of-cookies", title: "Types of Cookies" },
  { id: "essential-cookies", title: "Essential Cookies" },
  { id: "analytics-cookies", title: "Analytics Cookies" },
  { id: "performance-cookies", title: "Performance Cookies" },
  { id: "managing-cookies", title: "Managing Cookies" },
  { id: "third-party-cookies", title: "Third-party Cookies" },
  { id: "changes", title: "Changes to Cookie Policy" },
  { id: "contact", title: "Contact Information" },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      description="This policy explains how we use cookies and similar technologies to recognize you when you visit our website."
      icon={<Cookie className="w-8 h-8" />}
      lastUpdated="July 2026"
      sections={sections}
    >
      <h2 id="what-are-cookies">What Cookies Are</h2>
      <p>
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
        Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, 
        as well as to provide reporting information.
      </p>

      <h2 id="types-of-cookies">Types of Cookies</h2>
      <p>
        Cookies set by the website owner (in this case, FileTools) are called "first-party cookies". 
        Cookies set by parties other than the website owner are called "third-party cookies". 
        We use both first-party and third-party cookies for several reasons.
      </p>

      <h2 id="essential-cookies">Essential Cookies</h2>
      <p>
        Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as 
        "essential" or "strictly necessary" cookies. These include cookies that allow you to navigate our site securely 
        and use its core features.
      </p>

      <h2 id="analytics-cookies">Analytics Cookies</h2>
      <p>
        These cookies collect information that is used either in aggregate form to help us understand how our Websites 
        are being used or how effective our marketing campaigns are.
      </p>

      <h2 id="performance-cookies">Performance Cookies</h2>
      <p>
        These cookies are used to enhance the performance and functionality of our Websites but are non-essential to 
        their use. However, without these cookies, certain functionality (like videos) may become unavailable.
      </p>

      <h2 id="managing-cookies">Managing Cookies</h2>
      <p>
        You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting 
        your preferences in the Cookie Consent Manager. You can also set or amend your web browser controls to accept 
        or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some 
        functionality and areas of our website may be restricted.
      </p>

      <h2 id="third-party-cookies">Third-party Cookies</h2>
      <p>
        In some special cases, we also use cookies provided by trusted third parties. The following section details which 
        third party cookies you might encounter through this site. We use <strong>Google Analytics</strong> which is one of 
        the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site 
        and ways that we can improve your experience.
      </p>

      <h2 id="changes">Changes to Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we 
        use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly 
        to stay informed about our use of cookies and related technologies.
      </p>

      <h2 id="contact">Contact Information</h2>
      <p>
        If you have any questions about our use of cookies or other technologies, please email us at privacy@filetools.example.com.
      </p>
    </LegalLayout>
  );
}
