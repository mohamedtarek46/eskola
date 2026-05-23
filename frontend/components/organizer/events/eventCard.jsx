import { Armchair, BookOpen, CalendarDays, Pencil, Users } from "lucide-react";
import Link from "next/link";
import { useDeleteEvent, useUpdateEvent } from "@/hooks/api/useEvents.js";
import Swal from "sweetalert2";

const statusStyles = {
  published: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  cancelled: "bg-red-50 text-red-500 border border-red-100",
  default: "bg-amber-50 text-amber-600 border border-amber-100",
};

const EventCard = ({ event }) => {
  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteEvent();
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await updateEvent({ id: event._id, data: { status: "cancelled" } });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(event._id);

        Swal.fire({
          title: "Deleted!",
          text: "Event has been deleted successfully.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error?.message || "Something went wrong.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div
      key={event._id}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-gray-100 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* LEFT */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-gray-800">{event.title}</h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" />
            {new Date(event.startDateTime).toDateString()}
          </span>

          <span className="flex items-center gap-1">
            <Armchair className="w-3.5 h-3.5" />
            {event.availableSeats} seats available
          </span>

          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {event.capacity - event.availableSeats} Booked
          </span>
        </div>

        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium inline-block ${
            statusStyles[event.status] ?? statusStyles.default
          }`}
        >
          {event.status}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/organizer-events/${event._id}/edit`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-150"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </Link>

        <Link
          href={`/organizer-events/${event._id}/bookings`}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-150"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Bookings
        </Link>

        <button
          onClick={handleCancel}
          disabled={isUpdating || event.status === "cancelled"}
          className="cursor-pointer text-white flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-xl bg-gray-700 hover:bg-gray-800 transition-colors duration-150 disabled:opacity-50"
        >
          {isUpdating ? "Canceling..." : "Cancel"}
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="cursor-pointer text-white flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-red-200 rounded-xl bg-red-500 hover:bg-red-600 transition-colors duration-150 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
