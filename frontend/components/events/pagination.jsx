"use client";
import useFilterStore from "@/store/useFilterStore";

const Pagination = ({ pagination }) => {
  const changePage = useFilterStore((state) => state.setPage);

  const pagestoShow = [];
  if (pagination.page > 1)
    pagestoShow.push(pagination.page - 1);
  pagestoShow.push(pagination.page);
  if (pagination.page < pagination.totalPages)
    pagestoShow.push(pagination.page + 1);

  const handleChangePage = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    changePage(page)
  };

  return (
    <div className="flex justify-center items-center gap-3 my-8">
      <button
        onClick={() =>
          pagination.page > 1 &&
          handleChangePage(pagination.page - 1)
        }
        disabled={pagination.page === 1}
        className="px-4 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-100 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Prev
      </button>

      <div className="flex items-center gap-2">
        {pagestoShow.map((page) => (
          <button
            key={page}
            onClick={() => handleChangePage(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border hover:cursor-pointer transition-all text-sm font-medium
              ${
                pagination.page === page
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          pagination.page < pagination.totalPages &&
          handleChangePage(pagination.current_page + 1)
        }
        disabled={pagination.page === pagination.totalPages}
        className="px-4 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-100  hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
