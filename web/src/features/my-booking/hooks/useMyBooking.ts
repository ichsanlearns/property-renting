import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

import { getMyReservationsRequest } from "../../reservations/api/reservations.service";
import { formatRupiah } from "../../../shared/utils/price.util";

export default function useMyBooking() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyReservationsRequest();

        const mapped = res.data.map((item: any) => {
          let status = "";
          let statusColor = "";
          let dotColor = "";

          const today = new Date();
          const checkOutDate = new Date(item.checkOutDate);

          const stayFinished = checkOutDate < today;

          switch (item.status) {
            case "WAITING_PAYMENT":
              status = "Waiting for Payment";
              statusColor = "bg-amber-100 text-amber-700";
              dotColor = "bg-amber-500";
              break;

            case "WAITING_CONFIRMATION":
              status = "Waiting for Confirmation";
              statusColor = "bg-blue-100 text-blue-700";
              dotColor = "bg-blue-500";
              break;

            case "PAID":
              status = stayFinished ? "Ready to Review" : "Confirmed";
              statusColor = stayFinished ? "bg-violet-100 text-violet-700" : "bg-emerald-100 text-emerald-700";
              dotColor = stayFinished ? "bg-violet-500" : "bg-emerald-500";
              break;

            case "REVIEWED":
              status = "Completed";
              statusColor = "bg-slate-100 text-slate-600";
              break;

            case "CANCELED":
              status = "Cancelled";
              statusColor = "bg-red-100 text-red-700";
              break;

            default:
              status = item.status;
              statusColor = "bg-slate-100 text-slate-600";
          }

          return {
            id: item.id,
            reservationCode: item.reservationCode,

            name: item.roomType.property.name,
            type: item.roomNameSnapshot,

            price: formatRupiah(Number(item.totalAmount)),

            date: `${format(new Date(item.checkInDate), "MMM dd")} - ${format(new Date(item.checkOutDate), "MMM dd, yyyy")}`,

            guests: item.guestCount || 2,

            status,
            statusColor,
            dotColor,

            img: item.roomType.roomTypeImages?.[0]?.imageUrl || "https://via.placeholder.com/300",

            isCancelled: item.status === "CANCELED",
            isReviewed: item.status === "REVIEWED",

            canReview: item.status === "PAID" && stayFinished,
          };
        });

        setBookings(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch = booking.name.toLowerCase().includes(search.toLowerCase()) || booking.reservationCode.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter ? booking.status === statusFilter : true;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  return {
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredBookings,
  };
}
