"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useCreateEvent, useUpdateEvent } from "@/hooks/api/useEvents.js";
import useUploadImage from "@/hooks/utility/useUploadImage.js";
import { useCategories } from "@/hooks/api/useCategories.js";
import {
  Type,
  AlignLeft,
  ImageUp,
  MapPin,
  Building2,
  Globe,
  CalendarClock,
  DollarSign,
  Users,
} from "lucide-react";
import Image from "next/image";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-border bg-white text-text-primary text-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-150";

const formatLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

// Converts a date string/object to datetime-local format (YYYY-MM-DDTHH:mm)
const toDateTimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

export default function EventForm({ mode = "create", initialData }) {
  const isEdit = mode === "edit";

  const { data } = useCategories();
  const { mutateAsync: createEvent } = useCreateEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();
  const { mutateAsync: uploadImage } = useUploadImage();

  const [uploadedPreview, setUploadedPreview] = useState(null);

  // Show uploaded image first, fallback to initialData image (edit mode)
  const preview = uploadedPreview ?? initialData?.imageUrl ?? null;

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      categoryId: initialData?.categoryId._id ?? "",
      city: initialData?.location?.city ?? "",
      address: initialData?.location?.address ?? "",
      country: initialData?.location?.country ?? "",
      startDateTime: toDateTimeLocal(initialData?.startDateTime),
      endDateTime: toDateTimeLocal(initialData?.endDateTime),
      price: initialData?.price ?? "",
      capacity: initialData?.capacity ?? "",
      status: initialData?.status ?? "published",
      currency: initialData?.currency ?? "USD",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),

      description: Yup.string().required("Description is required"),

      imageUrl: Yup.string().required("Image is required"),

      categoryId: Yup.string().required("Category is required"),

      startDateTime: Yup.date()
        .required("Start date is required")
        // In edit mode allow the existing past date; only block future violations
        .test("not-past", "Start date can't be in the past", function (value) {
          if (isEdit) return true; // skip past-date check when editing
          if (!value) return false;
          return new Date(value) >= new Date();
        }),
      endDateTime: Yup.date()
        .required("End date is required")
        .test(
          "is-after-start",
          "End date must be after start date",
          function (value) {
            const { startDateTime } = this.parent;
            if (!startDateTime || !value) return true;
            return new Date(value) > new Date(startDateTime);
          },
        ),
      price: Yup.number()
        .required("Price is required")
        .typeError("Price must be a number")
        .min(0, "Price can't be negative"),
      capacity: Yup.number()
        .typeError("Capacity must be a number")
        .required("Capacity is required")
        .min(1, "Minimum capacity is 1"),
      status: Yup.string()
        .required("Status is required")
        .oneOf(["published", "draft" , "completed" ]),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          location: {
            city: values.city,
            address: values.address,
            country: values.country,
          },
        };
        if (mode === "create") {
          payload.availableSeats = values.capacity;
        }

        if (isEdit) {
          await updateEvent({ id: initialData._id, data: payload });
        } else {
          await createEvent(payload);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      setUploadedPreview(URL.createObjectURL(file));
      const url = await uploadImage(file);
      formik.setFieldValue("imageUrl", url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-text-primary">
          {isEdit ? "Edit Event" : "Create New Event"}
        </h2>

        <p className="text-text-muted text-small mt-1">
          {isEdit
            ? "Update the details below to save your changes."
            : "Fill in the details below to publish your event."}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
      >
        {/* ── Basic Info ─────────────────────────────────────────── */}
        <div className="space-y-4">
          <h4 className="text-text-primary border-b border-border pb-2">
            Basic Info
          </h4>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
              <Type className="w-4 h-4 text-text-muted" />
              Title
            </label>
            <input
              name="title"
              placeholder="Event title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={inputClass}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-small text-danger">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
              <AlignLeft className="w-4 h-4 text-text-muted" />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your event..."
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`${inputClass} resize-none`}
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-small text-danger">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
              <Type className="w-4 h-4 text-text-muted" />
              Category
            </label>
            <select
              name="categoryId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.categoryId}
              className={inputClass}
            >
              <option value="">Select category</option>
              {data?.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.errors.categoryId && formik.touched.categoryId && (
              <p className="text-small text-danger">
                {formik.errors.categoryId}
              </p>
            )}
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
              <ImageUp className="w-4 h-4 text-text-muted" />
              Cover Image
            </label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full text-small text-text-secondary file:mr-3 file:cursor-pointer file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-small file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {formik.errors.imageUrl && formik.touched.imageUrl && (
              <p className="text-small text-danger">{formik.errors.imageUrl}</p>
            )}
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="relative w-40 h-20 bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={preview}
              alt="Event Cover"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* ── Location ───────────────────────────────────────────── */}
        <div className="space-y-4">
          <h4 className="text-text-primary border-b border-border pb-2">
            Location
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-text-muted" />
                City
              </label>
              <input
                name="city"
                placeholder="e.g. Cairo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={inputClass}
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-text-muted" />
                Address
              </label>
              <input
                name="address"
                placeholder="e.g. Nasr City, Cairo, Egypt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className={inputClass}
              />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-text-muted" />
                Country
              </label>
              <input
                name="country"
                placeholder="e.g. Egypt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ── Date & Time ────────────────────────────────────────── */}
        <div className="space-y-4">
          <h4 className="text-text-primary border-b border-border pb-2">
            Date & Time
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <CalendarClock className="w-4 h-4 text-text-muted" />
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="startDateTime"
                min={isEdit ? undefined : formatLocalDateTime()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDateTime}
                className={inputClass}
              />
              {formik.errors.startDateTime && formik.touched.startDateTime && (
                <p className="text-small text-danger">
                  {formik.errors.startDateTime}
                </p>
              )}
            </div>

            {/* End */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <CalendarClock className="w-4 h-4 text-text-muted" />
                End Date & Time
              </label>
              <input
                type="datetime-local"
                name="endDateTime"
                min={
                  formik.values.startDateTime ||
                  (isEdit ? undefined : formatLocalDateTime())
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDateTime}
                className={inputClass}
              />
              {formik.errors.endDateTime && formik.touched.endDateTime && (
                <p className="text-small text-danger">
                  {formik.errors.endDateTime}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Tickets ────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h4 className="text-text-primary border-b border-border pb-2">
            Tickets
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-text-muted" />
                Price (USD)
              </label>
              <input
                name="price"
                type="number"
                min={0}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className={inputClass}
              />
              {formik.errors.price && formik.touched.price && (
                <p className="text-small text-danger">{formik.errors.price}</p>
              )}
            </div>

            {/* Capacity */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <Users className="w-4 h-4 text-text-muted" />
                Capacity
              </label>
              <input
                name="capacity"
                type="number"
                min={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.capacity}
                className={inputClass}
              />
              {formik.errors.capacity && formik.touched.capacity && (
                <p className="text-small text-danger">
                  {formik.errors.capacity}
                </p>
              )}
            </div>
          </div>

          {mode === "edit" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-text-primary flex items-center gap-1.5">
                <Type className="w-4 h-4 text-text-muted" />
                Status
              </label>
              <select
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                className={inputClass}
              >
                <option value="">Select Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
              </select>
              {formik.errors.status && formik.touched.status && (
                <p className="text-small text-danger">
                  {formik.errors.status}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Submit ─────────────────────────────────────────────── */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white text-small font-medium rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save Changes"
                : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
