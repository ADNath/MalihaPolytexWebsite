import { FileText, ImagePlus, Loader2, Pencil } from "lucide-react";
import clsx from "clsx";

interface Props {
  label: string;
  preview?: string;
  fileName?: string;
  uploading?: boolean;
  recommendedSize?: string;
  helperText?: string;
  accept?: string;
  uploadText?: string;
  uploadingText?: string;
  changeText?: string;
  previewType?: "image" | "file";
  error?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FileUpload({
  label,
  preview,
  fileName,
  uploading = false,
  recommendedSize = "1920 × 800 px",
  helperText = "Supports JPG, PNG, JPEG and WEBP • Max 5 MB",
  accept = ".jpg,.jpeg,.png,.webp",
  uploadText = "Click to upload",
  uploadingText = "Uploading...",
  changeText = "Change File",
  previewType = "image",
  error,
  className,
  onChange,
}: Props) {
  return (
    <div className={clsx("space-y-3", className)}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <label className="group relative flex h-56 w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-200 hover:border-green-500 hover:bg-green-50">
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={onChange}
        />

        {!preview ? (
          <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
            {uploading ? (
              <>
                <Loader2 className="mb-4 h-10 w-10 animate-spin text-green-600" />

                <p className="text-base font-semibold text-green-700">
                  {uploadingText}
                </p>

                <p className="mt-1 text-sm text-gray-500">Please wait...</p>
              </>
            ) : (
              <>
                {previewType === "image" ? (
                  <ImagePlus className="mb-4 h-12 w-12 text-gray-400 transition-colors duration-200 group-hover:text-green-600" />
                ) : (
                  <FileText className="mb-4 h-12 w-12 text-gray-400 transition-colors duration-200 group-hover:text-green-600" />
                )}
                <p className="text-base font-semibold text-gray-800">
                  {uploadText}
                </p>

                <p className="mt-2 text-sm text-gray-500">{helperText}</p>

                <p className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Recommended: {recommendedSize}
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            {previewType === "image" ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center bg-gray-100">
                <FileText className="h-16 w-16 text-red-600" />
                <p className="mt-3 text-sm font-medium text-gray-700">
                  {fileName ?? "PDF Uploaded"}
                </p>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {uploading ? (
                <div className="flex flex-col items-center text-white">
                  <Loader2 className="mb-3 h-8 w-8 animate-spin" />

                  <span className="text-sm font-medium">Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg">
                  <Pencil className="h-4 w-4" />
                  {changeText}
                </div>
              )}
            </div>
          </>
        )}
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
