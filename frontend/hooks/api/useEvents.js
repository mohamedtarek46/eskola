import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useGetEventById = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/events/" + id,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch event");
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetEvents = (filters = {}) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events?${query}`,
        {
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Failed to fetch events");

      return res.json();
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      return result;
    },

    onSuccess: () => {
      toast.success("Event created successfully");

      queryClient.invalidateQueries({
        queryKey: ["organizer-events"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["organizer-dashboard"],
        exact: false,
      });

      router.push("/organizer-events");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useUpdateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      return result;
    },
    onSuccess: (_, { id }) => {
      toast.success("Event updated successfully");
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      queryClient.invalidateQueries({
        queryKey: ["organizer-events"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["organizer-dashboard"],
        exact: false,
      });
      router.push("/organizer-events");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ( id ) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to delete event");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizer-events"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["organizer-dashboard"],
        exact: false,
      });
    },
  });
};
