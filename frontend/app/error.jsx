"use client";

import Link from "next/link";

export default function Error({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4">⚠️</div>

        <h1 className="text-3xl font-bold mb-3">
          Something went wrong
        </h1>

        <p className="text-gray-500 mb-6">
          An unexpected error occurred. Please try again.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 cursor-pointer py-2 rounded-lg bg-black text-white"
          >
            Try Again
          </button>

          <Link
            href="/home"
            className="px-5 py-2 rounded-lg border"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}