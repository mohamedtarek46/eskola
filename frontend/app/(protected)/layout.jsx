"use client";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore.js";
import { useEffect } from "react";
import LoadingPage from "@/components/shared/loadingPage.jsx";
const Layout = ({ children }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [router, user]);

  if (user) {
    return <div>{children}</div>;
  }
  return <LoadingPage/>;
};
export default Layout;
