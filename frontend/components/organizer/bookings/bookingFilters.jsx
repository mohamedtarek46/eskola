"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
export default function BookingFilters({
  status,
  setStatus,
  search,
  setSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, setSearch]);
  return (
    <div className="bg-white border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1 border rounded-2xl border-primary">
        <Search className="w-4 h-4  absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />

        <input
          placeholder="Search attendee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10  py-2.5 rounded-xl  border-border outline-0"
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2.5 rounded-xl border border-border outline-0 cursor-pointer "
      >
        <option value="">All Statuses</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="cancelled">Cancelled</option>
        <option value="refunded">Refunded</option>
      </select>
    </div>
  );
}
