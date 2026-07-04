import { Link } from "react-router-dom";
import clsx from "clsx";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "secondary";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  children,
  to,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition-all duration-300",
    {
      "bg-green-700 text-white hover:bg-green-800 hover:-translate-y-0.5 hover:shadow-lg":
        variant === "primary",

      "border border-white text-white hover:bg-white hover:text-black":
        variant === "outline",

      "bg-gray-100 text-gray-900 hover:bg-gray-200":
        variant === "secondary",
    },
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}