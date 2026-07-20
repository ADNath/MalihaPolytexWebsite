import type {
  PropsWithChildren,
  ReactNode,
} from "react";

interface Props extends PropsWithChildren {
  loading?: boolean;
  emptyMessage?: ReactNode;
  className?: string;
}

export default function DataTable({
  children,
  loading = false,
  emptyMessage,
  className = "",
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {children}
        </table>
      </div>

      {loading && (
        <div className="flex items-center justify-center border-t px-6 py-10">
          <div className="flex items-center gap-3 text-gray-500">
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-20"
              />

              <path
                fill="currentColor"
                className="opacity-80"
                d="M22 12a10 10 0 0 1-10 10v-4a6 6 0 0 0 6-6h4Z"
              />
            </svg>

            <span>Loading...</span>
          </div>
        </div>
      )}

      {!loading && emptyMessage && (
        <div className="border-t px-6 py-10 text-center text-gray-500">
          {emptyMessage}
        </div>
      )}

      <style>{`
        table thead{
          background:#f9fafb;
        }

        table thead th{
          padding:12px 16px;
          border-bottom:1px solid #e5e7eb;
          font-weight:600;
          text-align:left;
          white-space:nowrap;
          color:#374151;
        }

        table tbody td{
          padding:12px 16px;
          border-bottom:1px solid #f3f4f6;
          vertical-align:middle;
          color:#374151;
        }

        table tbody tr:last-child td{
          border-bottom:none;
        }

        table tbody tr:hover{
          background:#f9fafb;
        }
      `}</style>
    </div>
  );
}