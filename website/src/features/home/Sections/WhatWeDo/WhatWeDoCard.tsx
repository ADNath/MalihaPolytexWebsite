import type { WhatWeDoItem } from "./whatWeDoData";

type WhatWeDoCardProps = {
  item: WhatWeDoItem;
};

export default function WhatWeDoCard({ item }: WhatWeDoCardProps) {
  const Icon = item.icon;

  return (
    <article
      className="
        rounded-2xl
        border border-gray-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
        <Icon
          className="h-8 w-8 text-primary"
          strokeWidth={1.75}
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-900">
        {item.title}
      </h3>

      <div className="my-3 h-1 w-10 rounded-full bg-primary" />

      <p className="text-sm leading-7 text-gray-600">
        {item.description}
      </p>
    </article>
  );
}