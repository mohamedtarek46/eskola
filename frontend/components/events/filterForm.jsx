"use client";
import dynamic from "next/dynamic";
import { BsChevronRight } from "react-icons/bs";
const SortSection = dynamic(() => import("./sortSection.jsx"), { ssr: false });
const CategorySection = dynamic(() => import("./categorySection.jsx"), { ssr: false });
const LocationSection = dynamic(() => import("./locationSection.jsx"), { ssr: false });
const PriceSection = dynamic(() => import("./priceSection.jsx"), { ssr: false });
const DateSection = dynamic(() => import("./dateSection.jsx"), { ssr: false });
import submitFromSection from "@/services/submitForm.js";
import useFilterStore from "@/store/useFilterStore.js";
const FilterForm = ({ closeForm }) => {
  const setClear = useFilterStore((state) => state.setClear);
  return (
    <form
      action=""
      className="mt-5 space-y-3  font-poppins h-full flex-col flex justify-between md:block md:h-auto"
      onSubmit={(e) => {
        submitFromSection(e);
        if (closeForm) closeForm();
      }}
    >
      <div>
        <SortSection />
        <CategorySection />
        <LocationSection />
        <PriceSection />
        <DateSection />
      
      </div>

      <div className="flex justify-between mb-8 md:mb-0">
        <button
          type="reset"
          className="font-semibold hover:cursor-pointer"
          onClick={() => {
            setClear();
            if (closeForm) closeForm();
          }}
        >
          Clear All
        </button>
        <button className="bg-primary py-4 px-8 text-white rounded-xl font-poppins flex gap-2.5 items-center hover:cursor-pointer hover:scale-105 duration-200">
          <p>Apply</p>
          <BsChevronRight className="text-white" />
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
