import Container from "@/components/ui/Container";
import InquiryForm from "./InquiryForm";

export default function GetInTouchSection() {
  return (
    <section className="bg-gray-50 py-16">
      <Container size="xl">
        {/* Heading */}

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-[0.2em] text-primary">
            Contact Us
          </span>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            We're here to help
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Have a business inquiry  or product
            question? Fill out the contact form below or visit our corporate
            office. We'd love to hear from you.
          </p>
        </div>

        {/* Content */}

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Map */}

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <iframe
                title="Corporate Office"
                src="https://www.google.com/maps?q=House+12,+Road+14,+Sector+13,+Uttara,+Dhaka&output=embed"
                className="h-[620px] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}

          <div className="lg:col-span-5">
            <InquiryForm />
          </div>
        </div>
      </Container>
    </section>
  );
}