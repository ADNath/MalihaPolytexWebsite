interface Props {
  text?: string;
}

export default function Loading({
  text = "Loading...",
}: Props) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <p className="text-sm text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}