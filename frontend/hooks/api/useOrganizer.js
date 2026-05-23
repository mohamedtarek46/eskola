import { useQuery } from "@tanstack/react-query";

export const useOrganizerDashboard = () => {
  return useQuery({
    queryKey: ["organizer-dashboard"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organizer/dashboard`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
};

export const useOrganizerEvents = () => {
  return useQuery({
    queryKey: ["organizer-events"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organizer/events`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
};