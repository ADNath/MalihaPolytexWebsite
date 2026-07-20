import clsx from "clsx";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  columns?: 1 | 2 | 3 | 4;
  gap?: 4 | 5 | 6 | 8;
  className?: string;
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 lg:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

const gapClasses = {
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
};

export default function FormGrid({
  children,
  columns = 2,
  gap = 5,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "grid",
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}