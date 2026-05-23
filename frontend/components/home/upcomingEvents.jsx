"use client";
import EventCardList from "../events/eventListCard.jsx";
import { useGetEvents } from "@/hooks/api/useEvents.js";
const upcoming = [
  { title: "Music Night", date: "July 1", location: "Cairo", price: 30 },
  { title: "Business Summit", date: "July 5", location: "Giza", price: 80 },
];

export default function UpcomingEvents() {
  const { data, isLoading, isError, isFetching, isPending } = useGetEvents({
    limit: 2,
    startDateTime: new Date(),
    sortBy: "startDateTime",
    order: "asc",
  });
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-6">
          Upcoming Events
        </h2>

        {(isLoading || isFetching || isPending) && (
          <div className="flex justify-center items-center h-30">
            <div className="w-12 h-12 border-t border-gray-800 rounded-full animate-spin" />
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center h-30">
            <p className="text-sm text-red-400 mt-1.5 ">Something went wrong</p>
          </div>
        )}
        {data && data.events.length === 0 && (
          <div className="flex justify-center items-center h-30">
            <p className="text-sm text-gray-400 mt-1.5 ">
              No featured events found
            </p>
          </div>
        )}
        {data && data.events.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {data.events.map((e) => (
              <EventCardList key={e._id.toString()} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
