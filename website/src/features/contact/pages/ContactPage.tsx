import PageHero from "@/components/common/PageHero";
import PageIntroduction from "@/features/about/components/PageIntroduction";

import GetInTouchSection from "../components/GetInTouchSection";
import ContactInformation from "../components/ContactInformation";
import usePageTitle from "@/hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact | Maliha Poly Tex Fiber Industry Ltd.");
  return (
    <>
      <PageHero
        title="Contact Us"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <PageIntroduction
        eyebrow="Contact"
        title="We're Here to Help"
        description="Whether you have a business inquiry, product question, partnership opportunity, or general feedback, our team is ready to assist you. Get in touch with us through any of the channels below."
      />

      <ContactInformation />

      <GetInTouchSection />
    </>
  );
}
