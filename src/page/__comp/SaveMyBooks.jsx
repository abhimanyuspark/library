import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookInMyBooks, userDetails } from "../../redux/server/server";
import { Error, DialogBox, ToastMsg_SaveBook } from "../../components";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import AddMyAlbums from "./AddMyAlbums";
import Login from "../__auth/Login";

const SaveMyBooks = ({ setClose }) => {
  const { loading, error, appUser, isLogin } = useSelector(
    (state) => state.auth
  );
  const { book } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLogin) {
      const id = appUser.id;
      dispatch(userDetails(id));
    }
  }, [isLogin, dispatch]);

  if (!isLogin) {
    return <Login />;
  }

  if (loading) {
    return <div className="text-center p-8">Loading ....</div>;
  }

  if (error) {
    return <Error />;
  }

  const onSave = async (album) => {
    const boo = {
      title: book?.title,
      image:
        book?.cover_i &&
        `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`,
      key: book?.key,
    };
    const obj = {
      id: appUser?.id,
      title: album?.title,
      book: boo,
      action: "add",
    };

    setClose(false);
    await dispatch(updateBookInMyBooks(obj));
    toast(ToastMsg_SaveBook({ data: obj }));
  };

  return (
    <div className="flex justify-center flex-col gap-2">
      <h2>My Albums</h2>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* user albums data */}
        {appUser?.myBooks?.map((b, index) => (
          <div
            key={index}
            onClick={() => onSave(b)}
            className="flex flex-row sm:flex-col gap-2 border border-dashed border-slate-400 rounded-md overflow-hidden cursor-pointer p-2 relative group/item"
          >
            {/* mybooks data */}
            <div className="w-36 sm:w-full h-20 sm:h-40">
              {b?.data?.slice(0, 1)?.map((d, i) => (
                <div
                  className="w-full h-full bg-slate-300 rounded-md overflow-hidden"
                  key={i}
                >
                  {d?.image ? (
                    <img
                      src={d?.image}
                      alt={d?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-300 text-center">
                      {d?.title}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* plus icon & title */}
            <div className="flex justify-between items-center w-full">
              <h3>
                {b?.title} {b?.data?.length}
              </h3>

              <div>
                <PlusCircleIcon className="size-7 text-gray-700 cursor-pointer" />
              </div>
            </div>
            {/* hover div */}
            <div className="absolute top-0 left-0 z-10 w-full h-full group-hover/item:bg-[rgba(0,0,0,0.1)]"></div>
          </div>
        ))}

        {/* create icon */}
        <div className="relative grid place-items-center border border-dashed border-slate-400 rounded-md p-2 cursor-pointer group/item">
          <div
            className="grid place-items-center gap-2"
            onClick={() => setOpen(!open)}
          >
            <PlusCircleIcon className="size-8 sm:size-10" />
            <h3 className="text-sm sm:text-base">Create a new album</h3>
          </div>
          <div className="absolute top-0 left-0 z-10 w-full h-full group-hover/item:bg-[rgba(0,0,0,0.1)]"></div>
        </div>

        {/* Add Albums */}
        <DialogBox
          label={"Add Album"}
          children={<AddMyAlbums id={appUser?.id} setOpen={setOpen} />}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default SaveMyBooks;
