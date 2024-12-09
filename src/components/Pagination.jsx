import React, { useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";

const Pagination = ({ currentPage, totalPages, query }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(currentPage || 1);

  const goToPage = (newPage) => {
    setPage(newPage);
    navigate(`/search/${query}/${newPage}`);
  };

  return (
    
      <div className="w-full flex flex-wrap justify-center items-center border border-gray-300 bg-white rounded-lg p-4 space-x-2 sm:space-x-4">
        {/* Previous Button */}
        <button
          disabled={currentPage <= 1}
          onClick={() => goToPage(1)}
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Page Numbers */}
        <div className="flex-1 mx-4 overflow-x-auto flex items-center space-x-2 scroll">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`flex items-center justify-center h-10 w-10 px-3 rounded-full border border-gray-300 text-sm font-medium ${
                page === p
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
              } transition-all`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(totalPages)}
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    
  );
};

export default Pagination;
