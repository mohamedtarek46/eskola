"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "@/services/auth.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/store/userStore.js";
export default function RegisterForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
      role: Yup.string().oneOf(["user", "organizer"]),
    }),

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const result = await registerUser(values);
        setUser(result.user);
        router.push("/home");
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputClass = (field) =>
    `w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 text-gray-900 outline-none 
    focus:bg-white focus:border-gray-400 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400"
        : "border-gray-200"
    }`;

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* First Name */}
      <input
        name="firstName"
        placeholder="First name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
        className={inputClass("firstName")}
      />
      {formik.touched.firstName && formik.errors.firstName && (
        <p className="text-xs text-red-500">{formik.errors.firstName}</p>
      )}
      {/* Last Name */}
      <input
        name="lastName"
        placeholder="Last name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
        className={inputClass("lastName")}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <p className="text-xs text-red-500">{formik.errors.lastName}</p>
      )}

      {/* Email */}
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={inputClass("email")}
      />

      {/* Password */}
      <input
        name="password"
        type="password"
        placeholder="••••••••"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className={inputClass("password")}
      />

      {/* Role */}
      <select
        name="role"
        onChange={formik.handleChange}
        value={formik.values.role}
        className={inputClass("role")}
      >
        <option value="user">User</option>
        <option value="organizer">Organizer</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="hover:cursor-pointer w-full py-2.5 mt-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? "Creating..." : "Create account"}
      </button>

      <p className=" text-center text-xs text-gray-400">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="hover:cursor-pointer  text-gray-900 font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
