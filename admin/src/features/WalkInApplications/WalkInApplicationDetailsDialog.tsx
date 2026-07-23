import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type {
  WalkInApplication,
  WalkInApplicationStatusUpdateRequest,
  CareerApplicationStatus,
} from "@/types/walkInApplication";

import Button from "@/components/ui/Button";
import FormGrid from "@/components/ui/FormGrid";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { getImageUrl } from "@/utils/image";
import { FileText } from "lucide-react";

interface Props {
  open: boolean;
  application?: WalkInApplication | null;
  statuses: CareerApplicationStatus[];
  loading?: boolean;
  onClose: () => void;
  onSave: (request: WalkInApplicationStatusUpdateRequest) => Promise<void>;
}

const defaultValues: WalkInApplicationStatusUpdateRequest = {
  statusId: 1,
  remarks: "",
};

export default function WalkInApplicationDetailsDialog({
  open,
  application,
  statuses,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WalkInApplicationStatusUpdateRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (application) {
      reset({
        statusId: application.statusId,
        remarks: application.remarks ?? "",
      });
    } else {
      reset(defaultValues);
    }
  }, [application, open, reset]);

  async function handleDownload() {
    if (!application?.resumeFile) return;

    const url = getImageUrl(application.resumeFile);

    const response = await fetch(url);
    const blob = await response.blob();

    const extension = application.resumeFile.split(".").pop() ?? "pdf";

    const fileName = `${application?.fullName.replace(
      /\s+/g,
      "_",
    )}_Resume.${extension}`;

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }

  return (
    <Modal
      open={open}
      title="Walk-in Application Details"
      maxWidth="max-w-5xl"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </Button>

          <Button
            type="submit"
            form="walkin-application-form"
            loading={loading}
          >
            Save Changes
          </Button>
        </div>
      }
    >
      <form
        id="walkin-application-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-8"
      >
        <div className="space-y-5">
          <h3 className="border-b pb-2 text-base font-semibold">
            Applicant Information
          </h3>

          <FormGrid>
            <Input
              label="Full Name"
              value={application?.fullName ?? ""}
              readOnly
            />

            <Input label="Email" value={application?.email ?? ""} readOnly />

            <Input label="Phone" value={application?.phone ?? ""} readOnly />

            <Input
              label="Address"
              value={application?.address ?? ""}
              readOnly
            />
          </FormGrid>
        </div>

        <div className="space-y-5">
          <h3 className="border-b pb-2 text-base font-semibold">
            Professional Information
          </h3>

          <FormGrid>
            <Input
              label="Highest Education"
              value={application?.highestEducation ?? ""}
              readOnly
            />

            <Input
              label="Years of Experience"
              value={application?.yearsOfExperience?.toString() ?? ""}
              readOnly
            />

            <Input
              label="Current Company"
              value={application?.currentCompany ?? ""}
              readOnly
            />

            <Input
              label="Current Designation"
              value={application?.currentDesignation ?? ""}
              readOnly
            />

            <Input
              label="Expected Salary"
              value={application?.expectedSalary ?? ""}
              readOnly
            />

            <Input
              label="Applied Date"
              value={
                application?.appliedDate
                  ? new Date(application.appliedDate).toLocaleString()
                  : ""
              }
              readOnly
            />
          </FormGrid>
        </div>
        <div className="space-y-5">
          <h3 className="border-b pb-2 text-base font-semibold">Application</h3>

          <div className="space-y-4">
            <Textarea
              label="Cover Letter"
              value={application?.coverLetter ?? ""}
              rows={8}
              readOnly
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Resume
              </label>

              {application?.resumeFile ? (
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FileText size={18} />

                    <span className="break-all">
                      {application.fullName}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      void handleDownload();
                    }}
                  >
                    Download Resume
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No resume uploaded.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="border-b pb-2 text-base font-semibold">HR Review</h3>

          <FormGrid>
            <Select
              label="Application Status"
              error={errors.statusId?.message}
              options={statuses.map((status) => ({
                label: status.statusName,
                value: String(status.statusId),
              }))}
              {...register("statusId", {
                required: "Status is required.",
                valueAsNumber: true,
              })}
            />
          </FormGrid>

          <Textarea
            label="Remarks"
            rows={6}
            error={errors.remarks?.message}
            {...register("remarks", {
              maxLength: {
                value: 2000,
                message: "Remarks cannot exceed 2000 characters.",
              },
            })}
          />
        </div>
      </form>
    </Modal>
  );
}
