import { useEffect, useMemo, useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import toast from "react-hot-toast";

import { getMyReservationsRequest, cancelReservationRequest } from "../../reservations/api/reservations.service";

import { formatRupiah } from "../../../shared/utils/price.util";

export default function useMyBooking() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyReservationsRequest();

        const today = new Date();

        const mapped = res.data.map((item: any) => {
          let status = "";
          let statusColor = "";
          let dotColor = "";
          let helperText = "";

          const checkIn = new Date(item.checkInDate);
          checkIn.setHours(0, 0, 0, 0);

          const checkOut = new Date(item.checkOutDate);
          checkOut.setHours(0, 0, 0, 0);

          const stayFinished = today > checkOut;

          const beforeCheckin = today < checkIn;

          const ongoing = today >= checkIn && today <= checkOut;

          switch (item.status) {
            case "WAITING_PAYMENT":
              status = "Waiting Payment";
              statusColor = "bg-amber-100 text-amber-700";
              dotColor = "bg-amber-500";
              helperText = "Complete payment to secure your stay";
              break;

            case "WAITING_CONFIRMATION":
              status = "Waiting Confirmation";
              statusColor = "bg-blue-100 text-blue-700";
              dotColor = "bg-blue-500";
              helperText = "Host is reviewing your payment";
              break;

            case "PAID":
              if (beforeCheckin) {
                const days = differenceInCalendarDays(checkIn, today);

                status = "Upcoming";
                statusColor = "bg-sky-100 text-sky-700";
                dotColor = "bg-sky-500";
                helperText = days === 0 ? "Check-in today" : `Check-in in ${days} day${days > 1 ? "s" : ""}`;
              } else if (ongoing) {
                const daysLeft = differenceInCalendarDays(checkOut, today);

                status = "Ongoing Stay";
                statusColor = "bg-emerald-100 text-emerald-700";
                dotColor = "bg-emerald-500";
                helperText = daysLeft === 0 ? "Checkout today" : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`;
              } else {
                status = "Ready to Review";
                statusColor = "bg-violet-100 text-violet-700";
                dotColor = "bg-violet-500";
                helperText = "Tell others about your stay";
              }
              break;

            case "REVIEWED":
              status = "Completed";
              statusColor = "bg-slate-100 text-slate-600";
              helperText = "Thanks for your review";
              break;

            case "CANCELED":
              status = "Cancelled";
              statusColor = "bg-red-100 text-red-700";
              helperText = "Reservation cancelled";
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

            date: `${format(checkIn, "MMM dd")} - ${format(checkOut, "MMM dd, yyyy")}`,

            guests: item.guestCount || 2,

            status,
            statusColor,
            dotColor,
            helperText,

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

  const handleCancelBooking = async (id: string) => {
    try {
      toast.loading("Canceling booking...", { id: "cancel-booking" });

      await cancelReservationRequest(id);

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                status: "Cancelled",
                statusColor: "bg-red-100 text-red-700",
                dotColor: "",
                helperText: "Reservation cancelled",
                isCancelled: true,
                canReview: false,
              }
            : booking,
        ),
      );

      toast.success("Booking canceled successfully", {
        id: "cancel-booking",
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to cancel booking", { id: "cancel-booking" });
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch = booking.name.toLowerCase().includes(search.toLowerCase()) || booking.reservationCode.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter ? booking.status === statusFilter : true;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  return {
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    filteredBookings,
    paginatedBookings,

    currentPage,
    setCurrentPage,
    totalPages,

    handleCancelBooking,
  };
}
