import LoginForm from "@/components/auth/loginForm.jsx";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 mx-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-8">Sign in to your account</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;