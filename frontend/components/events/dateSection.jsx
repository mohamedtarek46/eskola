"use client";

import { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";

const DateSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");


  return (
    <div className="px-3.5 py-5">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((p) => !p)}
      >
        <p className="text-sm font-bold">Date</p>

        <BsChevronRight
          className={`text-gray-500 text-[20px] duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>

      {/* Content */}
      <div
        className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-96 mt-4.5 opacity-100" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        {/* Start */}
        <div>
          <label className="text-xs text-gray-500">Start Date</label>
          <input
            name="startDateTime"
            type="date"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            className="w-full border outline-0 rounded-lg p-2 text-sm"
          />
        </div>

        {/* End */}
        <div>
          <label className="text-xs text-gray-500">End Date</label>
          <input
            name="endDateTime"
            type="date"
            value={endDateTime}
            min={startDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            className="w-full border outline-0 rounded-lg p-2 text-sm"
          />
        </div>

        {/* Error
        {error && (
          <p className="text-red-500 text-xs font-medium">{error}</p>
        )} */}
      </div>
    </div>
  );
};

export default DateSection;