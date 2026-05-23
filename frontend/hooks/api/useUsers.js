import { useQueryClient ,useQuery ,useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/me",
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 0, 
    gcTime: 0, 
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
  });
};



export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      return res.json();
    },

    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
};