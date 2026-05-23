import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, numberOfSeats }) => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/bookings",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            numberOfSeats,
          }),
        },
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Booking failed");
      }
      return result;
    },

    onSuccess: (_, variables) => {
      toast.success("Booking created successfully");

      // refetch events/bookings
      queryClient.invalidateQueries({
        queryKey: ["event", variables.eventId],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
        exact: false,
      });
    },

    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};

export const useMyBookings = (userId, status) => {
  return useQuery({
    queryKey: ["my-bookings", userId, status],
    queryFn: async () => {
      const query = status ? `?status=${status}` : "";
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/bookings" + query,
        {
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }
      return res.json();
    },

    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useCancelBooking = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId) => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "cancel booking failed");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Booking cancelled");
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
        exact: false,
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};

export const useEventBookings = ({ eventId, status, search }) => {
  return useQuery({
    queryKey: ["event-bookings", eventId, status, search],

    queryFn: async () => {
      const params = new URLSearchParams();

      if (status) {
        params.append("status", status);
      }

      if (search) {
        params.append("search", search);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organizer/events/${eventId}/bookings?${params}`,
        {
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      return data;
    },
  });
};
