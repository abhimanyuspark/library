import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyBooks,
  updateBookInMyBooks,
  userDetails,
} from "../../redux/server/server";
import { Button, Error, Input, validation, DialogBox } from "../../components";
import { Link, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const SaveMyBooks = () => {
  const { loading, error, appUser, isLogin } = useSelector(
    (state) => state.auth
  );
  const useLocalStorage = JSON.parse(localStorage.getItem("userbook")) || {};
  const { book } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLogin) {
      const id = appUser.id;
      dispatch(userDetails(id));
    } else {
      navigate("/login");
    }
  }, [isLogin, dispatch, navigate]);

  if (loading || saving) {
    return <div className="text-center p-8">Loading ....</div>;
  }

  if (error) {
    return <Error />;
  }

  const onLocal = (b) => {
    if (b) {
      try {
        const { rating, access, link, isbn, oclc, count, title, key } = b;
        const obj = {
          rating,
          access,
          link,
          isbn,
          oclc,
          count,
          title,
          key,
        };

        localStorage.setItem("userbook", JSON.stringify(obj));
      } catch (error) {
        console.error("Error saving book to local storage:", error);
      }
    }
  };

  const onSave = async (title) => {
    const isvalid = Object.keys(book).length > 0;

    if (isvalid) {
      setSaving(true);

      const obj = {
        id: appUser?.id,
        title: title,
        book: useLocalStorage,
        action: "add",
      };

      const res = await dispatch(updateBookInMyBooks(obj));

      setSaving(false);

      if (res?.meta?.requestStatus === "fulfilled") {
        await dispatch(userDetails(appUser?.id));
      }
    }
  };

  return (
    <div className="flex justify-center flex-col gap-2">
      <h2>My Albums</h2>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {/* user albums data */}
        {appUser?.myBooks?.map((b, index) => (
          <div
            key={index}
            className="grid place-items-center"
            onClick={() => onSave(b?.title)}
          >
            {/* mybooks data */}
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 border border-dashed border-slate-400 rounded-md cursor-pointer p-2">
              {b?.data?.slice(0, 4)?.map((d, i) => (
                <Link
                  to={`/book/${d?.key}`}
                  onClick={() => {
                    onLocal(d);
                  }}
                  className="bg-slate-200 truncate text-sm p-2 place-content-center"
                  key={i}
                >
                  {d?.title}
                </Link>
              ))}
            </div>

            <h3>{b?.title}</h3>
          </div>
        ))}

        {/* create icon */}
        <div className="grid place-items-center" onClick={() => setOpen(!open)}>
          <div className="w-full h-full p-7 border border-dashed border-slate-400 grid place-items-center rounded-md hover:bg-slate-200 cursor-pointer">
            <PlusCircleIcon className="size-9" />
          </div>
          <h3>Create a new album here</h3>
        </div>

        {/* Add Albums */}
        <DialogBox
          children={<AddMyBooks id={appUser?.id} />}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

const AddMyBooks = ({ id }) => {
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
      const response = await dispatch(addMyBooks({ id, mybook: formData }));
      if (response?.meta?.requestStatus === "fulfilled") {
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

export default SaveMyBooks;
