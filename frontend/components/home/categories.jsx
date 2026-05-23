"use client";
import { useRouter } from "next/navigation";
import useFilterStore from "@/store/useFilterStore.js";
import { useCategories } from "@/hooks/api/useCategories.js";
export default function Categories() {
  const setCategory = useFilterStore((state) => state.setCategory);
  const router = useRouter();
  const { data ,isPending, isLoading, isError } = useCategories();
  if (isLoading || isPending) {
    return <p className="text-center">Loading...</p>;
  }
  if (isError) {
    return <p className="text-center">Something went wrong!</p>;
  }
  return (
    <section className="py-16 bg-white border-y border-gray-100 ">
      <div className="container">
        <h2 className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-6">
          Categories
        </h2>
        <div className="flex justify-center gap-2 flex-wrap">
          <>
            {data &&
              data.categories.map((c) => (
                <span
                  onClick={() => {
                    setCategory(c._id);
                    router.push(`/events`);
                  }}
                  key={c._id.toString()}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-pointer"
                >
                  {c.name}
                </span>
              ))}
            {data && data.categories.length === 0 && (
              <span className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 cursor-pointer">
                No categories found
              </span>
            )}
          </>
        </div>
      </div>
    </section>
  );
}
