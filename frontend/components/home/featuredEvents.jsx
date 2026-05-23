"use client";
import { useGetEvents } from "@/hooks/api/useEvents.js";
import EventCardList from "../events/eventListCard.jsx";

export default function FeaturedEvents() {
  const { data, isLoading, isError, isFetching, isPending } = useGetEvents({
    limit: 3,
    startDateTime: new Date(),
    sortBy: "popularity",
    order: "des",
    status: "published",
  });


  return (
    <section className="py-16 container ">
      <h2 className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-6">
        Featured Events
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
        <div className="grid md:grid-cols-3 gap-5">
          {data.events.map((e, i) => (
            <EventCardList key={i} event={e} />
          ))}
        </div>
      )}
    </section>
  );
}
