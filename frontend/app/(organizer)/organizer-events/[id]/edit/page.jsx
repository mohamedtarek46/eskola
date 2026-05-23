"use client";
import EventForm from "@/components/organizer/events/eventFrom.jsx";
import { notFound, useParams } from "next/navigation";
import { useGetEventById } from "@/hooks/api/useEvents.js";
import LoadingPage from "@/components/shared/loadingPage.jsx";
export default function Page() {
  const { id } = useParams();
  const { data, isLoading, isPending } = useGetEventById(id);
  if (isPending || isLoading) return <LoadingPage/>;
  if (!data.event) return notFound();
  return (
    <div className="py-10 bg-bg-light min-h-screen">
      <EventForm mode="edit" initialData={data.event} />
    </div>
  );
}
