import Container from "@/components/ui/Container";
import { contactData } from "./contactData";

export default function ContactUs() {
  return (
    <section className="bg-gray-50 py-16">
      <Container size="xl">
        {/* Section Header */}

        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-primary">
            Get in Touch
          </h2>

          <p className="mt-3 text-gray-600">
            Our team is always ready to assist you with your inquiries.
          </p>
        </div>

        {/* Contact Cards */}

        <div className="grid gap-6 lg:grid-cols-3">
          {contactData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
              >
                {/* Icon */}

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Title */}

                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* Content */}

                <div className="space-y-2">
                  {item.lines.map((line) =>
                    line.href ? (
                      <a
                        key={line.text}
                        href={line.href}
                        className="block text-base font-medium text-gray-800 transition-colors hover:text-primary"
                      >
                        {line.text}
                      </a>
                    ) : (
                      <p
                        key={line.text}
                        className="text-base leading-7 text-gray-700"
                      >
                        {line.text}
                      </p>
                    )
                  )}
                </div>

                {/* Footer */}

                {item.actionLabel &&
                  (item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      {item.actionLabel} →
                    </a>
                  ) : (
                    <p className="mt-5 text-sm text-gray-500">
                      {item.actionLabel}
                    </p>
                  ))}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}