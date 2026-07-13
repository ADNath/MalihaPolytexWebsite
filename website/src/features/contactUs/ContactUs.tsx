import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";

import { getHomepageContacts } from "@/services/api/homepageContactApi";
import type { HomepageContactResponse } from "@/types/homepageContact";

import { contactData } from "./contactData";

export default function ContactUs() {
  const [contacts, setContacts] = useState<HomepageContactResponse[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadContacts() {
    try {
      setLoading(true);

      const response = await getHomepageContacts();

      if (response.success) {
        setContacts(
          response.data
            .filter((x) => x.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder),
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadContacts();
  }, []);

  if (loading) {
    return null;
  }

  const data = contactData.map((item) => ({
    ...item,
    lines: [...item.lines],
  }));

  const contact = contacts.find((x) => x.isActive);

  if (contact) {
    data[0].lines = contact.phones.map((phone) => ({
      text: phone,
      href: `tel:${phone.replace(/\s+/g, "")}`,
    }));

    data[1].lines = contact.emails.map((email) => ({
      text: email,
      href: `mailto:${email}`,
    }));
  }
  console.log(contacts);
  return (
    <section className="bg-gray-50 py-16">
      <Container size="xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-primary">
            Get in Touch
          </h2>

          <p className="mt-3 text-gray-600">
            Our team is always ready to assist you with your inquiries.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {data.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

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
                    ),
                  )}
                </div>

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
                      {item.actionLabel}
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
