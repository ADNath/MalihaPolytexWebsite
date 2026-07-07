import Container from "@/components/ui/Container";
import { Download } from "lucide-react";
import { companyProfile } from "../data/companyProfile";

export default function CompanyProfileSection() {
  return (
    <section className="bg-gray-50 py-8 lg:py-10">
      <Container size="xl">
        {/* Information Card */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Official Document
          </span>

          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            {companyProfile.title}
          </h2>

          <p className="mt-5 max-w-3xl leading-7 text-gray-600 sm:leading-8">
            {companyProfile.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={companyProfile.pdfUrl}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary/90 sm:w-auto"
            >
              <Download size={18} />
              Download PDF
            </a>

            <span className="text-center text-sm text-gray-500 sm:text-right">
              Last Updated: {companyProfile.updatedAt}
            </span>
          </div>
        </div>

        {/* PDF Viewer */}

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-3 sm:p-5 lg:p-6">
          <iframe
            src={companyProfile.pdfUrl}
            title={companyProfile.title}
            className="h-[500px] w-full rounded-xl sm:h-[700px] lg:h-[900px]"
          />
        </div>
      </Container>
    </section>
  );
}