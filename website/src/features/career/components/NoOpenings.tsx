import { Link } from "react-router-dom";

export default function NoOpenings() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900">
          No Current Opportunities
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Thank you for your interest in joining Maliha Poly Tex Fiber Industry
          Limited.
        </p>

        <p className="mt-4 leading-8 text-gray-600">
          We don't have any open positions at the moment. However, we are always
          interested in connecting with talented professionals for future
          opportunities.
        </p>

        <Link
          to="/career/walk-in-application"
          className="mt-10 inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90"
        >
          Submit Walk In Application
        </Link>
      </div>
    </div>
  );
}