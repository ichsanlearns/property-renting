import { useState } from "react";
import api from "../../../api/client";

export function useUploadPaymentProof() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const selectFile = (selected: File | null) => {
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const reset = () => {
    setFile(null);
    setPreview("");
  };

  const upload = async (reservationId: string) => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("reservationId", reservationId);

    await api.post("/payments/upload-proof", formData);
    setUploading(false);
    reset();
  };

  return {
    file,
    preview,
    uploading,
    selectFile,
    upload,
    reset,
  };
}
