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
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900">
        {label}
      </h4>

      <div className="flex flex-wrap gap-2">
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