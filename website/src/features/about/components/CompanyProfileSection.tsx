import Container from "@/components/ui/Container";
import { Download } from "lucide-react";
import { companyProfile } from "../data/companyProfile";

export default function CompanyProfileSection() {
  return (
    <section className="bg-gray-50 py-5 lg:py-5">
      <Container size="xl">
        {/* Information Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 lg:p-10">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Official Document
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {companyProfile.title}
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-gray-600">
            {companyProfile.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <a
              href={companyProfile.pdfUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary/90"
            >
              <Download size={18} />
              Download PDF
            </a>

            <span className="text-sm text-gray-500">
              Last Updated: {companyProfile.updatedAt}
            </span>
          </div>
        </div>

        {/* PDF Viewer */}

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <iframe
            src={companyProfile.pdfUrl}
            title={companyProfile.title}
            className="h-[900px] w-full rounded-xl"
          />
        </div>
      </Container>
    </section>
  );
}