import type { Metadata } from "next";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for seanshallis.com and The Guardian Family of Products. How we collect, use, and protect your personal information.",
  alternates: { canonical: "https://seanshallis.com/privacy" },
};

export default function PrivacyPage() {
  const lastUpdated = "April 29, 2026";

  return (
    <main className="min-h-screen bg-white">
      <SpokeNav />

      <Container className="py-16 md:py-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-neutral-500 text-sm mb-12">
          Last updated: {lastUpdated}
        </p>

        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700">
          <h2>1. Who We Are</h2>
          <p>
            This website (<strong>seanshallis.com</strong>) is owned and operated
            by Sean Shallis / {BRAND.entity} (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;). {BRAND.company}&trade; (including Rate Guardian,
            Project Guardian, Trade Guardian, Health Guardian, and Home Guardian)
            are proprietary technology products of {BRAND.entity}.
          </p>
          <p>
            Sean Shallis is a Mortgage Loan Originator ({BRAND.nmls}) employed by
            {" "}{BRAND.bank}. When you choose to pursue mortgage financing, your
            loan application and personal financial information are handled
            directly by {BRAND.bank} in accordance with their privacy policies
            and applicable federal regulations (including the Gramm-Leach-Bliley
            Act).
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Information you provide:</strong> Name, email address,
              phone number, and mortgage-related details you share through our
              chat interface (Rosie), contact forms, or booking system.
            </li>
            <li>
              <strong>Automatically collected:</strong> IP address, browser type,
              device information, pages visited, time on site, and referral
              source — collected via Vercel Analytics and standard web server
              logs.
            </li>
            <li>
              <strong>Cookies:</strong> We use essential cookies for site
              functionality and analytics cookies (Vercel Analytics) to
              understand how visitors use the site. We do not use third-party
              advertising cookies.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>
              To respond to your inquiries and provide mortgage-related
              information
            </li>
            <li>
              To provide Rate Guardian monitoring services (free rate alerts and
              Savings Score)
            </li>
            <li>
              To communicate with you about mortgage opportunities, rate changes,
              and relevant market updates
            </li>
            <li>To improve our website and Guardian products</li>
            <li>
              To facilitate your mortgage application when you choose to proceed
              with financing through {BRAND.bank}
            </li>
          </ul>

          <h2>4. Who We Share Your Information With</h2>
          <p>
            <strong>We do not sell your personal information.</strong> Your
            information is shared only with:
          </p>
          <ul>
            <li>
              <strong>Sean Shallis personally</strong> — as your direct point of
              contact for mortgage inquiries
            </li>
            <li>
              <strong>{BRAND.bank}</strong> — only when you choose to pursue a
              mortgage application, and only as required to process your loan
            </li>
            <li>
              <strong>Service providers</strong> — hosting (Vercel), CRM
              (GoHighLevel), email services, and analytics — all bound by data
              processing agreements
            </li>
          </ul>
          <p>
            We never share, sell, or distribute your information to third-party
            lead marketplaces, competing lenders, or data brokers.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your contact information for as long as you are enrolled in
            Rate Guardian monitoring or have an active relationship with us. You
            may request deletion at any time by contacting us at{" "}
            <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications at any time</li>
            <li>
              Withdraw consent for Rate Guardian monitoring (unsubscribe from
              alerts)
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>{" "}
            or call {BRAND.contact.phone}.
          </p>

          <h2>7. Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            information, including encrypted data transmission (TLS/SSL), secure
            hosting infrastructure, and access controls. However, no method of
            transmission over the internet is 100% secure.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            This site may contain links to third-party websites (including{" "}
            {BRAND.bank}&apos;s official site, scheduling tools, and podcast
            platforms). We are not responsible for the privacy practices of those
            sites. We encourage you to review their privacy policies.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not
            knowingly collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;Last
            updated&rdquo; date at the top reflects the most recent revision. We
            encourage you to review this page periodically.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal
            information:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${BRAND.contact.email}`}>
                {BRAND.contact.email}
              </a>
            </li>
            <li>
              <strong>Phone:</strong> {BRAND.contact.phone}
            </li>
            <li>
              <strong>Mail:</strong> Sean Shallis / {BRAND.entity},{" "}
              {BRAND.contact.address}, {BRAND.contact.city},{" "}
              {BRAND.contact.state} {BRAND.contact.zip}
            </li>
          </ul>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
