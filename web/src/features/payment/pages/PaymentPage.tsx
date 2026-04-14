import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import { formatRupiah } from "../../../shared/utils/price.util";
import api from "../../../api/client";

export default function PaymentPage() {
  const { reservationCode } = useParams();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchReservation = async () => {
    try {
      const res = await api.get(`/reservations/code/${reservationCode}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("reservationId", data.id);

      await api.post("/payment/upload-proof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload success!");
      fetchReservation(); // refresh status
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!data) {
    return <div className="text-center mt-20">Data not found ❌</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 space-y-6">
        {/* HEADER */}
        <h1 className="text-2xl font-extrabold text-center">Payment Details</h1>

        {/* RESERVATION CODE */}
        <div className="bg-slate-100 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-500">Reservation Code</p>
          <p className="font-bold text-primary text-lg">{reservationCode}</p>
        </div>

        {/* INFO */}
        <div className="space-y-2 text-sm text-slate-600">
          <p>
            📅 {format(new Date(data.checkInDate), "dd MMM")} - {format(new Date(data.checkOutDate), "dd MMM yyyy")}
          </p>
          <p>🏨 {data.propertyNameSnapshot}</p>
          <p>🛏️ {data.roomNameSnapshot}</p>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">{formatRupiah(Number(data.totalAmount))}</span>
        </div>

        <hr />

        {/* STATUS BASED UI */}

        {data.status === "WAITING_PAYMENT" && (
          <div className="space-y-4">
            <p className="text-center text-slate-500">Upload your payment proof</p>

            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />

            <button onClick={handleUpload} disabled={uploading} className="w-full bg-primary text-white py-3 rounded-xl font-bold">
              {uploading ? "Uploading..." : "Upload Proof"}
            </button>
          </div>
        )}

        {data.status === "WAITING_CONFIRMATION" && (
          <div className="text-center space-y-3">
            <div className="text-yellow-500 text-4xl">⏳</div>
            <p className="font-semibold">Waiting for confirmation</p>
            <p className="text-sm text-slate-500">Your payment is being reviewed</p>
          </div>
        )}

        {data.status === "PAID" && (
          <div className="text-center space-y-3">
            <div className="text-green-500 text-4xl">✅</div>
            <p className="font-semibold">Payment Successful</p>
            <p className="text-sm text-slate-500">Your booking is confirmed</p>
          </div>
        )}
      </div>
    </div>
  );
}
