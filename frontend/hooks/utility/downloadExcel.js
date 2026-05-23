import toast from "react-hot-toast";
const downloadExcel = async ({ eventId, status, search }) => {
  const query = new URLSearchParams();
  if (status) query.append("status", status);
  if (search) query.append("search", search);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/organizer/events/${eventId}/bookings/excel?${query.toString()}`,
    { credentials: "include" }
  );

  // Check for non-OK responses before treating as a blob
  if (!res.ok) {
    const error = await res.json();
    toast.error(error.message || "Failed to download Excel file");
    throw new Error(error.message || "Failed to download Excel file");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bookings.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
  toast.success("Excel file downloaded successfully");
};

export default downloadExcel;