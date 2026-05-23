"use client";

import { User, Ticket, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

const statusStyles = {
  confirmed: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  cancelled: "bg-red-50 text-red-500 border border-red-100",
  default: "bg-amber-50 text-amber-600 border border-amber-100",
};

export default function RecentBookings({ bookings }) {
  if (!bookings?.length) {
    return (
      <p className="text-gray-400 text-sm">No recent bookings.</p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
        <Link
          href="/organizer-events"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
        >
          <MdDashboard className="size-4 text-violet-500" />
          My events
        </Link>
      </div>

            <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border border-gray-100 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Name + Status row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-50 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-violet-500" />
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  {b.userId?.firstName} {b.userId?.lastName}
                </p>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  statusStyles[b.status] ?? statusStyles.default
                }`}
              >
                {b.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-1 pl-9">
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 shrink-0" />
                {b.eventId?.title} &middot; {b.numberOfSeats} tickets
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 shrink-0" />
                Total: ${b.totalAmount}
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}