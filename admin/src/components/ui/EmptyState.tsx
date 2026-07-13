interface Props {
  title?: string;
}

export default function EmptyState({
  title = "No records found.",
}: Props) {
  return (
    <div className="py-16 text-center text-gray-500">
      {title}
    </div>
  );
}