import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Loader2, Send, Upload } from "lucide-react";

import type { JobApplicationRequest } from "@/types/jobApplication";
import { uploadFile } from "@/services/api/fileUploadApi";
import { createJobApplication } from "@/services/api/jobApplicationApi";

interface Props {
  jobId: number;
}

const defaultValues: JobApplicationRequest = {
  jobId: 0,
  fullName: "",
  email: "",
  phone: "",
  address: "",
  highestEducation: "",
  yearsOfExperience: undefined,
  currentCompany: "",
  currentDesignation: "",
  expectedSalary: "",
  coverLetter: "",
  resumeFile: "",
};

export default function CareerApplicationForm({ jobId }: Props) {
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumeName, setResumeName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<JobApplicationRequest>({
    defaultValues: {
      ...defaultValues,
      jobId,
    },
  });

  register("resumeFile", {
    required: "Resume is required.",
  });

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      await Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Maximum file size is 5 MB.",
      });

      return;
    }

    try {
      setUploading(true);

      const response = await uploadFile(file, "resumes");

      if (!response.success) {
        throw new Error(response.message ?? "Failed to upload resume.");
      }

      setValue("resumeFile", response.data, {
        shouldValidate: true,
      });

      setResumeName(file.name);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error instanceof Error ? error.message : "Unable to upload resume.",
      });
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(data: JobApplicationRequest) {
    try {
      setSubmitting(true);

      const response = await createJobApplication({
        ...data,
        jobId,
      });

      if (!response.success) {
        throw new Error(response.message ?? "Application submission failed.");
      }

      await Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Thank you for applying. Our HR team will review your application.",
      });

      reset({
        ...defaultValues,
        jobId,
      });

      setResumeName("");
      setValue("resumeFile", "");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-primary/10 bg-white shadow-sm">
      <div className="rounded-t-2xl bg-primary px-8 py-6 text-black">
        <h2 className="text-2xl font-bold">Apply for this Position</h2>

        <p className="mt-2 text-sm leading-6 text-black/90">
          Complete the application form below. Our HR team will carefully review
          your application and contact you if your qualifications match our
          requirements.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Full Name
            <span className="text-red-500"> *</span>
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required.",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />

          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address
            <span className="text-red-500"> *</span>
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone Number
            <span className="text-red-500"> *</span>
          </label>

          <input
            type="text"
            placeholder="+8801XXXXXXXXX"
            {...register("phone", {
              required: "Phone number is required.",
              pattern: {
                value: /^(\+8801|01)[3-9]\d{8}$/,
                message: "Please enter a valid phone number.",
              },
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Address
          </label>

          <input
            type="text"
            placeholder="Enter your address"
            {...register("address")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Highest Education
          </label>

          <input
            type="text"
            placeholder="Bachelor's, Master's..."
            {...register("highestEducation")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Years of Experience
          </label>

          <input
            type="number"
            min={0}
            placeholder="e.g. 5"
            {...register("yearsOfExperience", {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Current Company
          </label>

          <input
            type="text"
            placeholder="Current company"
            {...register("currentCompany")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Current Designation
          </label>

          <input
            type="text"
            placeholder="Current designation"
            {...register("currentDesignation")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Expected Monthly Salary (BDT)
          </label>

          <input
            type="text"
            placeholder="e.g. 50000"
            {...register("expectedSalary")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-700">
            Upload Your CV
            <span className="text-red-500"> *</span>
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-8 transition hover:border-primary hover:bg-primary/10">
            {uploading ? (
              <>
                <Loader2 className="mb-3 h-10 w-10 animate-spin text-primary" />

                <span className="font-semibold text-gray-800">
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <Upload className="mb-3 h-10 w-10 text-primary" />

                <span className="font-semibold text-gray-800">
                  {resumeName || "Click to Upload CV"}
                </span>

                <span className="mt-2 text-sm text-gray-500">
                  PDF, DOC or DOCX (Maximum 5 MB)
                </span>
              </>
            )}

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleResumeUpload}
            />
          </label>

          {errors.resumeFile && (
            <p className="mt-2 text-sm text-red-600">
              {errors.resumeFile.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Cover Letter
          </label>

          <textarea
            rows={6}
            placeholder="Write a brief introduction about yourself..."
            {...register("coverLetter")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 leading-7 outline-none transition focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={uploading || submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-black transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  );
}
