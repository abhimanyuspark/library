import React, { useEffect, useState } from "react";
import Error from "./Error";
import Card from "./Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const Categories = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState({});
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Function to determine items per page based on screen width
  function getItemsPerPage() {
    if (window.innerWidth <= 480) {
      return 1; // Mobile
    } else if (window.innerWidth <= 768) {
      return 2; // Tablet (e.g., iPad)
    } else {
      return 5; // Desktop
    }
  }

  // Update `itemsPerPage` on window resize
  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resultsPerPage = itemsPerPage;
  const totalPages = Math.ceil(categories.numFound / resultsPerPage);

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  // Fetch books whenever query or page changes
  useEffect(() => {
    const category = data?.category;
    const offset = (page - 1) * resultsPerPage;

    if (category) {
      // Adjust API call as needed
      const fetchBooks = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://openlibrary.org/search.json?subject=${category}&limit=${resultsPerPage}&offset=${offset}`
          );
          setCategories(response.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchBooks();
    }
  }, [data, page, resultsPerPage]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-primary underline cursor-pointer pl-4">
        {data.name}
      </h3>

      {error || categories?.docs?.length === 0 ? (
        <Error />
      ) : (
        <List
          loading={loading}
          books={categories}
          onPageChange={onPageChange}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

const List = ({ books, onPageChange, page, totalPages, loading }) => {
  return (
    <div className="flex items-center justify-between bg-slate-100 p-2">
      {/* Pervious Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {loading ? (
        <div className="flex-1 text-center py-24 text-primary font-bold text-lg lg:text-xl">
          Loading...
        </div>
      ) : (
        <div className="mx-2 lg:mx-4 overflow-x-auto flex items-center space-x-2 gap-8 scroll snap-mandatory snap-x scroll-smooth scroll-px-2">
          {books?.docs?.map((book, index) => {
            const image = book?.cover_i;
            return <Card key={index} image={image} book={book} />;
          })}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Categories;
