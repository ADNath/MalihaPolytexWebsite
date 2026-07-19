import {
  forwardRef,
  type SelectHTMLAttributes,
} from "react";

import clsx from "clsx";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<
  HTMLSelectElement,
  Props
>(
  (
    {
      label,
      error,
      options,
      placeholder = "Select...",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={clsx(
            "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-200",
            className,
          )}
          {...props}
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;