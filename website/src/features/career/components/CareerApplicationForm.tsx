import { Upload, Send } from "lucide-react";

export default function CareerApplicationForm() {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white shadow-sm">
      {/* Header */}

      <div className="rounded-t-2xl bg-primary px-8 py-6 text-black">
        <h2 className="text-2xl font-bold">
          Apply for this Position
        </h2>

        <p className="mt-2 text-sm leading-6 text-black/90">
          Complete the application form below. Our HR team will carefully review
          your application and contact you if your qualifications match our
          requirements.
        </p>
      </div>

      {/* Form */}

      <form className="space-y-6 p-8">
        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-primary"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-primary"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="+8801XXXXXXXXX"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-primary"
          />
        </div>

        {/* Experience */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Years of Experience
          </label>

          <input
            type="text"
            placeholder="e.g. 5 Years"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-primary"
          />
        </div>

        {/* Salary */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Expected Monthly Salary (BDT)
            <span className="text-red-500"> *</span>
          </label>

          <input
            type="number"
            placeholder="e.g. 50000"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-primary"
          />
        </div>

        {/* Upload */}

        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-700">
            Upload Your CV <span className="text-red-500">*</span>
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-8 transition hover:border-primary hover:bg-primary/10">
            <Upload className="mb-3 h-10 w-10 text-primary" />

            <span className="font-semibold text-gray-800">
              Click to Upload CV
            </span>

            <span className="mt-2 text-sm text-gray-500">
              PDF, DOC or DOCX (Maximum 5 MB)
            </span>

            <input
              type="file"
              className="hidden"
            />
          </label>
        </div>

        {/* Cover Letter */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Cover Letter
          </label>

          <textarea
            rows={6}
            placeholder="Write a brief introduction about yourself..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 leading-7 transition outline-none focus:border-primary"
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-white transition hover:bg-primary/90"
        >
          <Send className="h-5 w-5" />

          Submit Application
        </button>
      </form>
    </div>
  );
}