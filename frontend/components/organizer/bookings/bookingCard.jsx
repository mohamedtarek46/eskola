export default function BookingCard({ booking }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 flex items-center justify-between gap-4">
      <div>
        <h4 className="font-semibold text-text-primary">
          {booking.userId?.firstName} {booking.userId?.lastName}
        </h4>

        <p className="text-small text-text-muted">
          {booking.userId?.email}
        </p>

        <p className="text-small text-text-muted mt-1">
          {booking.numberOfSeats} seats
        </p>
      </div>

      <div className="text-right">
        <p className="font-medium">
          ${booking.totalAmount}
        </p>

        <span className="text-small capitalize text-primary">
          {booking.status}
        </span>
      </div>
    </div>
  );
}