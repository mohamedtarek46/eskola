import { useCancelBooking } from "@/hooks/api/useBooking.js";

export default function ProfileBookingCard({ booking }) {
  const { mutateAsync: cancelBooking, isPending } =
    useCancelBooking();

  const handleCancel = async () => {
    try {
      await cancelBooking(booking._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border border-border p-4 rounded-xl bg-bg-light">
      {/* TITLE */}
      <h3 className="text-h4 text-text-primary">
        {booking.eventId?.title}
      </h3>

      {/* TICKETS */}
      <p className="text-text-secondary text-small mt-1">
        {booking.numberOfSeats} tickets ×{" "}
        {booking.eventId?.price}{" "}
        {booking.eventId?.currency}
      </p>

      {/* DATES */}
      <p className="text-text-primary text-small mt-1">
        Start Date:{" "}
        {new Date(
          booking.eventId?.startDateTime
        ).toDateString()}
      </p>

      <p className="text-text-primary text-small mt-1">
        End Date:{" "}
        {new Date(
          booking.eventId?.endDateTime
        ).toDateString()}
      </p>

      {/* LOCATION */}
      <p className="text-text-primary text-small mt-1">
        Event Location:{" "}
        {booking.eventId?.location?.address}
      </p>

      {/* EVENT STATUS */}
      <p className="text-text-primary text-small mt-1">
        Event Status: {booking.eventId?.status}
      </p>

      {/* TOTAL */}
      <p className="text-text-primary text-small mt-1 font-medium">
        Total: {booking.totalAmount}{" "}
        {booking.eventId?.currency}
      </p>

      {/* STATUS BADGES */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {/* BOOKING STATUS */}
        <span
          className={`
            text-small px-2 py-1 rounded
            ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {booking.status}
        </span>

        {/* PAYMENT STATUS */}
        <span
          className={`
            text-small px-2 py-1 rounded
            ${
              booking.paymentStatus === "paid"
                ? "bg-blue-100 text-blue-700"
                : booking.paymentStatus === "failed"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }
          `}
        >
          {booking.paymentStatus}
        </span>
      </div>

      {/* CANCELLED MESSAGE */}
      {(booking.status === "cancelled" ||
        booking.eventId?.status === "cancelled") && (
        <p className="text-text-muted text-small mt-2">
          Booking Cancelled
        </p>
      )}

      {/* CANCEL BUTTON */}
      {booking.status !== "cancelled" &&
        booking.eventId?.status !== "cancelled" && (
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="
              cursor-pointer mt-4 px-4 py-2 rounded-lg
              bg-danger text-white text-small
              hover:opacity-90 disabled:opacity-30
            "
          >
            {isPending
              ? "Cancelling..."
              : "Cancel Booking"}
          </button>
        )}
    </div>
  );
}