import { create } from "zustand";

const defaultState = {
  search: "",
  page: 1,
  limit: 9,
  category: "",
  startDateTime: "",
  endDateTime: "",
  city: "",
  minPrice: "",
  maxPrice: "",
  sortBy: null, //Date Price Popularity
};

const useFilterStore = create((set) => ({
  ...defaultState,

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setStartDateTime: (startDateTime) => set({ startDateTime }),
  setEndDateTime: (endDateTime) => set({ endDateTime }),
  setCity: (city) => set({ city }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setSortBy: (sortBy) => set({ sortBy }),

  setClear: () => set(defaultState),
}));

export default useFilterStore;