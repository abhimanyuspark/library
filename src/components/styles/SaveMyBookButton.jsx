import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookInMyBooks } from "../../redux/server/server";

const SaveMyBookButton = ({ onClick, book }) => {
  const { appUser } = useSelector((state) => state.auth);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (appUser && book) {
      // Check if the book exists in myBooks
      const c = appUser?.myBooks?.some((item) =>
        item?.data?.some((savedBook) => savedBook?.title === book?.title)
      );
      setCheck(c);
    }
  }, [appUser]);

  const onUnSave = async () => {
    // Remove the book from myBooks
    if (book && appUser) {
      setLoading(true)
      const obj = {
        action: "delete",
        book: book,
        id: appUser?.id,
      };
      await dispatch(updateBookInMyBooks(obj));
      setCheck(false);
      setLoading(false)
    }
  };

  return (
    <button
      onClick={check ? onUnSave : onClick}
      type="button"
      // disabled={check} // Disable if the book is already saved
      className={`border border-slate-400 p-2 rounded-md hover:bg-black hover:text-white disabled:text-white cursor-pointer ${check ? "bg-red-500" : ""}`}
    >
      {check ? loading ?  "Loading..." : "Un Saved" : "Save"}
    </button>
  );
};

export default SaveMyBookButton;