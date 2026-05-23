import BookingCard from "./bookingCard.jsx";

export default function BookingsList({ bookings, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20 w-full ">
        <div className="size-10 border-t animate-spin rounded-full" />
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="bg-white border border-border rounded-2xl p-10 text-center text-text-muted">
        No bookings found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
