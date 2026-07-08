import clsx from "clsx";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterChip({
  label,
  active,
  onClick,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "border-primary bg-primary text-white shadow-md"
          : "border-gray-300 bg-white text-black-700 hover:border-primary hover:text-primary"
      )}
    >
      {label}
    </button>
  );
}