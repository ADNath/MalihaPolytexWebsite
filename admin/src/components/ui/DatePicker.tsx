import clsx from "clsx";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const DatePicker = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type="date"
          {...props}
          className={clsx(
            "h-11 w-full rounded-lg border border-gray-300 px-3 outline-none transition",
            "focus:border-blue-600",
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

DatePicker.displayName = "DatePicker";

export default DatePicker;