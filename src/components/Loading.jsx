import React from "react";

const Loading = () => {
  return <BookLoader />;
};

const BookLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-opacity-50 absolute w-full top-0 left-0 z-50 bg-white ">
      <div className="flex space-x-2">
        {/* Book Animation */}
        <div className="w-6 h-8 bg-blue-500 rounded animate-bounce" style={{animationDelay: "100ms"}}></div>
        <div className="w-6 h-8 bg-red-500 rounded animate-bounce" style={{animationDelay: "300ms"}}></div>
        <div className="w-6 h-8 bg-green-500 rounded animate-bounce" style={{animationDelay: "500ms"}}></div>
      </div>
    </div>
  );
};

export default Loading;
