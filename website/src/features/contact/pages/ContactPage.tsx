import PageHero from "@/components/common/PageHero";
import PageIntroduction from "@/features/about/components/PageIntroduction";

import GetInTouchSection from "../components/GetInTouchSection";
import ContactInformation from "../components/ContactInformation";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
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