import clsx from "clsx";

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
  large?: boolean;
}

export default function FilterChip({
  label,
  active,
  onClick,
  large = false,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-xl border font-medium transition-all duration-200",

        large
          ? "px-6 py-3 text-sm"
          : "px-4 py-2 text-sm",

        active
          ? "border-green-700 bg-green-700 text-white shadow-sm"
          : "border-gray-300 bg-white text-gray-700 hover:border-green-700 hover:bg-green-50 hover:text-green-700"
      )}
    >
      {label}
    </button>
  );
}