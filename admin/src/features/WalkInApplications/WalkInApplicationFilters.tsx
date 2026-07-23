import Button from "@/components/ui/Button";
import FormGrid from "@/components/ui/FormGrid";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import type {  CareerApplicationStatus,} from "@/types/walkInApplication";

import { Search, RotateCcw, Download } from "lucide-react";

interface Props {
  search: string;
  designation: string;
  statusId: string;
  minExperience: string;
  maxExperience: string;

  designationOptions: string[];
  statuses: CareerApplicationStatus[];

  loading?: boolean;
  selectedCount: number;

  onSearchChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMinExperienceChange: (value: string) => void;
  onMaxExperienceChange: (value: string) => void;

  onReset: () => void;
  onRefresh: () => void;
  onDownloadSelected: () => void;
}

export default function WalkInApplicationFilters({
  search,
  designation,
  statusId,
  minExperience,
  maxExperience,
  designationOptions,
  statuses,
  loading = false,
  selectedCount,

  onSearchChange,
  onDesignationChange,
  onStatusChange,
  onMinExperienceChange,
  onMaxExperienceChange,

  onReset,
  onRefresh,
  onDownloadSelected,
}: Props) {
  return (
    <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Filters</h2>

          <p className="mt-1 text-sm text-gray-500">
            Search and filter walk-in applications.
          </p>
        </div>

        <div className="flex gap-3">
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
          label="Designation"
          value={designation}
          onChange={(e) => onDesignationChange(e.target.value)}
          options={designationOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="All Designations"
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

        <Input
          type="number"
          min={0}
          label="Minimum Experience"
          value={minExperience}
          onChange={(e) => onMinExperienceChange(e.target.value)}
          placeholder="0"
        />

        <Input
          type="number"
          min={0}
          label="Maximum Experience"
          value={maxExperience}
          onChange={(e) => onMaxExperienceChange(e.target.value)}
          placeholder="20"
        />
        <div className="flex items-end gap-3">
          <Button
            type="button"
            variant="primary"
            className="flex-1"
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
