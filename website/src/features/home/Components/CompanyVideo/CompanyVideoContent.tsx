import type { CompanyVideoResponse } from "@/types/companyVideo";

interface Props {
  video: CompanyVideoResponse;
}

export default function CompanyVideoContent({
  video,
}: Props) {
  return (
    <div className="flex h-full flex-col justify-center">
      <span className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        COMPANY VIDEO
      </span>

      <h5 className="text-2xl font-bold leading-tight text-gray-900 lg:text-4xl">
        {video.title}
      </h5>

      {video.description && (
        <p className="mt-6 max-w-xl leading-8 text-gray-600">
          {video.description}
        </p>
      )}
    </div>
  );
}