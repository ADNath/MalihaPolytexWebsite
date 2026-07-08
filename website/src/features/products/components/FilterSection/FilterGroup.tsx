import FilterChip from "./FilterChip";

interface Props {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function FilterGroup({
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">
        {label}
      </h4>

      <div className="flex flex-wrap gap-3">
        <FilterChip
          label="All"
          active={value === null}
          onClick={() => onChange(null)}
        />

        {options.map((option) => (
          <FilterChip
            key={option}
            label={option}
            active={value === option}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
}