import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMyAlbums } from "../../redux/server/server";
import { Error, DialogBox } from "../../components";
import { Link } from "react-router";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/16/solid";
import AddMyAlbums from "../__comp/AddMyAlbums";
import Login from "../__auth/Login";
import Swal from "sweetalert2";

const MyBooks = () => {
  const { loading, error, appUser, isLogin } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  if (!isLogin) {
    return <Login />;
  }

  if (loading) {
    return <div className="text-center p-8">Loading ....</div>;
  }

  if (error) {
    return <Error />;
  }

  const onSave = (album) => {
    setOpenAlbum(true);
    setCurrentAlbum(album);
  };

  const onDelete = (formData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert " + formData?.title + " Album!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(
          updateMyAlbums({ id: appUser?.id, album: formData, action: "delete" })
        );
        toast.error(formData?.title + " Album deleted successfully", {
          theme: "colored",
          icon: (
            <div className="w-32 aspect-square grid place-items-center bg-white rounded-full text-red-700">
              <TrashIcon className="size-4" />
            </div>
          ),
        });
      }
    });
  };

  return (
    <div className="flex justify-center flex-col gap-2 p-4 sm:p-8">
      <h2>My Albums</h2>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {/* user albums data */}
        {appUser?.myBooks?.map((b, index) => (
          <div key={index} className="grid place-items-center">
            {/* mybooks data */}
            <div
              className="relative group/item w-full h-24 sm:h-40 border border-dashed border-slate-400 rounded-md overflow-hidden cursor-pointer p-2"
              onClick={() => onSave(b)}
            >
              {b?.data?.slice(0, 1)?.map((d, i) => (
                <div className="w-full h-full" key={i}>
                  {d?.image ? (
                    <img
                      src={d?.image}
                      alt={d?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 text-center">
                      {d?.title}
                    </div>
                  )}
                </div>
              ))}
              <div className="absolute top-0 left-0 z-10 w-full h-full group-hover/item:bg-[rgba(0,0,0,0.4)]"></div>
            </div>

            <div className="flex justify-between p-2 items-center w-full">
              <div className="flex flex-row items-center gap-0 sm:gap-2">
                <span className="w-10 truncate sm:w-full">{b?.title}</span>
                <span>{b?.data?.length}</span>
              </div>
              <button
                type="button"
                onClick={() => onDelete(b)}
                className="bg-red-500 py-1 px-2 text-sm rounded-md text-white hover:bg-black"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* create icon */}
        <div className="grid place-items-center">
          <div
            className="w-full h-24 sm:h-40 p-4 border border-dashed border-slate-400 grid place-items-center rounded-md hover:bg-slate-200 hover:text-gray-700 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <PlusCircleIcon className="size-9" />
          </div>
          <div className="p-2 w-full flex items-center justify-center">
            <h3 className="text-xs sm:text-base">Create a new album</h3>
          </div>
        </div>

        {/* Add Albums */}
        <DialogBox
          label={"Add Album"}
          children={<AddMyAlbums id={appUser?.id} setOpen={setOpen} />}
          open={open}
          setOpen={setOpen}
        />

        {/* Album Dialog */}
        <DialogBox
          label={currentAlbum?.title}
          children={<Album album={currentAlbum} />}
          open={openAlbum}
          setOpen={setOpenAlbum}
        />
      </div>
    </div>
  );
};

const Album = ({ album }) => {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
      {album?.data?.map((d, i) => (
        <Link
          to={`/book/${d?.key?.split("/works/")[1]}/${d?.title}`}
          className="w-full h-24 sm:h-40 rounded-lg overflow-hidden bg-slate-300"
          key={i}
        >
          {d?.image ? (
            <img
              src={d?.image}
              alt={d?.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 text-center text-white font-bold text-sm">
              {d?.title}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default MyBooks;
