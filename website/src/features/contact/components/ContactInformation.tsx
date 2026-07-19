import { useEffect, useMemo, useState } from "react";

import {
  ArrowRight,
  Building2,
  Factory,
  MapPin,
  Phone,
} from "lucide-react";

import Container from "@/components/ui/Container";

import type { HomepageContactResponse } from "@/types/homepageContact";
import { getHomepageContacts } from "@/services/api/homepageContactApi";

export default function ContactInformation() {
  const [contacts, setContacts] = useState<HomepageContactResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);

        const response = await getHomepageContacts();

        if (response.success) {
          setContacts(
            (response.data ?? [])
              .filter((x) => x.isActive)
              .sort((a, b) => a.displayOrder - b.displayOrder),
          );
        }
      } finally {
        setLoading(false);
      }
    };

    void loadContacts();
  }, []);

  const primaryContact = useMemo(
    () => contacts[0] ?? null,
    [contacts],
  );

  const telephoneNumbers = useMemo(() => {
    if (!primaryContact) return [];

    return primaryContact.phones.filter(
      (phone) =>
        phone.includes("02") ||
        phone.includes("021") ||
        phone.includes("550"),
    );
  }, [primaryContact]);

  const mobileNumbers = useMemo(() => {
    if (!primaryContact) return [];

    return primaryContact.phones.filter(
      (phone) => !telephoneNumbers.includes(phone),
    );
  }, [primaryContact, telephoneNumbers]);

  if (loading) {
    return (
      <section className="bg-white py-16">
        <Container size="xl">
          <div className="py-20 text-center text-gray-500">
            Loading contact information...
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <Container size="xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </span>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Reach Us
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Whether you're visiting our office or contacting us online, our team
            is always ready to assist you.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-12">
            {/* Left Side */}

            <div className="border-b border-gray-200 lg:col-span-5 lg:border-b-0 lg:border-r">
              {contacts.map((contact, index) => {
                const isFactory = contact.title
                  .toLowerCase()
                  .includes("factory");

                const Icon = isFactory ? Factory : Building2;

                return (
                  <div
                    key={contact.homepageContactId}
                    className={
                      index !== contacts.length - 1
                        ? "border-b border-gray-200 p-8"
                        : "p-8"
                    }
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />

                      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {contact.title}
                      </h3>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />

                      <div className="space-y-1 text-gray-600">
                        {contact.address
                          .split(/\r?\n/)
                          .filter(Boolean)
                          .map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                      </div>
                    </div>

                    {contact.mapUrl && (
                      <a
                        href={contact.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                      >
                        View on Google Maps
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side */}

            <div className="p-8 lg:col-span-7">
              <div className="mb-8 flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />

                <h3 className="text-2xl font-bold text-gray-900">
                  Contact Information
                </h3>
              </div>

              <div className="mb-8 border-b border-gray-100 pb-6">
                <h4 className="mb-3 font-semibold text-gray-900">
                  Telephone
                </h4>

                <div className="grid grid-cols-1 gap-2 text-[15px] text-gray-600 sm:grid-cols-3 sm:gap-3">
                  {telephoneNumbers.map((phone) => (
                    <p key={phone}>{phone}</p>
                  ))}
                </div>
              </div>

              <div className="mb-8 border-b border-gray-100 pb-6">
                <h4 className="mb-3 font-semibold text-gray-900">
                  Mobile
                </h4>

                <div className="grid grid-cols-1 gap-2 text-[15px] text-gray-600 sm:grid-cols-3 sm:gap-3">
                  {mobileNumbers.map((phone) => (
                    <p key={phone}>{phone}</p>
                  ))}
                </div>
              </div>

              <div className="mb-8 border-b border-gray-100 pb-6">
                <h4 className="mb-3 font-semibold text-gray-900">
                  Email
                </h4>

                <div className="space-y-2 text-gray-600">
                  {primaryContact?.emails.map((email) => (
                    <p
                      key={email}
                      className="overflow-wrap-anywhere"
                    >
                      {email}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Office Hours
                </h4>

                <p className="text-gray-600">
                  {primaryContact?.officeHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}