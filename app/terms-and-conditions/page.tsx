import { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | FileTools",
  description: "Read the terms governing your use of FileTools online utilities.",
};

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "use-of-services", title: "Use of Services" },
  { id: "permitted-usage", title: "Permitted Usage" },
  { id: "prohibited-activities", title: "Prohibited Activities" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "service-availability", title: "Service Availability" },
  { id: "changes-to-service", title: "Changes to Service" },
  { id: "termination", title: "Termination" },
  { id: "contact", title: "Contact Information" },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      description="Please read these terms and conditions carefully before using our website and services."
      icon={<FileText className="w-8 h-8" />}
      lastUpdated="July 2026"
      sections={sections}
    >
      <h2 id="acceptance">Acceptance of Terms</h2>
      <p>
        By accessing and using FileTools, you accept and agree to be bound by the terms and provision of this agreement. 
        In addition, when using FileTools's particular services, you shall be subject to any posted guidelines or rules 
        applicable to such services.
      </p>

      <h2 id="use-of-services">Use of Services</h2>
      <p>
        FileTools provides a collection of online tools for modifying and converting various file types. 
        You understand and agree that the Service is provided "AS-IS" and that FileTools assumes no responsibility 
        for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
      </p>

      <h2 id="permitted-usage">Permitted Usage</h2>
      <p>
        You are permitted to use FileTools for your personal and commercial needs, provided you do so legally. 
        <strong> Users should only upload files they own or have explicit permission to process.</strong> 
        We do not claim any ownership rights over the files you upload.
      </p>

      <h2 id="prohibited-activities">Prohibited Activities</h2>
      <p>
        You agree not to use the Service to:
      </p>
      <ul>
        <li>Upload files that contain malware, viruses, or any other malicious code.</li>
        <li>Process materials that infringe on any patent, trademark, trade secret, copyright, or other proprietary rights.</li>
        <li>Attempt to bypass any security mechanisms or passwords on files you do not own.</li>
        <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
      </ul>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are and will remain the exclusive property of 
        FileTools and its licensors. The Service is protected by copyright, trademark, and other laws of both the 
        United States and foreign countries.
      </p>

      <h2 id="disclaimer">Disclaimer</h2>
      <p>
        Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. 
        The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, 
        implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
      </p>

      <h2 id="limitation-of-liability">Limitation of Liability</h2>
      <p>
        In no event shall FileTools, nor its directors, employees, partners, agents, suppliers, or affiliates, 
        be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
        loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
        inability to access or use the Service.
      </p>

      <h2 id="service-availability">Service Availability</h2>
      <p>
        We do not guarantee that our Services will always be available or be uninterrupted. We reserve the right to 
        suspend, withdraw, or restrict the availability of all or any part of our business for business and operational reasons.
      </p>

      <h2 id="changes-to-service">Changes to Service</h2>
      <p>
        We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, 
        in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is 
        unavailable at any time or for any period.
      </p>

      <h2 id="termination">Termination</h2>
      <p>
        We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
        including without limitation if you breach the Terms. Upon termination, your right to use the Service will 
        immediately cease.
      </p>

      <h2 id="contact">Contact Information</h2>
      <p>
        If you have any questions about these Terms, please contact us at legal@filetools.example.com.
      </p>
    </LegalLayout>
  );
}
