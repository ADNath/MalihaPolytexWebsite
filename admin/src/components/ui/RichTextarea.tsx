import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

import clsx from "clsx";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const RichTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, rows = 6, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          {...props}
          className={clsx(
            "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition resize-y",
            "focus:border-blue-600",
            "min-h-[140px]",
            error && "border-red-500",
            className
          )}
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

RichTextarea.displayName = "RichTextarea";

export default RichTextarea;