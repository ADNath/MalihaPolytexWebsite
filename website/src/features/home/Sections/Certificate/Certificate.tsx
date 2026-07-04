import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { certificateData } from "./certificateData";

export default function Certificate() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[260px_1fr]">
          <div className="flex justify-center">
            <img
              src={certificateData.logo}
              alt="GRS Logo"
              className="max-h-36 object-contain"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {certificateData.subtitle}
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              {certificateData.title}
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-gray-600">
              {certificateData.description}
            </p>

            <div className="mt-8">
              <Button>{certificateData.buttonText}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
