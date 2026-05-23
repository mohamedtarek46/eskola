import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateMe } from "@/hooks/api/useUsers.js";
export default function ProfileForm({ user, mutate }) {
  const { mutateAsync: updateMe } = useUpdateMe();
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Too short")
        .max(20, "Too long")
        .required("First name is required"),

      lastName: Yup.string()
        .min(2, "Too short")
        .max(20, "Too long")
        .required("Last name is required"),
    }),

    onSubmit: async (values) => {
      try {
        await updateMe(values);
        formik.resetForm({
          values, 
        });
      } catch (err) {
        console.log(err);
      }
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4 max-w-md">
      {/* First Name */}
      <div>
        <input
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border border-border p-3 rounded-lg"
          placeholder="First name"
        />

        {formik.touched.firstName && formik.errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <input
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border border-border p-3 rounded-lg"
          placeholder="Last name"
        />

        {formik.touched.lastName && formik.errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!formik.isValid}
        className="bg-primary cursor-pointer text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Changes
      </button>
    </form>
  );
}
