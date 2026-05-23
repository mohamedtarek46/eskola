import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
const useUploadImage = () => {
  const uploadImageRequest = async (file) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "Eskola/events");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        toast.error("Image upload failed");
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
      throw new Error("Image upload failed");
    }
  };

  return useMutation({
    mutationFn: uploadImageRequest,
  });
};
export default useUploadImage;