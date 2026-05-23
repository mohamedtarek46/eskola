"use client";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { useState } from "react";
import { useCreateBooking } from "@/hooks/api/useBooking.js";

import { Plus, Minus } from "lucide-react";
export default function BookingCard({ event }) {
  const user = useUserStore((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const { mutateAsync, isPending } = useCreateBooking();
  const total = quantity * event.price;
  const handleBooking = async () => {
    try {
      await mutateAsync({
        eventId: event._id,
        numberOfSeats: quantity,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sticky top-24 border border-gray-400 rounded-3xl p-6 shadow-sm bg-white">
      <h2 className="text-2xl font-bold">Book Tickets</h2>
      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm text-gray-500">Ticket Price</p>

          <h3 className="text-3xl font-bold mt-1">${event.price}</h3>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-3">Quantity</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="p-2 rounded-full border cursor-pointer"
            >
              <Minus />
            </button>

            <span className="text-lg font-semibold">{quantity}</span>

            <button
              onClick={() =>
                setQuantity((prev) =>
                  prev < event.availableSeats ? prev + 1 : prev,
                )
              }
              className="p-2 rounded-full border cursor-pointer"
            >
              <Plus />
            </button>
          </div>
        </div>

        <div className="border-t pt-5 flex items-center justify-between">
          <span className="text-gray-500">Total</span>

          <span className="text-2xl font-bold">${total}</span>
        </div>
        {user && isPending && (
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500">Booking...</span>
          </div>
        )}
 

        {user && (new Date(event.endDateTime) < new Date()) && (
          <div className="w-full py-3 rounded-2xl bg-red-200 text-center text-white font-medium cursor-not-allowed">
            Event has ended
          </div>
        )}
        {user && !isPending && ((new Date(event.endDateTime) > new Date())) && (
          <button
            onClick={handleBooking}
            disabled={isPending}
            className="cursor-pointer w-full py-3 rounded-2xl bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Book Now
          </button>
        )}
        {!user && (
          <Link href="/auth/login">
            <button className="cursor-pointer w-full py-3 rounded-2xl bg-black text-white font-medium hover:bg-gray-800 transition">
              Login to Book
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
