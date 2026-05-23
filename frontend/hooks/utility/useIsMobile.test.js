import { renderHook, act } from "@testing-library/react";
import useIsMobile from "./useIsMobile.js";

describe("useIsMobile", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should return false for desktop", () => {
    global.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  test("should return true for mobile", () => {
    global.innerWidth = 500;

    const { result } = renderHook(() => useIsMobile());

    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });
});
