import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import { formatRupiah } from "../../../shared/utils/price.util";
import api from "../../../api/client";
import toast from "react-hot-toast";

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

      await api.post("/payments/upload-proof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Payment proof uploaded!");
      fetchReservation(); // refresh status
    } catch (err) {
      console.error(err);
      toast.error("Upload failed, try again!");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
      </div>
    );

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <p className="text-xl font-bold">Data not found ❌</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 justify-center py-8 px-4 md:px-10">
          <div className="flex flex-col max-w-160 flex-1 gap-6">
            {/* TITLE */}
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">Payment Status</h1>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Track the status of your booking: <span className="font-bold text-primary">{reservationCode}</span>
              </p>
            </div>

            {/* STATUS ALERT */}
            {data.status === "WAITING_PAYMENT" && data.rejectionReason && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-5 flex flex-col gap-2">
                <div className="flex items-center gap-3 text-red-700 dark:text-red-300">
                  <span className="material-symbols-outlined">error</span>
                  <span className="text-base font-bold">Payment Rejected</span>
                </div>
                <p className="text-red-600 dark:text-red-400 text-sm">Reason: {data.rejectionReason}</p>
                <p className="text-xs text-red-400 mt-1">Please upload a new payment proof.</p>
              </div>
            )}
            {data.status === "WAITING_CONFIRMATION" && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 flex flex-col gap-2">
                <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
                  <span className="material-symbols-outlined">pending_actions</span>
                  <span className="text-base font-bold">Payment Under Review</span>
                </div>
                <p className="text-amber-700 dark:text-amber-400/80 text-sm leading-relaxed">Verification may take up to 24 hours. Our team is currently verifying ваur payment.</p>
              </div>
            )}

            {data.status === "PAID" && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-5 flex flex-col gap-2">
                <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="text-base font-bold">Payment Confirmed</span>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400/80 text-sm leading-relaxed">Your payment has been successfully verified. Enjoy your stay at {data.propertyNameSnapshot}!</p>
              </div>
            )}

            {/* PROPERTY SUMMARY CARD */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
              <div
                className="w-full md:w-32 h-32 md:h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 bg-slate-200"
                style={{
                  backgroundImage: `url(${data.roomType?.roomTypeImages?.find((img: any) => img.isCover)?.imageUrl || data.roomType?.roomTypeImages?.[0]?.imageUrl || "https://via.placeholder.com/150"})`,
                }}
              ></div>
              <div className="flex flex-col justify-between grow">
                <div>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">{data.propertyNameSnapshot}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {data.roomNameSnapshot} • {format(new Date(data.checkInDate), "MMM dd")} - {format(new Date(data.checkOutDate), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-xs text-slate-400">Total Paid:</span>
                  <span className="text-primary font-bold text-xl">{formatRupiah(Number(data.totalAmount))}</span>
                </div>
              </div>
            </div>

            {/* PAYMENT ACTION SECTION */}
            <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Payment Proof</h3>

              {data.status === "WAITING_PAYMENT" ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center">
                    <input type="file" id="upload-proof" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <label htmlFor="upload-proof" className="cursor-pointer flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-4xl text-slate-400">cloud_upload</span>
                      <span className="text-sm text-slate-500">{file ? file.name : "Click to select payment receipt"}</span>
                    </label>
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${!file || uploading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-primary text-white hover:opacity-90"}`}
                  >
                    {uploading ? "Uploading..." : "Upload Proof"}
                  </button>
                </div>
              ) : (
                <div className="relative group overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                  <img
                    alt="Payment Receipt Preview"
                    className="w-full aspect-4/3 object-cover opacity-90 group-hover:opacity-100 transition-opacity bg-slate-50 dark:bg-slate-950"
                    src={data.paymentProof || "https://via.placeholder.com/400x300?text=No+Image"}
                  />
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 p-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">file_present</span>
                      <span>payment_proof_{reservationCode}.jpg</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* FOOTER INFO */}
            <div className="pt-4 pb-10">
              {data.status === "WAITING_CONFIRMATION" && (
                <div className="w-full bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  <span>Waiting for Confirmation</span>
                </div>
              )}
              <p className="text-center text-slate-400 text-xs mt-4">We will notify you via email once your booking status changes.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
