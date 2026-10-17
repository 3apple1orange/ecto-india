import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms for using the ECTO India website.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalLayout title="Terms and Conditions" updated="17 October 2026">
      <p>
        These terms apply to your use of ectoindia.com, operated by {site.name}. By using the website you
        agree to them.
      </p>

      <h2>About this website</h2>
      <p>
        This website describes ECTO India, a mobility platform for autos and e-rickshaws being developed
        for Tier 2 and Tier 3 Indian cities. It lets riders join as early riders and drivers request early
        access.
      </p>

      <h2>Trial status</h2>
      <p>
        ECTO is currently on trial in selected cities. Joining as an early rider or requesting driver early
        access does not guarantee a ride, access to the app, or availability in your city. Separate terms
        may apply to the ECTO app when it is made publicly available.
      </p>

      <h2>Your information</h2>
      <p>You agree to give accurate details when you submit a form. How we handle them is described in our <a href="/privacy">Privacy Policy</a>.</p>

      <h2>Intellectual property</h2>
      <p>The ECTO name, logo, text and design on this website belong to {site.name} or its licensors. Please do not copy or reuse them without permission.</p>

      <h2>Liability</h2>
      <p>
        We try to keep this website accurate and available, but it is provided as is. To the extent the law
        allows, we are not liable for losses arising from using it. [TO CONFIRM: wording to be finalised by
        legal counsel.]
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. [TO CONFIRM: jurisdiction and courts.]</p>

      <h2>Contact</h2>
      <p><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
    </LegalLayout>
  );
}