import toast from "react-hot-toast";
export const loginUser = async (data) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    toast.error(result.message || "Login failed");
    throw new Error(result.message || "Login failed");
  }
  if (!result.user && result.message) {
    toast.error(result.message);
    throw new Error(result.message);
  }
  if (result.user) {
    toast.success("Login successful");
  }
  return result;
};

export const registerUser = async (data) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    toast.error(result.message || "Register failed");
    throw new Error(result.message || "Register failed");
  }

  if (!result.user && result.message) {
    toast.error(result.message);
    throw new Error(result.message);
  }
  if (result.user) {
    toast.success("Account created successfully");
  }

  return result;
};

export const logoutUser = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      },
    );
    const result = await res.json();
    if (!res.ok) {
      toast.error(result.message || "Register failed");
      throw new Error(result.message || "Register failed");
    }
    toast.success("Logout successful");
    return result;
  } catch (err) {
    toast.error("Logout failed");
    console.log(err);
  }
};

export const getMe = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    });
    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
