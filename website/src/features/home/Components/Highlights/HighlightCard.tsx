import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function HighlightCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="group rounded-2xl bg-white p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition group-hover:bg-green-700">
        <Icon
          size={30}
          className="text-green-700 transition group-hover:text-white"
        />
      </div>

      <h3 className="mb-4 text-2xl font-bold text-gray-900">
        {title}
      </h3>
      

      <p className="leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
}