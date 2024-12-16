import React from "react";
import { Link } from "react-router";
import { LinkButton, Ratings } from "../components";
import { useDecBookObj } from "../hooks";

const S_Card = ({ image, book }) => {
  const obj = useDecBookObj(book)
  const { 
    title,
    author,
    rating,
    count,
    key,
    want_to_read_count,
    publish_year,
  } = obj
  

  return (
    <div className="rounded-md bg-slate-50 p-4 flex gap-6 flex-col lg:flex-row lg:items-center">
      <Link
        to={`/book/${key}/${title}`}
        className={`${
          image ? "p-0" : "p-2"
        } w-full lg:w-28 h-80 lg:h-40 xl:aspect-square rounded-md overflow-hidden bg-gray-200 border border-slate-200`}
      >
        {image ? (
          <img
            alt={title}
            loading="lazy"
            src={`https://covers.openlibrary.org/b/id/${image}-L.jpg`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="border border-white rounded-md w-full h-full"></div>
        )}
      </Link>

      <div className="flex-1 flex gap-2 flex-col">
        <Link
          to={`/book/${key}/${title}`}
          className="text-lg font-bold hover:text-primary cursor-pointer"
        >
          {title}
        </Link>
        { author ? (
          <p className="text-slate-400 text-lg">
            by <span className="text-primary">{author.map((n)=> n)}</span>
          </p>
        ) : (
          ""
        )}
        <div className="flex gap-1 items-center">
          {rating ? (
            <Ratings rating={rating} count={count} />
          ) : (
            ""
          )}
          {"."}
          {want_to_read_count ? (
            <p className="text-sm">
              {want_to_read_count} people want to read this
            </p>
          ) : (
            ""
          )}
        </div>
        {publish_year ? (
          <p className="text-xs">
            First published in {publish_year}
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="w-full lg:w-40">
        <LinkButton book={obj} />
      </div>
    </div>
  );
};

export default S_Card;
