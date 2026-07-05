import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

import grsLogo from "@/assets/images/grs-logo.png";
// import worldMap from "@/assets/backgrounds/world-map.svg";
// import leaf from "@/assets/backgrounds/leaf.png";

import { companyOverviewData } from "./companyOverviewData";

export default function CompanyOverview() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* ===================== */}
      {/* Background Decoration */}
      {/* ===================== */}

      {/* Uncomment when assets are available */}

      {/* <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-10 h-[520px] w-[720px] bg-contain bg-no-repeat opacity-[0.04]"
          style={{ backgroundImage: `url(${worldMap})` }}
        />

        <div
          className="absolute bottom-0 right-0 h-72 w-72 bg-contain bg-no-repeat opacity-70"
          style={{ backgroundImage: `url(${leaf})` }}
        />
      </div> */}

      <Container size="xl" className="relative z-10">
        {/* ===================== */}
        {/* Company Profile */}
        {/* ===================== */}

        <div className="grid gap-14 lg:grid-cols-[5fr_6fr]">
          {/* Left */}

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              {companyOverviewData.subtitle}
            </span>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-900 lg:text-[44px]">
              {companyOverviewData.title}
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              {companyOverviewData.description}
            </p>

            <div className="mt-10">
              <Button>
                {companyOverviewData.buttonText}
              </Button>
            </div>
          </div>

          {/* Right */}

          <div className="grid border border-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0 divide-y divide-gray-100">
            {companyOverviewData.features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="p-8"
                >
                  <Icon
                    className="mb-5 h-12 w-12 text-primary"
                    strokeWidth={1.7}
                  />

                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}

        <div className="my-20 h-px bg-gray-200" />

        {/* ===================== */}
        {/* Certificate */}
        {/* ===================== */}

        <div className="grid items-center gap-10 lg:grid-cols-[170px_1fr_auto]">
          {/* Logo */}

          <div className="flex justify-center lg:justify-start">
            <img
              src={grsLogo}
              alt="GRS Certificate"
              className="max-h-50 object-contain"
            />
          </div>

          {/* Content */}

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              {companyOverviewData.certificate.subtitle}
            </span>

            <h3 className="mt-3 text-3xl font-bold text-gray-900">
              {companyOverviewData.certificate.title}
            </h3>

            <p className="mt-5 max-w-2xl leading-8 text-gray-600">
              {companyOverviewData.certificate.description}
            </p>
          </div>

          {/* Button */}

          <div className="flex justify-center lg:justify-end">
            <Button icon={<ArrowRight className="h-5 w-5" />}>
              {companyOverviewData.certificate.buttonText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}