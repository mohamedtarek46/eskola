"use client";
import { BsChevronRight, BsCheck2 } from "react-icons/bs";
import { useCallback, useMemo, useState } from "react";
const SortMap = new Map([
  ["Date", "startDateTime"],
  ["Price", "price"],
  ["Popularity", "popularity"],
]);
const SortSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="  px-3.5 py-5 hover:cursor-pointer"
      onClick={() => setIsOpen((p) => !p)}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">Sort By</p>
        <div className="flex items-center gap-1 text-midnightGreen">
          <BsChevronRight
            className={`text-gray-500 text-[20px] duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={` space-y-2 overflow-hidden transition-all duration-300 ease-in-out 
          ${isOpen ? "max-h-125 opacity-100 mt-4.5" : "max-h-0 opacity-0 mt-0"}
          `}
      >
        {[...SortMap.entries()].map(([label, val], i) => (
          <label
            key={i}
            className="cursor-pointer flex justify-between items-center"
          >
            <input
              type="radio"
              name="sortBy"
              value={val}
              defaultChecked={val === ""}
              className="hidden peer"
            />
            <p
              className={`p-1 text-primaryText peer-checked:text-midnightGreen`}
            >
              {label}
            </p>
            <BsCheck2 className="text-midnightGreen text-[20px] hidden peer-checked:block" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SortSection;
