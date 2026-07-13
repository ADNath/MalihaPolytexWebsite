import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600",

    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white border border-gray-600",

    success:
      "bg-green-600 hover:bg-green-700 text-white border border-green-600",

    danger:
      "bg-red-600 hover:bg-red-700 text-white border border-red-600",

    outline:
      "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}