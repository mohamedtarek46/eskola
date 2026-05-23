"use client";
import Link from "next/link";


const NotFound = () => {


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-gray-500 select-none">404</p>
      <h1 className="mt-2 text-xl font-medium text-gray-800">Page not found</h1>
      <p className="mt-2 text-sm text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/home"
        className="mt-8 px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFound;