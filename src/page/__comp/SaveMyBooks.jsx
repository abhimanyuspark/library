import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMyAlbums,
  updateBookInMyBooks,
  userDetails,
} from "../../redux/server/server";
import { Button, Error, Input, validation, DialogBox } from "../../components";
import { Link, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const SaveMyBooks = ({ setClose }) => {
  const { loading, error, appUser, isLogin } = useSelector(
    (state) => state.auth
  );
  const { book } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
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

  if (loading || saving) {
    return <div className="text-center p-8">Loading ....</div>;
  }

  if (error) {
    return <Error />;
  }

  const onSave = async (album) => {
    const isvalid = Boolean(Object.keys(book).length > 0) && album.title;
    const boo = {
      title: book?.title,
      image:
        book?.cover_i &&
        `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`,
      key: book?.key,
    };

    if (isvalid) {
      setSaving(true);

      const obj = {
        id: appUser?.id,
        title: album?.title,
        book: boo,
        action: "add",
      };

      const res = await dispatch(updateBookInMyBooks(obj));

      setSaving(false);

      if (res?.meta?.requestStatus === "fulfilled") {
        await dispatch(userDetails(appUser?.id));
        setClose(false);
      }
    } else {
      setOpenAlbum(true);
      setCurrentAlbum(album);
    }
  };

  const onDelete = async (formData) => {
    setSaving(true);

    if (formData) {
      const response = await dispatch(
        updateMyAlbums({ id: appUser?.id, album: formData, action: "delete" })
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        await dispatch(userDetails(appUser?.id));
      }
      setSaving(false);
    } else {
      setSaving(false);
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
              className="w-full h-20 sm:h-24 border border-dashed border-slate-400 rounded-md cursor-pointer p-2"
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
            </div>

            <div className="flex justify-between p-2 items-center w-full">
              <h3>{b?.title}</h3>
              <button
                type="button"
                onClick={() => onDelete(b)}
                className="bg-red-500 py-1 px-2 text-sm rounded-md text-white hover:bg-black"
              >
                {saving ? "Deleting...." : "Delete"}
              </button>
            </div>
          </div>
        ))}

        {/* create icon */}
        <div className="grid place-items-center">
          <div
            className="w-full h-20 sm:h-24 p-4 border border-dashed border-slate-400 grid place-items-center rounded-md hover:bg-slate-200 hover:text-gray-700 cursor-pointer"
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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
    setFormError((p) => ({ ...p, [key]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;

    if (isValid) {
      const response = await dispatch(
        updateMyAlbums({ id, album: formData, action: "add" })
      );
      if (response?.meta?.requestStatus === "fulfilled") {
        setOpen(false);
        dispatch(userDetails(id));
      } else {
        setFormError((p) => ({ ...p, ...response?.payload }));
      }
      setLoading(false);
    } else {
      setFormError((p) => ({ ...p, ...validError }));
      setLoading(false);
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
          className="w-full h-20 sm:h-24 rounded-lg overflow-hidden"
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
