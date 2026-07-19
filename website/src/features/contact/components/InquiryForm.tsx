import { Send } from "lucide-react";
import { useForm } from "react-hook-form";

import type { ContactInquiryRequest } from "@/types/contactInquiry";
import { createContactInquiry } from "@/services/api/contactInquiryApi";
import Swal from "sweetalert2";

export default function InquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInquiryRequest>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactInquiryRequest) {
    try {
      const response = await createContactInquiry(data);

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Inquiry Submitted",
          text:
            response.message ??
            "Thank you for contacting us. We'll get back to you soon.",
          confirmButtonColor: "#2563eb",
        });

        reset();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            response.message ??
            "Unable to submit your inquiry. Please try again.",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "Please try again later.",
        confirmButtonColor: "#dc2626",
      });
    }
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
        <div className="grid gap-6 md:grid-cols-1">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full name is required",
              })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Company
            </label>

            <input
              type="text"
              placeholder="Company name (Optional)"
              {...register("company")}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="+8801XXXXXXXXX"
              {...register("phone")}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="How can we help you?"
            {...register("subject", {
              required: "Subject is required",
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />

          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            placeholder="Write your message here..."
            {...register("message", {
              required: "Message is required",
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 leading-7 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />

          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-black transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-5 w-5" />

          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}
