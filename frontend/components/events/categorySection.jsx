"use client";
import useFilterStore from "@/store/useFilterStore.js";
import { BsChevronRight, BsCheck2 } from "react-icons/bs";
import { useCategories } from "@/hooks/api/useCategories.js";
import {  useState } from "react";
const CategorySection = () => {
  const category = useFilterStore((state) => state.category);
  const { data, isPending , isLoading, error } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className=" rounded-[10px] px-3.5 py-5 hover:cursor-pointer"
      onClick={() => setIsOpen((p) => !p)}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">Category</p>
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
        {(isPending||isLoading) && <p>Loading...</p>}
        {error && <p>Something went wrong!</p>}
        {data?.categories.map((Category) => (
          <label
            key={Category._id}
            className="cursor-pointer flex justify-between items-center"
          >
            <input
              type="radio"
              name="category"
              value={Category._id}
              defaultChecked={category === Category._id}
              className="hidden peer"
            />
            <p
              className={`p-1 text-primaryText peer-checked:text-midnightGreen`}
            >
              {Category.name}
            </p>
            <BsCheck2 className="text-midnightGreen text-[20px] hidden peer-checked:block" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
