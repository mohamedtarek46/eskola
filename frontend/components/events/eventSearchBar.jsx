"use client";
import { useState, useEffect } from "react";
import useFilterStore from "@/store/useFilterStore.js";
const EventSearchBar = () => {
  const [input, setInput] = useState("");
  const setSearch = useFilterStore((state) => state.setSearch);
  useEffect(() => {
    let timer = setTimeout(() => {
      setSearch(input);
    }, 600);
    return () => clearTimeout(timer);
  }, [input,setSearch]);
  return (
    <div className="w-full flex flex-col gap-4 py-6">
      {/* Input */}
      <div
        className={`flex items-center h-13 px-4 rounded-full bg-white border transition-all
          ${input ? "border-purple-500 ring-2 ring-purple-200" : "border-primary "}`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Search events..."}
          maxLength={80}
          className="flex-1  bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default EventSearchBar;
