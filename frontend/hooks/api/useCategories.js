import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/categories",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return res.json();
    },
  });
};
