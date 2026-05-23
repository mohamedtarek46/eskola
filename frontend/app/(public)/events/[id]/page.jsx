"use client";
import EventHero from "@/components/events/eventHero.jsx";
import EventInfo from "@/components/events/eventInfo.jsx";
import BookingCard from "@/components/events/bookingCard.jsx";
import OrganizerCard from "@/components/events/organizerCard.jsx";
import { notFound } from "next/navigation";
import { use } from "react";
import { useGetEventById } from "@/hooks/api/useEvents.js";
import LoadingPage from "@/components/shared/loadingPage.jsx";

export default function Page({ params }) {
  const { id } = use(params);
  const {
    data,
    isLoading,
    isFetching,
    isPending,
    isError,
  } = useGetEventById(id);
  
  if (isLoading || isFetching || isPending) {
    return <LoadingPage/>;
  }
  const event = data.event;
  if (isError || !event ) {
    return notFound();
  }
  return (
    <div className="pb-20">
      <EventHero image={event.imageUrl} />
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <EventInfo event={event} />
            <OrganizerCard organizer={event.organizerId} />
          </div>
          {/* RIGHT */}
          <div>
            <BookingCard event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
