import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/server/server";
import { removeBooks } from "../../redux/fetures/books";
import { S_Card, Error, Pagination } from "../../components";
import { useParams } from "react-router";

const SearchList = () => {
  const { books, loading, error } = useSelector((state) => state.books);

  const { q, p } = useParams();
  const query = q;
  const page = Number(p) || 1;

  const dispatch = useDispatch();
  const resultsPerPage = 10;
  const totalPages = Math.ceil(books.numFound / resultsPerPage);

  // Fetch books whenever query or page changes
  useEffect(() => {
    const offset = (page - 1) * resultsPerPage;
    if (query !== "" || page !== 1) {
      dispatch(fetchBooks({ query, page: offset, resultsPerPage })); // Adjust API call as needed
    }
    return () => {
      // cleanup function
      dispatch(removeBooks());
    };
  }, [dispatch, query, page]);

  return (
    <div>
      {/* Books List */}
      {loading ? (
        <div className="text-center p-10 text-primary font-bold text-xl">
          Loading...
        </div>
      ) : error || books?.docs?.length === 0 ? (
        <Error />
      ) : (
        <List books={books} />
      )}

      {/* Pagination */}
      {books?.docs?.length > 0 && (
        <Pagination query={query} currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
};

const List = ({ books }) => {
  return (
    <div>
      <div className="">
        <p className="text-base text-slate-400">{books?.numFound} hits</p>
      </div>
      <div className="grid gap-1">
        {books?.docs?.map((book, index) => {
          const image = book?.cover_i;
          return <S_Card key={index} image={image} book={book} />;
        })}
      </div>
    </div>
  );
};

export default SearchList;
