import { Send, Upload } from "lucide-react";

const designationOptions = [
  "Select Desired Position",
  "Production",
  "Quality Assurance",
  "Sales & Marketing",
  "Commercial",
  "Accounts & Finance",
  "Human Resources",
  "Supply Chain",
  "Information Technology",
  "Maintenance",
  "Other",
];

export default function WalkInApplicationForm() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Submit Your Resume
        </h2>

        <p className="mt-3 leading-7 text-gray-600">
          We are always interested in talented professionals. Even if there
          isn't a suitable opening today, submit your resume and we'll consider
          your profile for future opportunities.
        </p>
      </div>

      {/* Form */}

      <form className="space-y-8 p-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name *
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email Address *
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Phone Number *
            </label>

            <input
              type="text"
              placeholder="+8801XXXXXXXXX"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Designation */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Desired Position *
            </label>

            <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-primary">
              {designationOptions.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Years of Experience
            </label>

            <input
              type="text"
              placeholder="e.g. 5 Years"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Salary */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Expected Monthly Salary (BDT)
            </label>

            <input
              type="number"
              placeholder="50000"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>
        </div>

        {/* Upload */}

        <div>
          <label className="mb-3 block font-medium text-gray-700">
            Upload CV *
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 px-8 py-10 transition hover:border-primary hover:bg-primary/10">
            <Upload className="mb-4 h-10 w-10 text-primary" />

            <span className="text-lg font-semibold text-gray-800">
              Click to Upload Your Resume
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
          <label className="mb-2 block font-medium text-gray-700">
            Cover Letter
          </label>

          <textarea
            rows={8}
            placeholder="Tell us about yourself..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 leading-7 outline-none transition focus:border-primary"
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white transition hover:bg-primary/90"
        >
          <Send className="h-5 w-5" />

          Submit Resume
        </button>
      </form>
    </div>
  );
}