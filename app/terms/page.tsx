import type { Metadata } from "next";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for seanshallis.com and The Guardian Family of Products. Usage terms, disclaimers, and legal information.",
  alternates: { canonical: "https://seanshallis.com/terms" },
};

export default function TermsPage() {
  const lastUpdated = "April 29, 2026";

  return (
    <main className="min-h-screen bg-white">
      <SpokeNav />

      <Container className="py-16 md:py-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-neutral-500 text-sm mb-12">
          Last updated: {lastUpdated}
        </p>

        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using <strong>seanshallis.com</strong> (the
            &ldquo;Site&rdquo;) and any products or services offered through it,
            including {BRAND.company}&trade; products (Rate Guardian, Project
            Guardian, Trade Guardian, Health Guardian, Home Guardian), you agree
            to be bound by these Terms and Conditions. If you do not agree, do
            not use the Site.
          </p>

          <h2>2. Site Ownership</h2>
          <p>
            This Site is owned and operated by Sean Shallis /{" "}
            {BRAND.entity}. {BRAND.company}&trade; and all Guardian-branded
            products are proprietary technology products of {BRAND.entity}. They
            are <strong>not</strong> products, services, or endorsements of{" "}
            {BRAND.bank}.
          </p>
          <p>
            Sean Shallis is a Mortgage Loan Originator ({BRAND.nmls}) employed by
            {" "}{BRAND.bank}. Mortgage lending services are provided by Sean
            Shallis in his capacity as a {BRAND.bank} employee, subject to{" "}
            {BRAND.bank}&apos;s policies, procedures, and applicable law.
          </p>

          <h2>3. Not Financial Advice</h2>
          <p>
            The content on this Site — including articles, calculators, AI chat
            responses (Rosie), market commentary (Trade Guardian), Savings
            Scores, and project estimates (Project Guardian) — is provided for{" "}
            <strong>informational and educational purposes only</strong>. It does
            not constitute financial advice, mortgage advice, tax advice, legal
            advice, or investment advice.
          </p>
          <p>
            The Savings Score and rate monitoring features provide general market
            comparisons and do not represent an offer to lend, a rate quote, or a
            pre-approval. Actual loan terms, rates, and eligibility are
            determined by {BRAND.bank} based on your individual application,
            credit profile, and program guidelines.
          </p>

          <h2>4. Mortgage Disclosures</h2>
          <p>
            {BRAND.disclosure.mortgage}
          </p>
          <p>
            {BRAND.disclosure.approval}
          </p>
          <p>
            All mortgage applications are subject to {BRAND.bank}&apos;s
            underwriting requirements. Interest rates, fees, and terms displayed
            on this Site are for illustrative purposes and may not reflect
            current available rates. Contact Sean directly for current rate
            information.
          </p>

          <h2>5. AI-Powered Tools Disclaimer</h2>
          <p>
            Rosie and other AI-powered features on this Site use artificial
            intelligence to provide conversational assistance and general
            mortgage information. AI responses are generated algorithmically and
            may not always be accurate, complete, or applicable to your specific
            situation.
          </p>
          <p>
            AI-generated content does not constitute a loan offer, rate
            commitment, pre-qualification, or pre-approval. Always verify
            important information directly with Sean Shallis before making
            financial decisions.
          </p>

          <h2>6. Rate Guardian Monitoring</h2>
          <p>
            Rate Guardian is a free monitoring service provided by{" "}
            {BRAND.entity}. By enrolling, you consent to receiving rate alerts,
            market updates, and periodic communications from Sean Shallis via
            email, SMS, or phone. You may opt out at any time by replying STOP
            to any text message, clicking unsubscribe in any email, or
            contacting us directly.
          </p>
          <p>
            Rate Guardian monitoring does not create a lending relationship,
            loan application, or commitment by {BRAND.bank}. Monitoring is
            provided as a courtesy and may be modified or discontinued at any
            time.
          </p>

          <h2>7. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Provide false or misleading information through our forms or chat
            </li>
            <li>
              Use the Site for any unlawful purpose or in violation of these
              Terms
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the Site or its
              systems
            </li>
            <li>
              Scrape, crawl, or systematically extract data from the Site without
              permission
            </li>
            <li>
              Interfere with or disrupt the Site&apos;s functionality
            </li>
          </ul>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on this Site — including text, graphics, logos, design,
            software, the Rosie AI system, the Guardian brand family, and the
            Savings Score methodology — is the intellectual property of{" "}
            {BRAND.entity} unless otherwise noted. You may not reproduce,
            distribute, or create derivative works without written permission.
          </p>
          <p>
            &ldquo;Guardian Family,&rdquo; &ldquo;Rate Guardian,&rdquo;
            &ldquo;Project Guardian,&rdquo; &ldquo;Trade Guardian,&rdquo;
            &ldquo;Health Guardian,&rdquo; &ldquo;Home Guardian,&rdquo; and
            &ldquo;Rosie&rdquo; are trademarks of {BRAND.entity}.
          </p>

          <h2>9. Third-Party Services</h2>
          <p>
            The Site integrates with third-party services including but not
            limited to: {BRAND.bank} (mortgage origination), Vercel (hosting),
            Clerk (authentication), and scheduling platforms. Your use of these
            services is subject to their respective terms and privacy policies.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {BRAND.entity} and Sean
            Shallis shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of the Site
            or reliance on any information provided through it, including but
            not limited to AI-generated content, rate monitoring alerts, or
            market commentary.
          </p>
          <p>
            The Site and its features are provided &ldquo;as is&rdquo; without
            warranties of any kind, either express or implied.
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {BRAND.entity}, Sean
            Shallis, and their affiliates from any claims, damages, or expenses
            arising from your use of the Site, violation of these Terms, or
            infringement of any third-party rights.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the State of New Jersey, without regard to its conflict of
            law provisions. Any disputes arising under these Terms shall be
            resolved in the courts of Morris County, New Jersey.
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes
            become effective upon posting to this page. Your continued use of
            the Site after changes are posted constitutes acceptance of the
            revised Terms.
          </p>

          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable, the
            remaining provisions shall continue in full force and effect.
          </p>

          <h2>15. Contact</h2>
          <p>
            Questions about these Terms should be directed to:
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
