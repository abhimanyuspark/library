import React from "react";
import { Link } from "react-router";
import { LinkButton, Ratings } from "../components";

const S_Card = ({ image, book }) => {
  const rating = Math.ceil(book?.ratings_average);

  return (
    <div className="rounded-md bg-slate-50 p-4 flex gap-6 flex-col lg:flex-row lg:items-center">
      <div
        className={`${
          image ? "p-0" : "p-2"
        } w-full lg:w-28 h-80 lg:h-40 xl:aspect-square rounded-md overflow-hidden bg-gray-200 border border-slate-200`}
      >
        {image ? (
          <img
            alt={book?.title}
            loading="lazy"
            src={`https://covers.openlibrary.org/b/id/${image}-L.jpg`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="border border-white rounded-md w-full h-full"></div>
        )}
      </div>

      <div className="flex-1 flex gap-2 flex-col">
        <Link
          to={`/book/${book?.key.split("/works/")[1]}`}
          className="text-lg font-bold hover:text-primary cursor-pointer"
        >
          {book?.title}
        </Link>
        {book?.author_name?.length > 0 ? (
          <p className="text-slate-400 text-lg">
            by <span className="text-primary">{book?.author_name[0]}</span>
          </p>
        ) : (
          ""
        )}
        <div className="flex gap-1 items-center">
          {rating ? (
            <Ratings rating={rating} count={book[`ratings_count_${rating}`]} />
          ) : (
            ""
          )}
          {"."}
          {book.want_to_read_count ? (
            <p className="text-sm">
              {book?.want_to_read_count} people want to read this
            </p>
          ) : (
            ""
          )}
        </div>
        {book.first_publish_year ? (
          <p className="text-xs">
            First published in {book?.first_publish_year}
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="w-full lg:w-40">
        <LinkButton book={book} />
      </div>
    </div>
  );
};

export default S_Card;
