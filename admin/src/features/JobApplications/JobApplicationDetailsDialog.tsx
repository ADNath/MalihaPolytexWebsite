import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExternalLink, FileText } from "lucide-react";

import { API_BASE_URL } from "@/config/app";

import type {
  JobApplication,
  JobApplicationStatusUpdateRequest,
  CareerApplicationStatus,
} from "@/types/jobApplication";

import Button from "@/components/ui/Button";
import FormGrid from "@/components/ui/FormGrid";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

interface Props {
  open: boolean;
  application?: JobApplication | null;
  statuses: CareerApplicationStatus[];
  loading?: boolean;
  onClose: () => void;
  onSave: (request: JobApplicationStatusUpdateRequest) => Promise<void>;
}

const defaultValues: JobApplicationStatusUpdateRequest = {
  statusId: 1,
  remarks: "",
};

export default function JobApplicationDetailsDialog({
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
  } = useForm<JobApplicationStatusUpdateRequest>({
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
  console.log(statuses);
  

  return (
    <Modal
      open={open}
      title="Job Application Details"
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

          <Button type="submit" form="job-application-form" loading={loading}>
            Save Changes
          </Button>
        </div>
      }
    >
      <form
        id="job-application-form"
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
              label="Job Title"
              value={application?.jobTitle ?? ""}
              readOnly
            />

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
          <div className="space-y-5">
            <h3 className="border-b pb-2 text-base font-semibold">
              Application
            </h3>

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
                        {application.resumeFile.split("/").pop()}
                      </span>
                    </div>

                    <a
                      href={`${API_BASE_URL}/${application.resumeFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button type="button" variant="outline">
                        <ExternalLink size={16} className="mr-2" />
                        Open Resume
                      </Button>
                    </a>
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
        </div>
      </form>
    </Modal>
  );
}
