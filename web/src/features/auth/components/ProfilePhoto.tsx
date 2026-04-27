import type { ImageType } from "../../tenant/property/types/image.type";
import { v4 as uuidv4 } from "uuid";

function ProfilePhoto({
  image,
  onChange,
  page,
  changingProfilePhoto = true,
  setChangingProfilePhoto,
}: {
  image: ImageType | null;
  onChange: (image: ImageType | null) => void;
  page?: string;
  changingProfilePhoto?: boolean;
  setChangingProfilePhoto?: (changingProfile: boolean) => void;
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        id: uuidv4(),
        preview: URL.createObjectURL(file),
        file,
      });
    }

    e.target.value = "";
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    onChange(null);
  };

  return (
    <label
      className={`relative transition-transform duration-300 ${changingProfilePhoto ? "cursor-pointer hover:scale-105" : ""}`}
    >
      <input
        onChange={handleFile}
        disabled={!changingProfilePhoto}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-white shadow-lg overflow-hidden transition-transform group-hover:scale-105">
        {image?.preview ? (
          <>
            <img
              src={image?.preview}
              alt=""
              className="object-cover w-full h-full"
            />
          </>
        ) : (
          <span
            className="material-symbols-outlined text-4xl text-slate-400"
            data-icon="add_a_photo"
          >
            add_a_photo
          </span>
        )}
      </div>

      {changingProfilePhoto &&
        (image?.preview ? (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md hover:scale-110 transition cursor-pointer w-7 h-7 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xs">delete</span>
          </button>
        ) : (
          <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md w-7 h-7 flex items-center justify-center">
            <span className="material-symbols-outlined text-xs text-white">
              add_photo_alternate
            </span>
          </div>
        ))}
    </label>
  );
}

export default ProfilePhoto;
