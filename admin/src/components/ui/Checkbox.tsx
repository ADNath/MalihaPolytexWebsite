import clsx from "clsx";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            ref={ref}
            type="checkbox"
            {...props}
            className={clsx(
              "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
              className
            )}
          />

          {label && (
            <span className="text-sm text-gray-700">
              {label}
            </span>
          )}
        </label>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;