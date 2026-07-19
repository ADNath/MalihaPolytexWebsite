import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type {
  HomepageContactRequest,
  HomepageContactResponse,
} from "@/types/homepageContact";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

interface Props {
  open: boolean;
  homepageContact?: HomepageContactResponse | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: HomepageContactRequest) => Promise<void>;
}

const defaultValues: HomepageContactRequest = {
  title: "",
  address: "",
  mapUrl: "",
  phones: [""],
  emails: [""],
  officeHours: "",
  displayOrder: 1,
  isActive: true,
};

export default function HomepageContactDialog({
  open,
  homepageContact,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const [phones, setPhones] = useState<string[]>([""]);
  const [emails, setEmails] = useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HomepageContactRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (homepageContact) {
      reset({
        title: homepageContact.title,
        address: homepageContact.address,
        mapUrl: homepageContact.mapUrl,
        phones: homepageContact.phones,
        emails: homepageContact.emails,
        officeHours: homepageContact.officeHours,
        displayOrder: homepageContact.displayOrder,
        isActive: homepageContact.isActive,
      });

      setPhones(
        homepageContact.phones.length ? [...homepageContact.phones] : [""],
      );

      setEmails(
        homepageContact.emails.length ? [...homepageContact.emails] : [""],
      );
    } else {
      reset(defaultValues);
      setPhones([""]);
      setEmails([""]);
    }
  }, [open, homepageContact, reset]);

  function updatePhone(index: number, value: string) {
    const items = [...phones];
    items[index] = value;
    setPhones(items);
  }

  function addPhone() {
    setPhones([...phones, ""]);
  }

  function removePhone(index: number) {
    if (phones.length === 1) return;

    setPhones(phones.filter((_, i) => i !== index));
  }

  function updateEmail(index: number, value: string) {
    const items = [...emails];
    items[index] = value;
    setEmails(items);
  }

  function addEmail() {
    setEmails([...emails, ""]);
  }

  function removeEmail(index: number) {
    if (emails.length === 1) return;

    setEmails(emails.filter((_, i) => i !== index));
  }

  async function submit(data: HomepageContactRequest) {
    await onSave({
      ...data,
      phones: phones.map((x) => x.trim()).filter(Boolean),
      emails: emails.map((x) => x.trim()).filter(Boolean),
    });
  }

  return (
    <Modal
      open={open}
      title={homepageContact ? "Edit Homepage Contact" : "Add Homepage Contact"}
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

          <Button type="submit" form="homepage-contact-form" loading={loading}>
            Save
          </Button>
        </div>
      }
    >
      <form
        id="homepage-contact-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-6"
      >
        <Input
          label="Title"
          placeholder="Corporate Office"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required.",
          })}
        />
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
            {...register("address", {
              required: "Address is required.",
            })}
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>
        <Input
          label="Google Map URL"
          placeholder="https://maps.google.com/..."
          error={errors.mapUrl?.message}
          {...register("mapUrl")}
        />
        <Input
          label="Office Days"
          placeholder="Saturday - Thursday (9:30 AM - 6:30 PM)"
          error={errors.officeHours?.message}
          {...register("officeHours")}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Phone Numbers</h3>

            <Button type="button" variant="outline" onClick={addPhone}>
              + Add Phone
            </Button>
          </div>

          {phones.map((phone, index) => (
            <div key={index} className="flex items-center gap-3">
              <Input
                value={phone}
                placeholder="+8801713372015"
                onChange={(e) => updatePhone(index, e.target.value)}
                className="flex-1"
              />

              <Button
                type="button"
                variant="outline"
                disabled={phones.length === 1}
                onClick={() => removePhone(index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Business Emails</h3>

              <Button type="button" variant="outline" onClick={addEmail}>
                + Add Email
              </Button>
            </div>
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  type="email"
                  value={email}
                  placeholder="info@company.com"
                  onChange={(e) => updateEmail(index, e.target.value)}
                  className="flex-1"
                />

                <Button
                  type="button"
                  variant="outline"
                  disabled={emails.length === 1}
                  onClick={() => removeEmail(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Input
          type="number"
          label="Display Order"
          error={errors.displayOrder?.message}
          {...register("displayOrder", {
            required: "Display Order is required.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Display Order must be greater than 0.",
            },
          })}
        />

        <Checkbox label="Active" {...register("isActive")} />
      </form>
    </Modal>
  );
}
