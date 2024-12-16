import React from "react";
import { Link } from "react-router";
import LinkButton from "./styles/LinkButton";
import { useDecBookObj } from "../hooks";

const Card = ({ book, image }) => {
  const obj = useDecBookObj(book)
  const {
    title, 
    key,
  } = obj

  return (
    <div className="snap-always snap-center grid place-items-center gap-2">
      <Link
        to={`/book/${key}/${title}`}
        className={`${
          image ? "p-0" : "p-2"
        } w-32 h-44 xl:aspect-square rounded-md overflow-hidden bg-gray-200 border border-slate-200`}
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

      <LinkButton book={obj} />
    </div>
  );
};

export default Card;
