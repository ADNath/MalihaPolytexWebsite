import clsx from "clsx";
import type { ReactNode } from "react";

type ContainerSize = "md" | "lg" | "xl" | "full";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}

export default function Container({
  children,
  className,
  size = "xl",
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-5xl": size === "md",
          "max-w-6xl": size === "lg",
          "max-w-7xl": size === "xl",
          "max-w-full": size === "full",
        },
        className
      )}
    >
      {children}
    </div>
  );
}