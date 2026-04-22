import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import api from "../../../../api/client.ts";
import { formatRupiah } from "../../../../shared/utils/price.util.ts";

export default function useOrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState("ALL");

  const [filterProperty, setFilterProperty] = useState("ALL");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/reservations/tenant");

        const mapped = res.data.data.map((item: any) => {
          let status = "";
          let statusClass = "";

          switch (item.status) {
            case "WAITING_PAYMENT":
              status = "Waiting Payment";
              statusClass = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
              break;

            case "WAITING_CONFIRMATION":
              status = "Waiting Confirmation";
              statusClass = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
              break;

            case "PAID":
              status = "Confirmed";
              statusClass = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
              break;

            case "CANCELED":
              status = "Cancelled";
              statusClass = "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
              break;

            default:
              status = item.status;
              statusClass = "bg-slate-100 text-slate-600";
          }

          return {
            id: item.id,
            code: item.reservationCode,
            property: item.roomType.property.name,
            room: item.roomNameSnapshot,
            guest: `${item.customer?.firstName || ""} ${item.customer?.lastName || ""}`.trim() || item.customer?.email || "Guest",
            checkIn: format(new Date(item.checkInDate), "MMM dd, yyyy"),
            checkOut: format(new Date(item.checkOutDate), "MMM dd, yyyy"),
            price: formatRupiah(Number(item.totalAmount)),
            status,
            statusClass,
            paymentProof: item.paymentProof,
            roomType: item.roomType,
          };
        });

        setOrders(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const uniqueProperties = useMemo(() => ["ALL", ...new Set(orders.map((o) => o.property))], [orders]);

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filterStatus === "ALL" || order.status === filterStatus;

    const matchProperty = filterProperty === "ALL" || order.property === filterProperty;

    return matchStatus && matchProperty;
  });

  const totalRevenue = orders.reduce((acc, o) => {
    if (o.status === "Confirmed") {
      return acc + Number(o.price.replace(/[^\d]/g, ""));
    }

    return acc;
  }, 0);

  const totalConfirmed = orders.filter((o) => o.status === "Confirmed").length;

  const totalPending = orders.filter((o) => o.status === "Waiting Payment" || o.status === "Waiting Confirmation").length;

  const totalCancelled = orders.filter((o) => o.status === "Cancelled").length;

  return {
    loading,
    filteredOrders,
    filterStatus,
    setFilterStatus,
    filterProperty,
    setFilterProperty,
    uniqueProperties,
    totalRevenue,
    totalConfirmed,
    totalPending,
    totalCancelled,
  };
}
