import { StarIcon as StarSolid } from "@heroicons/react/20/solid";
import React from "react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

const Ratings = ({ rating, count }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="cursor-pointer">
          {star <= rating ? (
            <StarSolid className="size-5 text-yellow-500" />
          ) : (
            <StarOutline className="size-5 text-gray-300" />
          )}
        </span>
      ))}
      <p className="ml-2">
        {rating}.0 {"( "} {count} rating {" )"}
      </p>
    </div>
  );
};

export default Ratings;
