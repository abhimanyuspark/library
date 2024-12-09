import React from "react";
import { Link } from "react-router";
import LinkButton from "./styles/LinkButton";

const Card = ({ book, image }) => {

  return (
    <div className="snap-always snap-center grid place-items-center gap-2">
      <Link
        to={`/book/${book?.key.split("/works/")[1]}`}
        className={`${
          image ? "p-0" : "p-2"
        } w-32 h-44 xl:aspect-square rounded-md overflow-hidden bg-gray-200 border border-slate-200`}
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
      </Link>

      <LinkButton book={book}/>
    </div>
  );
};

export default Card;
