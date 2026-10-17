import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ECTO India collects, uses and protects the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="17 October 2026">
      <p>
        This policy explains how {site.name} handles personal information collected through
        ectoindia.com.
      </p>

      <h2>What we collect</h2>
      <p>
        When you join as an early rider, we collect your name, mobile number and city. When you request
        driver early access, we also collect whether you drive an auto or an e-rickshaw, and whether you
        own it or drive on rent. We do not collect payment details through this website.
      </p>

      <h2>Why we collect it</h2>
      <p>
        We use this information only to contact you about ECTO early access and trials, and to understand
        interest in each city.
      </p>

      <h2>How it is handled</h2>
      <p>
        Form submissions are sent by email to {site.contactEmail}. This website does not keep them in a
        separate database. Email delivery is handled by Resend, and the website is hosted by Vercel, which
        may process technical data such as IP addresses to deliver the service.
      </p>

      <h2>Sharing</h2>
      <p>We do not sell your personal information. We share it only with service providers needed to run this website, or where the law requires.</p>

      <h2>How long we keep it</h2>
      <p>[TO CONFIRM: retention period, for example “until early access in your city has opened, or 12 months, whichever is earlier”.]</p>

      <h2>Your choices</h2>
      <p>
        You can ask us to correct or delete your information, or withdraw your consent to be contacted, by
        writing to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>

      <h2>Cookies and analytics</h2>
      <p>[TO CONFIRM: describe analytics and cookies once Google Analytics or any tracking is added. At present this website sets no tracking cookies.]</p>

      <h2>Contact</h2>
      <p>
        {site.name}, <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        [TO CONFIRM: registered address and grievance contact, if required.]
      </p>
    </LegalLayout>
  );
}