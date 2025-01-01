import React from "react";

const ToastMsg_SaveBook = ({ data }) => {

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center ">
        <div className="w-10 aspect-square rounded-md overflow-hidden">
          {data.book.image ? (
            <img
              className="w-full h-full object-cover"
              loading="lazy"
              alt={data?.book?.title}
              src={data?.book?.image}
            />
          ) : (
            <div className="w-full h-full bg-slate-500"></div>
          )}
        </div>
        <h4 className="font-bold flex flex-col">
          <span>{data?.title}</span>
          <span className="text-sm truncate w-52 sm:w-44">{data?.book?.title}</span>
        </h4>
      </div>
      <div className="font-semibold text-sm">Saved</div>
    </div>
  );
};

export default ToastMsg_SaveBook;
