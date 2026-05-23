"use client";
import { useOrganizerDashboard } from "@/hooks/api/useOrganizer.js";
import StatsCards from "@/components/organizer/dashboard/statsCards.jsx";
import RecentBookings from "@/components/organizer/dashboard/recentBookings.jsx";
import LoadingPage from "@/components/shared/loadingPage";
const Page = () => {
  const { data, isLoading, isPending, isFetching ,isError } = useOrganizerDashboard();

  if (isLoading || isPending || isFetching) {
    return <LoadingPage />;
  }
  if (isError) {
    return <p className="text-center">Something went wrong!</p>;
  }

  const stats = data?.stats || {};
  const recentBookings = data?.recentBookings || [];

  return (
    <div className="container py-10 space-y-10">
      <StatsCards stats={stats} />

      <RecentBookings bookings={recentBookings} />
    </div>
  );
};

export default Page;
