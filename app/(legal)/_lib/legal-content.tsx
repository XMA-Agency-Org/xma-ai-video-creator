import { type ReactNode } from "react";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageContent = {
  title: string;
  effectiveDate: string;
  subtitle: string;
  sections: LegalSection[];
};

function P({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-base leading-relaxed text-foreground/80">
      {children}
    </p>
  );
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-5 ml-6 list-disc space-y-2 text-foreground/80">
      {children}
    </ul>
  );
}

function LI({ children }: { children: ReactNode }) {
  return <li className="text-base leading-relaxed">{children}</li>;
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary-500 underline decoration-primary-300 underline-offset-2 transition-colors hover:text-primary-600 hover:decoration-primary-500"
    >
      {children}
    </a>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-foreground">{children}</strong>;
}

export const PRIVACY_POLICY_CONTENT: LegalPageContent = {
  title: "Privacy Policy",
  effectiveDate: "April 14, 2026",
  subtitle:
    "This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
          <P>
            XLUXIVE DIGITAL MARKETING LLC, trading as{" "}
            <Strong>XMA Agency</Strong> (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), operates this website and provides AI-powered video
            production and digital marketing services. We are registered in
            Dubai, United Arab Emirates.
          </P>
          <P>
            This Privacy Policy applies to all information collected through our
            website, booking processes, payment transactions, and any related
            communications. By using our website or engaging our services, you
            acknowledge that you have read and understood this policy.
          </P>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <>
          <P>
            We collect different types of information depending on how you
            interact with our website and services:
          </P>
          <P>
            <Strong>Personal Information You Provide</Strong>
          </P>
          <UL>
            <LI>
              Name, email address, and phone number when you book a consultation
              call or contact us
            </LI>
            <LI>
              Business name and project details shared during consultations
            </LI>
            <LI>
              Any files, brand assets, or creative materials you provide for
              video production
            </LI>
          </UL>
          <P>
            <Strong>Payment Information</Strong>
          </P>
          <UL>
            <LI>
              Payments are processed securely through{" "}
              <A href="https://stripe.com/privacy">Stripe</A>. We do not store
              your credit card numbers, bank account details, or other sensitive
              financial information on our servers. Stripe handles all payment
              data in accordance with PCI-DSS standards.
            </LI>
          </UL>
          <P>
            <Strong>Automatically Collected Information</Strong>
          </P>
          <UL>
            <LI>
              Device information (browser type, operating system, screen
              resolution)
            </LI>
            <LI>
              Usage data (pages visited, time spent on pages, click interactions)
            </LI>
            <LI>IP address and approximate geographic location</LI>
            <LI>Referral source (how you arrived at our website)</LI>
          </UL>
        </>
      ),
    },
    {
      id: "how-we-use-your-information",
      title: "3. How We Use Your Information",
      content: (
        <>
          <P>We use the information we collect to:</P>
          <UL>
            <LI>
              Deliver and manage our video production and digital marketing
              services
            </LI>
            <LI>
              Communicate with you about your projects, bookings, and inquiries
            </LI>
            <LI>Process payments and send transaction confirmations</LI>
            <LI>
              Analyze website usage to improve our services and user experience
            </LI>
            <LI>
              Measure the effectiveness of our advertising campaigns across
              platforms
            </LI>
            <LI>
              Send marketing communications about our services (only with your
              consent, and you may opt out at any time)
            </LI>
          </UL>
        </>
      ),
    },
    {
      id: "cookies-and-tracking",
      title: "4. Cookies and Tracking Technologies",
      content: (
        <>
          <P>
            Our website uses cookies and similar tracking technologies to enhance
            your experience and analyze site performance. The following services
            are active on our website:
          </P>
          <P>
            <Strong>PostHog (Analytics)</Strong>
          </P>
          <UL>
            <LI>
              We use PostHog to understand how visitors interact with our
              website, including page views, navigation patterns, and feature
              usage. This helps us improve the user experience.
            </LI>
          </UL>
          <P>
            <Strong>Meta Pixel (Facebook/Instagram)</Strong>
          </P>
          <UL>
            <LI>
              Used to measure the effectiveness of our advertising on Meta
              platforms and to deliver relevant ads to visitors who have
              previously interacted with our website.
            </LI>
          </UL>
          <P>
            <Strong>Google Ads Conversion Tracking</Strong>
          </P>
          <UL>
            <LI>
              Used to measure conversions from Google Ads campaigns and optimize
              ad delivery to reach people who are likely interested in our
              services.
            </LI>
          </UL>
          <P>
            <Strong>TikTok Pixel</Strong>
          </P>
          <UL>
            <LI>
              Used to track conversions from TikTok advertising campaigns and
              improve ad targeting on the TikTok platform.
            </LI>
          </UL>
          <P>
            <Strong>Managing Cookies</Strong>
          </P>
          <P>
            You can control cookies through your browser settings. Most browsers
            allow you to block or delete cookies. However, disabling cookies may
            affect certain features of our website. You can also opt out of
            interest-based advertising through your device settings or the
            advertising platforms directly.
          </P>
        </>
      ),
    },
    {
      id: "third-party-services",
      title: "5. Third-Party Services",
      content: (
        <>
          <P>
            We rely on trusted third-party services to operate our website and
            deliver our services. These providers may process your data in
            accordance with their own privacy policies:
          </P>
          <UL>
            <LI>
              <A href="https://stripe.com/privacy">Stripe</A> &mdash; Payment
              processing
            </LI>
            <LI>
              <A href="https://posthog.com/privacy">PostHog</A> &mdash;
              Website analytics
            </LI>
            <LI>
              <A href="https://www.facebook.com/privacy/policy/">Meta</A>{" "}
              &mdash; Advertising and conversion tracking
            </LI>
            <LI>
              <A href="https://policies.google.com/privacy">Google</A> &mdash;
              Advertising and conversion tracking
            </LI>
            <LI>
              <A href="https://www.tiktok.com/legal/privacy-policy">TikTok</A>{" "}
              &mdash; Advertising and conversion tracking
            </LI>
          </UL>
          <P>
            We encourage you to review the privacy policies of these services to
            understand how they handle your data.
          </P>
        </>
      ),
    },
    {
      id: "data-sharing",
      title: "6. Data Sharing",
      content: (
        <>
          <P>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information only in the following
            circumstances:
          </P>
          <UL>
            <LI>
              <Strong>Service Providers:</Strong> With trusted third-party
              services that help us operate our website and deliver our services
              (as listed in Section 5)
            </LI>
            <LI>
              <Strong>Legal Requirements:</Strong> When required by law, court
              order, or governmental regulation
            </LI>
            <LI>
              <Strong>Business Transfers:</Strong> In connection with a merger,
              acquisition, or sale of assets, your information may be transferred
              as part of that transaction
            </LI>
          </UL>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      content: (
        <>
          <P>
            We retain your personal information only for as long as necessary to
            fulfill the purposes for which it was collected, including to satisfy
            legal, accounting, or reporting requirements. When your data is no
            longer needed, we will securely delete or anonymize it.
          </P>
          <UL>
            <LI>
              <Strong>Project data:</Strong> Retained for the duration of the
              client relationship and a reasonable period thereafter for
              portfolio and reference purposes
            </LI>
            <LI>
              <Strong>Payment records:</Strong> Retained as required by
              applicable financial regulations
            </LI>
            <LI>
              <Strong>Analytics data:</Strong> Retained in accordance with each
              analytics provider&apos;s data retention policies
            </LI>
          </UL>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "8. Your Rights",
      content: (
        <>
          <P>
            In accordance with the UAE Federal Decree-Law No. 45 of 2021 on the
            Protection of Personal Data (PDPL) and applicable data protection
            principles, you have the right to:
          </P>
          <UL>
            <LI>
              <Strong>Access</Strong> the personal data we hold about you
            </LI>
            <LI>
              <Strong>Correct</Strong> inaccurate or incomplete personal data
            </LI>
            <LI>
              <Strong>Delete</Strong> your personal data, subject to legal
              retention requirements
            </LI>
            <LI>
              <Strong>Object</Strong> to the processing of your personal data
              for marketing purposes
            </LI>
            <LI>
              <Strong>Opt out</Strong> of marketing communications at any time
            </LI>
          </UL>
          <P>
            To exercise any of these rights, please contact us using the details
            provided in Section 12 below.
          </P>
        </>
      ),
    },
    {
      id: "international-data-transfers",
      title: "9. International Data Transfers",
      content: (
        <P>
          Our third-party service providers may process your data on servers
          located outside the United Arab Emirates. By using our website and
          services, you acknowledge that your data may be transferred to and
          processed in countries with different data protection laws. We take
          reasonable steps to ensure that your data remains protected in
          accordance with this Privacy Policy regardless of where it is
          processed.
        </P>
      ),
    },
    {
      id: "childrens-privacy",
      title: "10. Children's Privacy",
      content: (
        <P>
          Our website and services are not directed at individuals under the age
          of 18. We do not knowingly collect personal information from children.
          If you believe that we have inadvertently collected data from a minor,
          please contact us immediately and we will take steps to delete that
          information.
        </P>
      ),
    },
    {
      id: "changes-to-this-policy",
      title: "11. Changes to This Policy",
      content: (
        <P>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, services, or legal requirements. When we make
          changes, we will update the &quot;Effective Date&quot; at the top of
          this page. We encourage you to review this policy periodically. Your
          continued use of our website after any changes constitutes your
          acceptance of the updated policy.
        </P>
      ),
    },
    {
      id: "contact-us",
      title: "12. Contact Us",
      content: (
        <>
          <P>
            If you have questions about this Privacy Policy or wish to exercise
            your data protection rights, please contact us:
          </P>
          <UL>
            <LI>
              <Strong>Company:</Strong> XLUXIVE DIGITAL MARKETING LLC (trading
              as XMA Agency)
            </LI>
            <LI>
              <Strong>Email:</Strong>{" "}
              <A href="mailto:admin@xmaagency.com">admin@xmaagency.com</A>
            </LI>
            <LI>
              <Strong>Phone:</Strong>{" "}
              <A href="tel:+971503636856">+971 50 363 6856</A>
            </LI>
            <LI>
              <Strong>Address:</Strong> M44, The Curve Building, Al Qouz 3,
              Dubai, UAE
            </LI>
          </UL>
        </>
      ),
    },
  ],
};

