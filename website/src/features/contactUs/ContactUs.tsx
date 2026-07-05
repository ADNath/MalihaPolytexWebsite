import Container from "@/components/ui/Container";
import { contactData } from "./contactData";

export default function ContactUs() {
  return (
    <section className="py-14">
      {/* Use xl instead of lg */}
      <Container size="xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-[0.15em] text-primary">
          Need More Information?
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {contactData.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                className="
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-shadow
                  hover:shadow-md
                "
              >
                {/* Icon */}

                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Text */}

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-base font-medium text-gray-800">
                    {item.value}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}