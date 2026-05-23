"use client";
import { BsChevronRight, BsCheck2 } from "react-icons/bs";
import { useGetEvents } from "@/hooks/api/useEvents.js";
import { useState, useMemo } from "react";

const LocationSection = () => {
  const { data, isPending, isLoading, error } = useGetEvents();
  const [isOpen, setIsOpen] = useState(false);
  
  const uniqueCities = useMemo(() => {
    if (!data?.events) return [];
    
    const cityMap = new Map();
    
    data.events.forEach(event => {
      const city = event.location.city;
      if (city) {
        const cityKey = city.toLowerCase();
        if (!cityMap.has(cityKey)) {
          cityMap.set(cityKey, city); 
        }
      }
    });
    
    return Array.from(cityMap.values()).sort((a, b) => 
      a.localeCompare(b, 'ar', { sensitivity: 'base' })
    );
  }, [data]);

  
  return (
    <div
      className="rounded-[10px] px-3.5 py-5 hover:cursor-pointer"
      onClick={() => setIsOpen((p) => !p)}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">City</p>
        <div className="flex items-center gap-1 text-midnightGreen">
          <BsChevronRight
            className={`text-gray-500 text-[20px] duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out 
          ${isOpen ? "max-h-125 opacity-100 mt-4.5" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        {(isPending || isLoading) && <p>Loading...</p>}
        {error && <p>Something went wrong!</p>}
        {uniqueCities.map((city, i) => (
          <label
            key={i}
            className="cursor-pointer flex justify-between items-center"
          >
            <input
              type="radio"
              name="city"
              value={city}
              className="hidden peer"
            />
            <p className={`p-1 text-primaryText peer-checked:text-midnightGreen`}>
              {city}
            </p>
            <BsCheck2 className="text-midnightGreen text-[20px] hidden peer-checked:block" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default LocationSection;