export const TERMS_OF_SERVICE_CONTENT: LegalPageContent = {
  title: "Terms of Service",
  effectiveDate: "April 14, 2026",
  subtitle:
    "These Terms of Service govern your use of our website and engagement of our services. Please read them carefully before proceeding.",
  sections: [
    {
      id: "acceptance-of-terms",
      title: "1. Acceptance of Terms",
      content: (
        <>
          <P>
            These Terms of Service (&quot;Terms&quot;) constitute a legally
            binding agreement between you (&quot;Client,&quot; &quot;you,&quot;
            or &quot;your&quot;) and XLUXIVE DIGITAL MARKETING LLC, trading as{" "}
            <Strong>XMA Agency</Strong> (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), a company registered in Dubai, United Arab
            Emirates.
          </P>
          <P>
            By accessing our website, booking a consultation, or engaging our
            services, you acknowledge that you have read, understood, and agree
            to be bound by these Terms. If you do not agree with any part of
            these Terms, please do not use our website or services.
          </P>
        </>
      ),
    },
    {
      id: "description-of-services",
      title: "2. Description of Services",
      content: (
        <>
          <P>XMA Agency provides the following services:</P>
          <UL>
            <LI>
              AI-powered video production (strategy, scriptwriting, production,
              editing, and delivery)
            </LI>
            <LI>
              Paid advertising management (Meta, TikTok, Google platforms)
            </LI>
            <LI>Social media management and content strategy</LI>
            <LI>Branding and identity design</LI>
            <LI>Web development</LI>
            <LI>CRM setup and lead generation</LI>
            <LI>Brand and funnel audits</LI>
          </UL>
          <P>
            The specific scope, deliverables, and timeline for each project are
            agreed upon during the consultation process and confirmed before
            production begins.
          </P>
        </>
      ),
    },
    {
      id: "booking-and-consultation",
      title: "3. Booking and Consultation",
      content: (
        <>
          <P>
            All services begin with a consultation call. During this call, we
            discuss your requirements, goals, and project scope. No work
            commences until both parties have agreed on the scope and terms of
            the engagement.
          </P>
          <P>
            By booking a consultation, you are not committing to purchase any
            services. The consultation is an opportunity for both parties to
            determine whether a working relationship is a good fit.
          </P>
        </>
      ),
    },
    {
      id: "payment-terms",
      title: "4. Payment Terms",
      content: (
        <>
          <P>
            All services require prepayment before work begins. We operate on a
            pay-as-you-go model with no credit extended to clients. Key payment
            terms include:
          </P>
          <UL>
            <LI>
              Full payment is required before production commences unless
              otherwise agreed in writing
            </LI>
            <LI>
              Pricing is based on the agreed service package discussed during
              consultation
            </LI>
            <LI>
              Payments are processed securely through Stripe. We do not store
              your payment card details.
            </LI>
            <LI>All prices are quoted in USD unless otherwise specified</LI>
          </UL>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      content: (
        <>
          <P>
            Upon receipt of full payment, the Client receives complete usage
            rights to all produced assets and deliverables for the agreed
            project.
          </P>
          <P>
            XMA Agency retains the right to use completed work in our portfolio,
            case studies, and marketing materials for the purpose of showcasing
            our capabilities, unless a separate confidentiality agreement states
            otherwise.
          </P>
          <P>
            Any pre-existing intellectual property, proprietary tools, templates,
            or AI models used in the production process remain the property of
            XMA Agency.
          </P>
        </>
      ),
    },
    {
      id: "client-responsibilities",
      title: "6. Client Responsibilities",
      content: (
        <>
          <P>To ensure smooth project delivery, Clients agree to:</P>
          <UL>
            <LI>
              Provide accurate and complete creative briefs, brand guidelines,
              and project requirements
            </LI>
            <LI>
              Supply all necessary assets, materials, and permissions in a timely
              manner
            </LI>
            <LI>
              Respond to feedback requests and review deliverables within agreed
              timeframes
            </LI>
            <LI>
              Review and approve all content before it is published or
              distributed publicly
            </LI>
            <LI>
              Ensure that all materials provided to us do not infringe on any
              third-party intellectual property rights
            </LI>
          </UL>
          <P>
            Delays caused by late provision of materials or feedback may affect
            project timelines. We will communicate any schedule impacts promptly.
          </P>
        </>
      ),
    },
    {
      id: "refund-and-cancellation",
      title: "7. Refund and Cancellation",
      content: (
        <>
          <P>
            Refund and cancellation requests are handled on a case-by-case basis
            at the discretion of XMA Agency. Factors considered include:
          </P>
          <UL>
            <LI>The stage of production at the time of the request</LI>
            <LI>Resources and time already invested in the project</LI>
            <LI>Whether deliverables have already been provided</LI>
          </UL>
          <P>
            To request a refund or cancellation, please contact us at{" "}
            <A href="mailto:admin@xmaagency.com">admin@xmaagency.com</A> as
            early as possible. We will work with you to reach a fair resolution.
          </P>
        </>
      ),
    },
    {
      id: "confidentiality",
      title: "8. Confidentiality",
      content: (
        <>
          <P>
            Both parties agree to maintain the confidentiality of any
            proprietary or sensitive information exchanged during the course of
            the engagement. This includes but is not limited to business
            strategies, marketing plans, brand assets, and financial information.
          </P>
          <P>
            Confidentiality obligations survive the termination of the service
            agreement. If a formal Non-Disclosure Agreement (NDA) is required,
            this can be arranged upon request prior to sharing sensitive
            materials.
          </P>
        </>
      ),
    },
    {
      id: "limitation-of-liability",
      title: "9. Limitation of Liability",
      content: (
        <>
          <P>
            To the maximum extent permitted by applicable law, XMA Agency shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages arising out of or related to the use of our
            website or services.
          </P>
          <P>
            Our total liability for any claim arising from our services shall not
            exceed the total amount paid by the Client for the specific service
            giving rise to the claim.
          </P>
        </>
      ),
    },
    {
      id: "disclaimer-of-warranties",
      title: "10. Disclaimer of Warranties",
      content: (
        <>
          <P>
            Our services are provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. While we strive to deliver high-quality work,
            we do not guarantee specific outcomes, results, or return on
            investment from our services.
          </P>
          <P>
            We make no warranties, express or implied, regarding the
            merchantability, fitness for a particular purpose, or
            non-infringement of our services, except as expressly set forth in
            the agreed project scope.
          </P>
        </>
      ),
    },
    {
      id: "third-party-links",
      title: "11. Third-Party Links",
      content: (
        <P>
          Our website may contain links to third-party websites or services that
          are not owned or controlled by XMA Agency. We are not responsible for
          the content, privacy policies, or practices of any third-party
          websites. We encourage you to review the terms and policies of any
          third-party site you visit.
        </P>
      ),
    },
    {
      id: "governing-law",
      title: "12. Governing Law",
      content: (
        <P>
          These Terms shall be governed by and construed in accordance with the
          laws of the United Arab Emirates. Any disputes arising out of or in
          connection with these Terms shall be subject to the exclusive
          jurisdiction of the courts of Dubai, UAE.
        </P>
      ),
    },
    {
      id: "severability",
      title: "13. Severability",
      content: (
        <P>
          If any provision of these Terms is found to be invalid or
          unenforceable by a court of competent jurisdiction, the remaining
          provisions shall continue in full force and effect. The invalid or
          unenforceable provision shall be modified to the minimum extent
          necessary to make it valid and enforceable.
        </P>
      ),
    },
    {
      id: "changes-to-terms",
      title: "14. Changes to Terms",
      content: (
        <P>
          We reserve the right to modify these Terms at any time. When we make
          changes, we will update the &quot;Effective Date&quot; at the top of
          this page. Your continued use of our website or services after changes
          are posted constitutes your acceptance of the updated Terms. We
          encourage you to review these Terms periodically.
        </P>
      ),
    },
    {
      id: "contact-us",
      title: "15. Contact Us",
      content: (
        <>
          <P>
            If you have questions about these Terms of Service, please contact
            us:
          </P>
          <UL>
            <LI>
              <Strong>Company:</Strong> XLUXIVE DIGITAL MARKETING LLC (trading
              as XMA Agency)
            </LI>
            <LI>
              <Strong>Email:</Strong>{" "}
              <A href="mailto:admin@xmaagency.com">admin@xmaagency.com</A>
            </LI>
            <LI>
              <Strong>Phone:</Strong>{" "}
              <A href="tel:+971503636856">+971 50 363 6856</A>
            </LI>
            <LI>
              <Strong>Address:</Strong> M44, The Curve Building, Al Qouz 3,
              Dubai, UAE
            </LI>
          </UL>
        </>
      ),
    },
  ],
};
