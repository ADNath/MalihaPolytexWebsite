import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
}

export default function PageHero({
  title,
  breadcrumbs,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gray-50"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px]" />
      )}

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,#16a34a20,transparent_70%)]" />
      </div>

      <Container size="xl">
        <div className="relative flex min-h-[220px] flex-col justify-center py-10">
          {/* Breadcrumb */}

          <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-primary">
                    {item.label}
                  </span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            ))}
          </nav>

          {/* Title */}

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            {title}
          </h1>

          {/* Accent Line */}

          <div className="mt-5 h-1 w-20 rounded-full bg-primary" />
        </div>
      </Container>
    </section>
  );
}