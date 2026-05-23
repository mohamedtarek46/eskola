import submitForm from "./submitForm.js";
import useFilterStore from "../store/useFilterStore.js";

jest.mock("@/store/useFilterStore.js", () => ({
  getState: jest.fn(),
}));

describe("submitForm", () => {
  test("should update filters from form data", () => {
    const setCategory = jest.fn();
    const setStartDateTime = jest.fn();
    const setEndDateTime = jest.fn();
    const setCity = jest.fn();
    const setMinPrice = jest.fn();
    const setMaxPrice = jest.fn();
    const setSortBy = jest.fn();

    useFilterStore.getState.mockReturnValue({
      setCategory,
      setStartDateTime,
      setEndDateTime,
      setCity,
      setMinPrice,
      setMaxPrice,
      setSortBy,
    });

    const form = document.createElement("form");

    form.innerHTML = `
      <input name="category" value="music" />
      <input name="startDateTime" value="2026-01-01" />
      <input name="endDateTime" value="2026-01-02" />
      <input name="city" value="alex" />
      <input name="minPrice" value="100" />
      <input name="maxPrice" value="500" />
      <input name="sortBy" value="date" />
    `;

    const event = { preventDefault: jest.fn(), target: form };

    submitForm(event);

    expect(setCategory).toHaveBeenCalledWith("music");
    expect(setCity).toHaveBeenCalledWith("alex");
    expect(setSortBy).toHaveBeenCalledWith("date");
    expect(setStartDateTime).toHaveBeenCalledWith("2026-01-01");
    expect(setEndDateTime).toHaveBeenCalledWith("2026-01-02");
    expect(setMinPrice).toHaveBeenCalledWith("100");
    expect(setMaxPrice).toHaveBeenCalledWith("500");
  });
});