import BookingCard from "./BookingCard";

export default function BookingGrid({ bookings, handleCancelBooking }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.length === 0 && <p className="text-center text-slate-500 col-span-full">No bookings found 😢</p>}

      {bookings.map((booking: any) => (
        <BookingCard key={booking.id} booking={booking} handleCancelBooking={handleCancelBooking} />
      ))}
    </div>
  );
}
