import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ImagesType } from "../types/image.type";

type ImageUploadProps = {
  value: ImagesType[];
  onChange: (images: ImagesType[]) => void;
  max?: number;
};

function ImageUpload({ value, onChange, max = 5 }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleSelectFile = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const filesArray = Array.from(files);
      const remaining = max - value.length;

      const newImages = filesArray.slice(0, remaining).map((file, index) => ({
        id: uuidv4(),
        preview: URL.createObjectURL(file),
        file,

        isCover: value.length + index === 0,
        order: value.length + index,
      }));

      onChange([...value, ...newImages]);
    },
    [value, max, onChange],
  );

  const handleRemoveImage = useCallback(
    (id: string) => {
      onChange(value.filter((img) => img.id !== id));
    },
    [value, onChange],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleSelectFile(e.dataTransfer.files);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
          photo_library
        </span>
        Property Gallery
      </h3>
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        htmlFor="image-upload"
        className={`border-2 border-dashed  dark:border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-primary transition-colors group bg-slate-50/50 dark:bg-slate-800/30 ${value.length === max ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${isDragging ? "border-primary bg-primary/5" : "border-slate-200 dark:border-slate-700"}`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleSelectFile(e.target.files)}
          className="hidden"
          id="image-upload"
        />
        <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl">
            upload_file
          </span>
        </div>
        <p className="text-slate-900 dark:text-white font-bold text-base mb-1">
          Drag and drop photos here
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Support JPG, PNG, up to 10MB
        </p>
        <div className="mt-4 px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-sm font-bold shadow-sm">
          Browse Files
        </div>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-8">
        {value.map((img) => (
          <div
            key={img.id}
            className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative group overflow-hidden cursor-move"
          >
            <img
              alt="Kitchen"
              className="w-full h-full object-cover"
              src={img.preview}
            />
            {img.isCover && (
              <div className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Cover
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemoveImage(img.id)}
              className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">
                delete
              </span>
            </button>
          </div>
        ))}

        {value.length < max && value.length > 0 && (
          <label
            htmlFor="image-upload"
            className="aspect-square rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-slate-400">
              add
            </span>
          </label>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
