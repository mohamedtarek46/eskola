"use client";
import useUserStore from "@/store/userStore.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { loginUser  } from "@/services/auth.js";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const result = await loginUser(values);
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
    `w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:bg-white focus:border-gray-400 ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400"
        : "border-gray-200"
    }`;

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={inputClass("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-xs text-red-500">{formik.errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={inputClass("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-red-500">{formik.errors.password}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="hover:cursor-pointer w-full py-2.5 mt-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formik.isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      {/* Register link */}
      <p className="text-center text-xs text-gray-400 pt-1">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-gray-900 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}