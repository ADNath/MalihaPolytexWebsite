import clsx from "clsx";

interface Props {
  variant?: "success" | "danger" | "warning" | "info";
  children: React.ReactNode;
}

export default function Badge({
  variant = "info",
  children,
}: Props) {
  const variants = {
    success: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}