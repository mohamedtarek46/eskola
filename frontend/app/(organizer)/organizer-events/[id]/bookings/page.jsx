"use client";
import SeatIndicator from "@/components/events/seatIndicator.jsx";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetEventById } from "@/hooks/api/useEvents.js";
import { useEventBookings } from "@/hooks/api/useBooking.js";
import downloadExcel from "@/hooks/utility/downloadExcel.js";
import BookingFilters from "@/components/organizer/bookings/bookingFilters.jsx";
import BookingsList from "@/components/organizer/bookings/bookingsList.jsx";
import LoadinPage from "@/components/shared/loadingPage.jsx";
import {notFound} from "next/navigation";
export default function EventBookingsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const { data: evnetData, isLoading: DataLoading ,isPending:DataPending ,isError: DataError } = useGetEventById(
    params.id,
  );
  const { data, isLoading ,isPending,isError } = useEventBookings({
    eventId: params.id,
    status,
    search,
  });
  const handleDownloadExcel = async () => {
    try {
      setLoading(true);
      await downloadExcel({
        eventId: params.id,
        status,
        search,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading || DataLoading ||DataPending ||isPending) {
    return <LoadinPage />;
  }
  if (DataError || isError) {
    return notFound();
  }
  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-h2 text-text-primary">
            {evnetData?.event.title} Event Bookings
          </h1>
          <p className="text-text-muted mt-1">Manage attendees and bookings</p>
        </div>

        {loading ? (
          <button
            disabled
            className="text-white px-4 py-2 rounded-lg bg-primary/70 w-full sm:w-auto"
          >
            Downloading Excel...
          </button>
        ) : (
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/70 w-full sm:w-auto"
            onClick={handleDownloadExcel}
          >
            Download Excel
          </button>
        )}
      </div>

      <BookingFilters
        status={status}
        setStatus={setStatus}
        search={search}
        setSearch={setSearch}
      />
      <SeatIndicator
        availableSeats={evnetData?.event.availableSeats}
        totalSeats={evnetData?.event.capacity}
      />
      <BookingsList bookings={data || []} isLoading={isLoading} />
    </div>
  );
}
