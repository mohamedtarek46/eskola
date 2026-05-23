import RegisterForm from "@/components/auth/registerForm.jsx";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm  px-8 py-10 mx-4">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-gray-400 mb-6">
          Sign up to get started
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}