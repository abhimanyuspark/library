import React from "react";
import { useNavigate } from "react-router";
import Button from "./styles/Button";

const Card = ({ book, image }) => {
  const navigate = useNavigate();
  return (
    <div className="snap-always snap-center grid place-items-center gap-2">
      <div
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
      </div>

      <Button
        children="ReadOnly"
        onClick={() => navigate(`/book/${book?.key.split("/works/")[1]}`)}
      />
    </div>
  );
};

export default Card;
