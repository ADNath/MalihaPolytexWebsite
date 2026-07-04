import clsx from "clsx";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={clsx(center && "text-center")}>
      {eyebrow && (
        <p
          className={clsx(
            "mb-3 text-sm font-semibold uppercase tracking-[0.3em]",
            light ? "text-green-300" : "text-green-700"
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={clsx(
          "text-4xl font-bold lg:text-5xl",
          light ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={clsx(
            "mt-6 max-w-3xl text-lg leading-8",
            light ? "text-gray-200" : "text-gray-600",
            center && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}