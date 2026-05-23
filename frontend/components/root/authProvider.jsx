"use client";
import { useEffect, useState } from "react";
import { getMe } from "@/services/auth.js";
import useUserStore from "@/store/userStore.js";
import LoadingPage from "../shared/loadingPage.jsx";
export default function AuthProvider({ children }) {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getMe();

        if (result?.user) {
          setUser(result.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  if (loading) {
    return <LoadingPage />;
  }

  return children;
}
