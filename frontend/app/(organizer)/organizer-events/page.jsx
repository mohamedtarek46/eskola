"use client";
import { useOrganizerEvents } from "@/hooks/api/useOrganizer.js";
import EventsList from "@/components/organizer/events/eventsList.jsx";
import LoadingPage from "@/components/shared/loadingPage";
import { notFound } from "next/navigation";
const Page = () => {
  const { data, isLoading, isError, isFetching, isPending } =
    useOrganizerEvents();

  if (isLoading || isFetching || isPending) {
    return <LoadingPage />;
  }
  if (isError) {
    return notFound();
  }
  return (
    <div className="container py-10 space-y-10">
      <EventsList events={data} />
    </div>
  );
};

export default Page;
