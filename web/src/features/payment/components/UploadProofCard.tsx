import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/client";

type Props = {
  data: any;
  onUploaded: () => void;
};

export default function UploadProofCard({ data, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSelectFile = (selected: File | null) => {
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("reservationId", data.id);

      await api.post("/payments/upload-proof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Payment proof uploaded!");
      handleRemove();
      onUploaded();
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <h2 className="text-2xl font-black text-slate-900 mb-2">Upload Payment Proof</h2>

      <p className="text-slate-500 mb-6">Send your bank transfer receipt screenshot/photo.</p>

      {!preview ? (
        <label className="border-2 border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all">
          <span className="material-symbols-outlined text-5xl text-slate-400 mb-3">cloud_upload</span>

          <p className="font-semibold text-slate-700">Click to choose image</p>

          <p className="text-sm text-slate-400 mt-1">JPG, PNG, JPEG</p>

          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSelectFile(e.target.files?.[0] || null)} />
        </label>
      ) : (
        <div className="space-y-5">
          <img src={preview} className="w-full max-h-100 object-cover rounded-3xl border" />

          <button onClick={handleRemove} className="text-sm text-rose-500 font-semibold">
            Remove Image
          </button>
        </div>
      )}

      <button
        disabled={!file || uploading}
        onClick={handleUpload}
        className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg transition-all ${!file || uploading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-linear-to-r from-primary to-indigo-600 text-white shadow-lg hover:opacity-95"}`}
      >
        {uploading ? "Uploading..." : "Upload Proof"}
      </button>
    </div>
  );
}
