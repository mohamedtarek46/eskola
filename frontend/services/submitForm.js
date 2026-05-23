import useFilterStore from "@/store/useFilterStore.js";

const submitForm = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const setCategory = useFilterStore.getState().setCategory;
  const setStartDateTime = useFilterStore.getState().setStartDateTime;
  const setEndDateTime = useFilterStore.getState().setEndDateTime;
  const setCity = useFilterStore.getState().setCity;
  const setMinPrice = useFilterStore.getState().setMinPrice;
  const setMaxPrice = useFilterStore.getState().setMaxPrice;
  const setSortBy = useFilterStore.getState().setSortBy;

  setCategory(formData.get("category")||"");
  setStartDateTime(formData.get("startDateTime")||"");
  setEndDateTime(formData.get("endDateTime")||"");
  setCity(formData.get("city")||"");
  setMinPrice(formData.get("minPrice")||"");
  setMaxPrice(formData.get("maxPrice")||"");
  setSortBy(formData.get("sortBy")||null);

  console.log(formData.get("sortBy"));
};
export default submitForm;