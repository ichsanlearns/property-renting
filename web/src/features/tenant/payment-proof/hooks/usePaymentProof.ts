import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../../api/client.ts";

export default function usePaymentProof(code: string, navigate: any) {
  const [data, setData] = useState<any>(null);
  const [note, setNote] = useState("");
  const [loadingApprove, setLoadingApprove] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get("/reservations/tenant");

      const found = res.data.data.find((item: any) => item.reservationCode === code);

      setData(found);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async () => {
    try {
      setLoadingApprove(true);

      await api.patch("/payments/confirm", {
        reservationId: data.id,
      });

      setData((prev: any) => ({
        ...prev,
        status: "PAID",
      }));

      toast.success("Payment approved successfully!");

      setTimeout(() => {
        navigate("/tenant/orderlist");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve payment");
    } finally {
      setLoadingApprove(false);
    }
  };

  const handleReject = async () => {
    try {
      await api.patch("/payments/reject", {
        reservationId: data.id,
        reason: note,
      });

      setData((prev: any) => ({
        ...prev,
        status: "REJECTED",
        rejectionReason: note,
      }));

      toast.success("Payment rejected!");

      setTimeout(() => {
        navigate("/tenant/orderlist");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject payment");
    }
  };

  return {
    data,
    note,
    setNote,
    loadingApprove,
    handleApprove,
    handleReject,
  };
}
