import { useMyBookings } from "@/hooks/api/useBooking.js";
import ProfileBookingCard from "./profileBookingCard.jsx";

export default function BookingsList({ userId }) {
  const { data: bookingsData, isLoading, isPending ,isError } =
    useMyBookings(userId);

  const bookings = bookingsData || [];

  if (isLoading || isPending) {
    return (
      <div className="container py-10 text-center text-text-muted">
        Please wait Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="container py-10 text-center text-text-muted">
        Something went wrong!
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <p className="mt-6 text-text-muted">
        No bookings yet.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {bookings.map((b) => (
        <ProfileBookingCard key={b._id} booking={b} />
      ))}
    </div>
  );
}



