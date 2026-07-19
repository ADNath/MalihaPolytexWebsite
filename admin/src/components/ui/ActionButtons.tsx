import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  onView?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={onEdit}
        className="rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
      >
        <Trash2 size={18} />
      </button>

      <button
        onClick={onView}
        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
      >
        <Eye size={18} />
      </button>
    </div>
  );
}