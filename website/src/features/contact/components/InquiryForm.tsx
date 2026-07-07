import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      

      <form className="space-y-6 p-8">
        {/* Row 1 */}

        <div className="grid gap-6 md:grid-cols-1">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Company
            </label>

            <input
              type="text"
              placeholder="Company name (Optional)"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Row 2 */}

        <div className="grid gap-6 md:grid-cols-1">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="+8801XXXXXXXXX"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Subject */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="How can we help you?"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        {/* Message */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={3}
            placeholder="Write your message here..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 leading-7 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white transition hover:bg-primary/90"
        >
          <Send className="h-5 w-5" />

          Submit Inquiry
        </button>
      </form>
    </div>
  );
}