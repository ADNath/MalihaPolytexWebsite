import Container from "@/components/ui/Container";

interface PageIntroductionProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export default function PageIntroduction({
  eyebrow,
  title,
  description,
}: PageIntroductionProps) {
  return (
    <section className="py-5 lg:py-8">
      <Container size="lg">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </span>
          )}

          <h2 className="mt-3 text-3xl font-bold text-gray-900 lg:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}