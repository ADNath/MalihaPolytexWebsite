import Button from "@/components/ui/Button";
import FormGrid from "@/components/ui/FormGrid";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import type { CareerApplicationStatus } from "@/types/jobApplication";

import { Download, RotateCcw, Search } from "lucide-react";

interface ExperienceOption {
  label: string;
  value: string | null;
}

interface Props {
  search: string;
  jobId: string;
  statusId: string;
  maxExperience: string;

  jobOptions: {
    label: string;
    value: string;
  }[];

  experienceOptions: ExperienceOption[];

  statuses: CareerApplicationStatus[];

  loading?: boolean;
  selectedCount: number;

  onSearchChange: (value: string) => void;
  onJobChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMaxExperienceChange: (value: string) => void;

  onReset: () => void;
  onRefresh: () => void;
  onDownloadSelected: () => void;
}

export default function JobApplicationFilters({
  search,
  jobId,
  statusId,
  maxExperience,
  jobOptions,
  experienceOptions,
  statuses,
  loading = false,
  selectedCount,

  onSearchChange,
  onJobChange,
  onStatusChange,
  onMaxExperienceChange,

  onReset,
  onRefresh,
  onDownloadSelected,
}: Props) {
  const sliderValue = Math.max(
    0,
    experienceOptions.findIndex(
      (x) => x.value === (maxExperience || null),
    ),
  );

  return (
    <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Filters</h2>

          <p className="mt-1 text-sm text-gray-500">
            Search and filter job applications.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={onRefresh}
          >
            <RotateCcw size={16} className="mr-2" />
            Refresh
          </Button>

          <Button
            type="button"
            variant="success"
            disabled={loading || selectedCount === 0}
            onClick={onDownloadSelected}
          >
            <Download size={16} className="mr-2" />
            Download Selected
            {selectedCount > 0 && ` (${selectedCount})`}
          </Button>
        </div>
      </div>

      <FormGrid columns={3}>
        <Input
          label="Search"
          placeholder="Applicant name, email, phone..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Select
          label="Job"
          value={jobId}
          onChange={(e) => onJobChange(e.target.value)}
          options={jobOptions}
          placeholder="All Jobs"
        />

        <Select
          label="Status"
          value={statusId}
          onChange={(e) => onStatusChange(e.target.value)}
          options={statuses.map((status) => ({
            label: status.statusName,
            value: String(status.statusId),
          }))}
          placeholder="All Status"
        />

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Maximum Experience
          </label>

          <input
            type="range"
            min={0}
            max={experienceOptions.length - 1}
            step={1}
            value={sliderValue}
            onChange={(e) => {
              const option =
                experienceOptions[Number(e.target.value)];

              onMaxExperienceChange(option.value ?? "");
            }}
            className="h-2 w-full cursor-pointer accent-blue-600"
          />

          <div className="mt-2 flex justify-between text-xs text-gray-500">
            {experienceOptions.map((option) => (
              <span key={option.label}>{option.label}</span>
            ))}
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Maximum Experience:
            <span className="ml-1 font-semibold">
              {maxExperience
                ? `${maxExperience} Years`
                : "Any"}
            </span>
          </p>
        </div>

        <div className="flex items-end justify-end gap-3">
          <Button
            type="button"
            variant="primary"
            onClick={onRefresh}
            disabled={loading}
          >
            <Search size={16} className="mr-2" />
            Search
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={loading}
          >
            Reset
          </Button>
        </div>
      </FormGrid>
    </div>
  );
}