"use client";

import Image from "next/image";
import { useState, memo } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Users, MapPin, CalendarRange } from "lucide-react";
import { BiCategoryAlt } from "react-icons/bi";
const EventCard = memo(({ event }) => {
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      router.push(`/events/${event._id}`);
    });
  };
  return (
    <div
      onClick={(e) => handleClick(e)}
      className="cursor-pointer relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {isPending && (
        <div className="inset-0 bg-white/50 z-50 absolute rounded-2xl flex justify-center items-center">
          <div className="size-10 border-t-2 animate-spin rounded-full opacity-100" />
        </div>
      )}
      <div className="relative h-58 md:h-80 rounded-2xl overflow-hidden">
        <Image
          src={event.imageUrl}
          alt="Product"
          className="z-1"
          fill
          onError={() => {
            setError(true);
          }}
        />
        {error && (
          <div className="absolute inset-0 z-100 flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-900/70 backdrop-blur-sm text-white">
            <h3 className="text-sm font-semibold">Failed to load image</h3>
            <p className="text-xs text-gray-300">Please try again later</p>
          </div>
        )}
        <div className="absolute inset-0 bg-white z-0 flex justify-center items-center">
          <div className="size-10 border-t animate-spin rounded-full" />
        </div>
      </div>
      <div className="p-3 pb-8">
        <p className="text-[16px] font-semibold font-inter mt-1 md:text[15px]">
          {event.title}
        </p>
        <div className="text-xs flex gap-x-2 font-semibold font-inter text-gray-500 mt-1">
          <BiCategoryAlt className="size-4 " />
          {event.categoryId.name}
        </div>
        <div className="text-xs flex gap-x-2 font-semibold font-inter text-gray-500 mt-1">
          <CalendarRange className="size-4 " />
          {new Date(event.startDateTime).toLocaleString()}
        </div>
        <div className="text-xs flex gap-x-2 font-semibold font-inter text-gray-500 mt-1">
          <MapPin className="size-4 " />
          {event.location.city}
        </div>
        <div className="text-xs flex gap-x-2 font-semibold font-inter text-gray-500 mt-1">
          <Users className="size-4 " />
          {event.capacity - event.availableSeats}
        </div>
        <div className="flex justify-between absolute bottom-2 right-2">
          <p className="text-[13px] font-semibold font-inter md:text-[17px]">
            {event.price} {event.currency}
          </p>
        </div>
      </div>
    </div>
  );
});
EventCard.displayName = "EventCard";
export default EventCard;
