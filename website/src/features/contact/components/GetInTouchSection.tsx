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
            Have a business inquiry or product question? Fill out the contact
            form below or visit our corporate office. We'd love to hear from
            you.
          </p>
        </div>

        {/* Content */}

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Map */}

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <iframe
                title="Corporate Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1824.2869278302653!2d90.3871646556515!3d23.86926152920386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c41a7accf0e1%3A0x947d1c890d457aa6!2sMALIHA%20POLYT%20TEX%20FIBER%20INDUSTRY%20LIMITED!5e0!3m2!1sen!2sbd!4v1783421225935!5m2!1sen!2sbd"
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
