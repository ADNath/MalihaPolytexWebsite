import Container from "@/components/ui/Container";
import { contactData } from "./contactData";

export default function ContactUs() {
  return (
    <section className="bg-gray-50 py-20">
      <Container size="xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-primary">
            Need More Information?
          </h2>

          <p className="mt-4 text-gray-600">
            Our team is always ready to assist you with your inquiries.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {contactData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* Content */}
                <div className="space-y-3">
                  {item.lines.map((line) =>
                    line.href ? (
                      <a
                        key={line.text}
                        href={line.href}
                        className="block text-lg font-medium text-gray-800 transition-colors hover:text-primary"
                      >
                        {line.text}
                      </a>
                    ) : (
                      <p
                        key={line.text}
                        className="text-lg leading-8 text-gray-700"
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
                      className="mt-8 inline-flex font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {item.actionLabel}
                    </a>
                  ) : (
                    <p className="mt-8 text-sm text-gray-500">
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