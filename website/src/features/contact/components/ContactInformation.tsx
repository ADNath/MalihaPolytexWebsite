import { ArrowRight, Building2, Factory, MapPin, Phone } from "lucide-react";

import Container from "@/components/ui/Container";

import { contactDetails, contactInformation } from "../data/contactData";

export default function ContactInformation() {
  return (
    <section className="bg-white py-16">
      <Container size="xl">
        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </span>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">Reach Us</h2>

          <p className="mt-5 leading-8 text-gray-600">
            Whether you're visiting our office or contacting us online, our team
            is always ready to assist you.
          </p>
        </div>

        {/* Information Card */}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-12">
            {/* Left Side */}

            <div className="border-b border-gray-200 lg:col-span-5 lg:border-b-0 lg:border-r">
              {/* Corporate Office */}

              <div className="border-b border-gray-200 p-8">
                <div className="mb-5 flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />

                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Corporate Office
                  </h3>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary shrink-0" />

                  <div className="space-y-1 text-gray-600">
                    {contactInformation[0].address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <a
                  href={contactInformation[0].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3"
                >
                  View on Google Maps
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Factory */}

              <div className="p-8">
                <div className="mb-5 flex items-center gap-3">
                  <Factory className="h-6 w-6 text-primary" />

                  <h3 className="text-2xl font-bold text-gray-900">Factory</h3>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary shrink-0" />

                  <div className="space-y-1 text-gray-600">
                    {contactInformation[1].address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <a
                  href={contactInformation[1].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3"
                >
                  View on Google Maps
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Side */}

            <div className="lg:col-span-7 p-8">
              <div className="mb-8 flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />

                <h3 className="text-2xl font-bold text-gray-900">
                  Contact Information
                </h3>
              </div>

              {/* Telephone */}

              <div className="mb-8 border-b border-gray-100 pb-6">
                <h4 className="mb-3 font-semibold text-gray-900">Telephone</h4>

                <div className="grid grid-cols-1 gap-2 text-[15px] text-gray-600 sm:grid-cols-2 sm:gap-3">
                  {contactDetails.telephones.map((phone) => (
                    <p key={phone}>{phone}</p>
                  ))}
                </div>
              </div>

              {/* Mobile */}

              <div className="mb-8 border-b border-gray-100 pb-6">
                <h4 className="mb-3 font-semibold text-gray-900">Mobile</h4>

                <div className="grid grid-cols-1 gap-2 text-[15px] text-gray-600 sm:grid-cols-2 sm:gap-3">
                  {contactDetails.mobiles.map((phone) => (
                    <p key={phone}>{phone}</p>
                  ))}
                </div>
              </div>

              {/* Email */}

              <div className="mb-8 border-b border-gray-100 pb-6">
                <h4 className="mb-3 font-semibold text-gray-900">Email</h4>

                <p className="overflow-wrap-anywhere text-gray-600">
                  {contactDetails.email}
                </p>
              </div>

              {/* Office Hours */}

              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Office Hours
                </h4>

                <p className="text-gray-600">
                  {contactDetails.officeHours.days} (
                  {contactDetails.officeHours.time})
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
