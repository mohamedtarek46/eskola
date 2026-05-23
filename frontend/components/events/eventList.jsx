"use client";
import { useGetEvents } from "@/hooks/api/useEvents.js";
import dynamic from "next/dynamic";
import useFilterStore from "@/store/useFilterStore.js";
const EventCard = dynamic(() => import("./eventListCard.jsx"), {
  ssr: false,
});
const Pagination = dynamic(() => import("./pagination.jsx"), {
  ssr: false,
});

const Skeleton = dynamic(() => import("./skeleton.jsx"), {
  ssr: false,
});

const EventsList = () => {
  const filters = useFilterStore((state) => state);
  const { data, isPending, isLoading, isError } = useGetEvents(filters);

  if (isError) return <p className="text-center">Something went wrong!</p>;
  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-3.75 gap-y-3.75 md:gap-y-6 md:gap-x-10 ">
        {(isPending || isLoading) && <Skeleton />}
        {data && data?.events.map((e) => <EventCard key={e._id} event={e} />)}
      </div>
      {!(isPending || isLoading) && (
        <Pagination pagination={data?.pagination} />
      )}
    </>
  );
};

export default EventsList;
