"use client";
import EventCard from "./eventCard.jsx";
import { useRouter } from "next/navigation";
export default function EventsList({ events }) {
  const router = useRouter();
  if (!events?.length) {
    return <p className="text-gray-400 text-sm">No events created yet.</p>;
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800">My Events</h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/70"
          onClick={() => router.push("/organizer-events/create")}
        >
          Create Event
        </button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
