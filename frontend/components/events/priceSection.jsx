"use client";
import { useMemo, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaChevronRight } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";

const PriceSection = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isOpen, setOpen] = useState(false);

  const sliderStyles = useMemo(
    () => ({
      track: {
        backgroundColor: "#000",
        height: 4,
      },
      handle: {
        backgroundColor: "#000",
        borderColor: "#000",
        width: 20,
        height: 20,
        marginTop: -8,
        opacity: 1,
      },
      rail: {
        backgroundColor: "#e5e5e5",
        height: 4,
      },
    }),
    [],
  );

  return (
    <div className="w-full max-w-md bg-white ">
      <input
        type="number"
        className="hidden"
        name="minPrice"
        value={priceRange[0]}
        onChange={(e) => e.preventDefault()}
      />
      <input
        type="number"
        className="hidden"
        name="maxPrice"
        value={priceRange[1]}
        onChange={(e) => e.preventDefault()}
      />
      <div
        className="px-3.5 py-5 hover:cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold">Price</p>
          <div className="flex items-center gap-1 text-midnightGreen">
            <BsChevronRight
              className={`text-gray-500 text-[20px] duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {
        <div
          className={`overflow-hidden transition-all duration-300 w-full  px-5 animate-fadeIn  flex justify-center`}
          style={{
            maxHeight: isOpen ? "200px" : "0",
          }}
        >
          <div className="relative h-11 mt-2 w-full  lg:w-61.75">
            <div
              className="absolute z-20 top-4 -translate-x-1/2 "
              style={{ left: `${(priceRange[0] / 1000) * 100}%` }}
            >
              <span className="text-lg font-medium whitespace-nowrap">
                {priceRange[0]}
              </span>
            </div>
            <div
              className="absolute top-4 translate-x-[-59%] "
              style={{ left: `${(priceRange[1] / 1000) * 100}%` }}
            >
              <span className="text-lg font-medium whitespace-nowrap">
                {priceRange[1]}
              </span>
            </div>

            <Slider
              range
              min={0}
              max={1000}
              step={1}
              pushable={50}
              value={priceRange}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setPriceRange(value);
                }
              }}
              styles={sliderStyles}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default PriceSection;
