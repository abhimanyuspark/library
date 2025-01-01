import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMyAlbums,
  updateBookInMyBooks,
  userDetails,
} from "../../redux/server/server";
import {
  Button,
  Error,
  Input,
  validation,
  DialogBox,
  ToastMsg_SaveBook,
} from "../../components";
import { Link, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/16/solid";

const SaveMyBooks = ({ setClose }) => {
  const { loading, error, appUser, isLogin } = useSelector(
    (state) => state.auth
  );
  const { book } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  useEffect(() => {
    if (isLogin) {
      const id = appUser.id;
      dispatch(userDetails(id));
    } else {
      navigate("/login", { replace: true });
    }
  }, [isLogin, dispatch, navigate]);

  if (loading) {
    return <div className="text-center p-8">Loading ....</div>;
  }

  if (error) {
    return <Error />;
  }

  const onSave = async (album) => {
    const isvalid = Boolean(Object.keys(book)?.length > 0) && album.title;
    const boo = {
      title: book?.title,
      image:
        book?.cover_i &&
        `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`,
      key: book?.key,
    };

    if (isvalid) {
      const obj = {
        id: appUser?.id,
        title: album?.title,
        book: boo,
        action: "add",
      };

      setClose(false);

      const res = await dispatch(updateBookInMyBooks(obj));

      if (res?.meta?.requestStatus === "fulfilled") {
        toast(ToastMsg_SaveBook({ data: obj }));

        // setClose(false);

      }
    } else {
      setOpenAlbum(true);
      setCurrentAlbum(album);
    }
  };

  const onDelete = async (formData) => {
    if (formData) {
      const response = await dispatch(
        updateMyAlbums({ id: appUser?.id, album: formData, action: "delete" })
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        toast.error(formData?.title + " Album deleted successfully", {
          theme: "colored",
          icon: (
            <div className="w-32 aspect-square grid place-items-center bg-white rounded-full text-red-700">
              <TrashIcon className="size-4" />
            </div>
          ),
        });
      }
    }
  };

  return (
    <div className="flex justify-center flex-col gap-2">
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
              <h3>{b?.title}{" "}{b?.data?.length}</h3>
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
            <h3>Create a new album</h3>
          </div>
        </div>

        {/* Add Albums */}
        <DialogBox
          label={"Add Album"}
          children={<AddMyAlbums id={appUser?.id} setOpen={setOpen} />}
          open={open}
          setOpen={setOpen}
        />

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

const AddMyAlbums = ({ id, setOpen }) => {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    title: "",
    data: [],
  });
  const [formError, setFormError] = useState({
    title: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
    setFormError((p) => ({ ...p, [key]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;

    if (isValid) {

      setOpen(false);

      const response = await dispatch(
        updateMyAlbums({ id, album: formData, action: "add" })
      );

      // setOpen(false);

      if (response?.meta?.requestStatus === "fulfilled") {
        toast.success(formData?.title + " Album created successfully", {
          theme: "colored",
        });
      } else {
        setFormError((p) => ({ ...p, ...response?.payload }));
      }
    } else {
      setFormError((p) => ({ ...p, ...validError }));
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex-1 flex gap-4 flex-col">
      <Input
        label={"Title"}
        value={formData.title}
        error={formError.title}
        onChange={(e) => handleChange("title", e)}
      />
      <Button children="Add" loading={loading} />
    </form>
  );
};

const Album = ({ album }) => {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
      {album?.data?.map((d, i) => (
        <Link
          to={`/book/${d?.key?.split("/works/")[1]}/${d?.title}`}
          className="w-full h-24 sm:h-40 rounded-lg overflow-hidden"
          key={i}
        >
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
        </Link>
      ))}
    </div>
  );
};

export default SaveMyBooks;
