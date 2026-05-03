import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../auth/stores/auth.store";

import Footer from "../../../shared/ui/Footer";
import LoaderFetching from "../../../shared/ui/LoaderFetching";

import useMyBooking from "../hooks/useMyBooking";

import BookingHeader from "../components/BookingHeader";
import BookingFilters from "../components/BookingFilters";
import BookingGrid from "../components/BookingGrid";
import BookingPagination from "../components/BookingPagination";

function MyBooking() {
  const { user } = useAuthStore();

  const {
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    paginatedBookings,
    handleCancelBooking,

    currentPage,
    setCurrentPage,
    totalPages,
  } = useMyBooking();

  if (!user) return <Navigate to="/login" replace />;

  if (loading) return <LoaderFetching />;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <BookingHeader />

        <BookingFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <BookingGrid
          bookings={paginatedBookings}
          handleCancelBooking={handleCancelBooking}
        />

        <BookingPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>

      <Footer />
    </div>
  );
}

export default MyBooking;
