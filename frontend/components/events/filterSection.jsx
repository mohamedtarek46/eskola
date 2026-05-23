"use client";
import { useState } from "react";
import { ListFilter } from "lucide-react";
import { RiCloseLargeFill } from "react-icons/ri";

import FilterForm from "./filterForm.jsx";
import useIsMobile from "@/hooks/utility/useIsMobile.js";

const FilterSection = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-3 right-5.75 bg-black rounded-full p-2.75 bg-midnightGreen  z-50 md:hidden cursor-pointer"
        onClick={() => setIsOpen((p) => !p)}
      >
        <ListFilter className="text-white size-6" />
      </div>

      {isMobile && (
        <div
          className={`
            fixed inset-0  px-5 py-6 pt-20 md:hidden z-40 bg-white overflow-auto
            transition-all duration-300 
            ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-10 pointer-events-none"
            }
          `}
        >
          <div className="flex justify-between items-center">
            <p className="font-medium font-space-grotesk text-secondaryText mb-3">
              Sort and Filter
            </p>

            <RiCloseLargeFill
              className="text-secondaryText cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <FilterForm closeForm={() => setIsOpen(false)} />
        </div>
      )}

      {!isMobile && (
        <div className="hidden md:block md:mt-16">
          <p className="font-medium font-space-grotesk text-secondaryText mb-3">
            Sort and Filter
          </p>

          <FilterForm />
        </div>
      )}
    </>
  );
};

export default FilterSection;