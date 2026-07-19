import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type {
  ContactInquiryResponse,
  UpdateContactInquiryStatusRequest,
} from "@/types/contactInquiry";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

interface Props {
  open: boolean;
  inquiry?: ContactInquiryResponse | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: UpdateContactInquiryStatusRequest) => Promise<void>;
}

const defaultValues: UpdateContactInquiryStatusRequest = {
  status: "New",
};

const statusOptions = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "Read",
    value: "Read",
  },
  {
    label: "Replied",
    value: "Replied",
  },
  {
    label: "Closed",
    value: "Closed",
  },
];

export default function ContactInquiryDialog({
  open,
  inquiry,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateContactInquiryStatusRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (inquiry) {
      reset({
        status: inquiry.status,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, inquiry, reset]);

  return (
    <Modal
      open={open}
      title="Contact Inquiry"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button type="submit" form="contact-inquiry-form" loading={loading}>
            Save Status
          </Button>
        </div>
      }
    >
      <form
        id="contact-inquiry-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Name" value={inquiry?.name ?? ""} readOnly />

          <Input label="Company" value={inquiry?.company ?? ""} readOnly />

          <Input label="Email" value={inquiry?.email ?? ""} readOnly />

          <Input label="Phone" value={inquiry?.phone ?? ""} readOnly />

          <Input
            label="Subject"
            value={inquiry?.subject ?? ""}
            readOnly
            className="sm:col-span-2"
          />
        </div>

        <Textarea
          label="Message"
          value={inquiry?.message ?? ""}
          rows={6}
          readOnly
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Submitted At"
            value={
              inquiry?.createdAt
                ? new Date(inquiry.createdAt).toLocaleString()
                : ""
            }
            readOnly
          />

          <Input
            label="Last Updated"
            value={
              inquiry?.updatedAt
                ? new Date(inquiry.updatedAt).toLocaleString()
                : ""
            }
            readOnly
          />
        </div>

        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register("status", {
            required: "Status is required",
          })}
        />
      </form>
    </Modal>
  );
}
