"use client";
import { useState } from "react";
import { useMe } from "@/hooks/api/useUsers.js";

import ProfileHeader from "@/components/profile/profileHeader.jsx";
import ProfileTabs from "@/components/profile/profileTabs.jsx";
import ProfileForm from "@/components/profile/profileForm.jsx";
import BookingsList from "@/components/profile/bookingsList.jsx";
import LoadingPage from "@/components/shared/loadingPage.jsx";

export default function ProfilePage() {
  const { data, isLoading ,isPending ,isError  } = useMe();
  const user = data?.user;


  const [tab, setTab] = useState("profile");

  if (isLoading || isPending) {
    return (
      <LoadingPage/>
    );
  }
  if (isError) {
    return <p className="text-center">Something went wrong!</p>;
  }


  return (
    <div className="container py-10">
      <ProfileHeader user={user} />

      <ProfileTabs tab={tab} setTab={setTab} />

      {tab === "profile" && (
        <ProfileForm user={user}  />
      )}

      {tab === "bookings" && (
        <BookingsList userId={user._id} /> 

      )}
    </div>
  );
}