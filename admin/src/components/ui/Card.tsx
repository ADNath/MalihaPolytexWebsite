import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm",
        className
      )}
    >
      {title && (
        <div className="border-b bg-gray-50 px-6 py-4">
          <h2 className="font-semibold text-gray-800">
            {title}
          </h2>
        </div>
      )}

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}