import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Error,
  LinkButton,
  Loading,
  Ratings,
  DialogBox,
  SaveMyBookButton,
} from "../../components";
import { fetchBookDetails } from "../../redux/server/server";
import { removeBooks } from "../../redux/fetures/books";
import SaveMyBooks from "../__comp/SaveMyBooks";
import { useDecBookObj } from "../../hooks";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const Book = () => {
  const { id, title } = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookDetails({ title: title, id: id }));
    return () => {
      dispatch(removeBooks());
    };
  }, [dispatch, id]);

  return (
    <div className="flex items-center justify-center p-4 sm:px-6 lg:px-8">
      {loading ? (
        <Loading />
      ) : error || Boolean(Object.keys(book).length === 0) ? (
        <Error />
      ) : (
        <Details book={book} />
      )}
    </div>
  );
};

const Details = ({ book }) => {
  const image = book?.cover_i;
  const obj = useDecBookObj(book);

  const [sub, setSub] = useState(false);
  const [subPeop, setSubPeop] = useState(false);
  const [places, setPlaces] = useState(false);
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const pObj = useDecBookObj(book);

  const NearbyLibraries = [
    {
      name: "Library Thing",
      data: book?.id_librarything?.[0] || "",
      link: `https://www.librarything.com/venue/${book?.id_librarything?.[0]}`,
    },
    {
      name: "Good Reads",
      data: book?.id_goodreads?.[0] || "",
      link: `https://www.goodreads.com/book/show/${book?.id_goodreads?.[0]}-${book?.title}`,
    },
  ];

  const BuyThisBook = [
    {
      name: "Amazon",
      data: book?.id_amazon?.[0] || "",
      link: `https://www.amazon.com/dp/${book?.id_amazon?.[0]}/?tag=internetarchi-20`,
    },
  ];

  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  const onPreview = () => {
    setPreviewUrl(
      `https://archive.org/details/${pObj?.link}/page/n16/mode/2up?ref=ol&_autoReadAloud=show&view=theater`
    );
    setPreviewOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-6 lg:flex-row">
      {/* Image Section */}
      <div className="lg:w-[40%] flex flex-col gap-4">
        <div className="relative image-transform w-full h-96 grid place-content-center">
          <div
            className={`w-full h-80 rounded-md bg-slate-300 overflow-hidden ${
              image ? "p-0" : "p-4"
            }`}
          >
            {image ? (
              <img
                className="w-full h-full object-cover"
                src={`https://covers.openlibrary.org/b/id/${image}-L.jpg`}
                loading="lazy"
                alt={book?.title}
              />
            ) : (
              <div
                className={`border border-white rounded-md w-full h-full`}
              ></div>
            )}
          </div>
          {/* hover div */}
          <span className="absolute top-10 left-16 sm:left-64 lg:left-12 bg-primary text-white text-xs px-2 py-1 rounded capitalize transform transition-all hover:scale-110 hover:translate-x-1 hover:translate-y-[0.05rem] cursor-pointer">
            {book?.subject?.[0] || "Fiction"}
          </span>
        </div>

        {/* preview */}
        {pObj?.access === "public" && (
          <div className="grid place-content-center">
            <div
              className="flex items-end gap-2 hover:underline text-primary underline-offset-2"
              onClick={() => {
                onPreview();
              }}
            >
              <BookOpenIcon className="size-6" />
              <span>Preview</span>
            </div>
          </div>
        )}

        <LinkButton book={obj} button_book />

        <SaveMyBookButton book={book} onClick={() => setOpen(true)} />

        <div>
          <h3>Check nearby libraries</h3>
          <ul className="cursor-pointer">
            {NearbyLibraries.find((f) => f.data !== "") ? (
              NearbyLibraries.map(
                (d, i) =>
                  d.data && (
                    <li key={i}>
                      <a
                        className="text-sm text-primary hover:underline"
                        href={d.link}
                        target="_blank"
                      >
                        {d.name}
                      </a>
                    </li>
                  )
              )
            ) : (
              <li className="text-sm font-normal hover:underline hover:text-gray-600">
                No nearby libraries found
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3>Buy this book</h3>
          <ul className="cursor-pointer">
            {BuyThisBook.find((f) => f.data !== "") ? (
              BuyThisBook.map(
                (d, i) =>
                  d.data && (
                    <li key={i}>
                      <a
                        className="text-sm text-primary hover:underline"
                        href={d.link}
                        target="_blank"
                      >
                        {d.name}
                      </a>
                    </li>
                  )
              )
            ) : (
              <li className="text-sm font-normal hover:underline hover:text-gray-600">
                No data available
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Details Section */}
      <div className="lg:w-full flex flex-col justify-between">
        <div className="flex gap-8 flex-col">
          {/* title */}
          <div className="flex flex-col lg:flex-row lg:justify-between items-start">
            <h1 className="text-4xl flex-none lg:flex-1 font-extrabold text-gray-900">
              {book?.title}
            </h1>
          </div>
          {/* ratings */}
          <div>
            <Ratings rating={obj.rating} count={obj.count} />
          </div>
          {/* author */}
          <div className="text-gray-700 flex gap-4 items-center flex-wrap">
            <p>
              <span className="font-bold">Authors : </span>
              {book?.author_name?.map((author, i) => (
                <span key={i}>{author}</span>
              ))}
            </p>
            <div className="w-1 h-1 bg-black rounded-[50%]"></div>
            <p>
              {book?.want_to_read_count || 0}
              <span className="font-bold"> : Want to read</span>
            </p>
            <div className="w-1 h-1 bg-black rounded-[50%]"></div>
            <p>
              {book?.currently_reading_count || 0}
              <span className="font-bold"> : Currently reading</span>
            </p>
            <div className="w-1 h-1 bg-black rounded-[50%]"></div>
            <p>
              {book?.already_read_count || 0}
              <span className="font-bold"> : Already read</span>
            </p>
          </div>
          {/* publish, publishers, pages */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              { d: book?.first_publish_year, name: "Publish" },
              {
                d: book?.publisher
                  ?.slice(0, 2)
                  ?.map((p) => p)
                  .join(" , "),
                name: "Publishers",
              },
              {
                d: book?.number_of_pages_median,
                name: "Pages median",
              },
            ].map(
              (d, i) =>
                d.d && (
                  <div
                    key={i}
                    className="p-4 border border-slate-300 rounded-md flex-1 flex items-center flex-col justify-center"
                  >
                    <h4>{d.name}</h4>
                    <p className="text-center">{d?.d}</p>
                  </div>
                )
            )}
          </div>
          {/* person */}
          <div
            className={`${
              subPeop ? "line-clamp-none" : "line-clamp-1"
            } text-gray-700 hover:cursor-pointer clamp`}
            data-before={subPeop ? "▾ " : "▸ "}
            onClick={() => setSubPeop(!subPeop)}
          >
            <span className="font-bold">Person : </span>
            <span className="text-sm italic">
              {book?.person?.map((s) => s).join(" ,") || "No data available."}
            </span>
          </div>
          {/* subject */}
          <div
            className={`${
              sub ? "line-clamp-none" : "line-clamp-1"
            } text-gray-700 hover:cursor-pointer clamp`}
            data-before={sub ? "▾ " : "▸ "}
            onClick={() => setSub(!sub)}
          >
            <span className="font-bold">Subject : </span>
            <span className="text-sm italic">
              {book?.subject?.map((s, i) => (
                <Link key={i} className="text-primary last:nth-2:hidden">
                  <span className="hover:underline underline-offset-4">
                    {s}
                  </span>
                  <span>{" , "}</span>
                </Link>
              )) || "No data available."}
            </span>
          </div>
          {/* places */}
          <div
            className={`${
              places ? "line-clamp-none" : "line-clamp-1"
            } text-gray-700 hover:cursor-pointer clamp`}
            data-before={places ? "▾ " : "▸ "}
            onClick={() => setPlaces(!places)}
          >
            <span className="font-bold">Places : </span>
            <span className="text-sm italic">
              {book?.place?.map((s) => s).join(" ,") || "No data available."}
            </span>
          </div>
          {/* languages */}
          <div className="text-gray-700 flex gap-2 flex-wrap">
            <span className="font-bold">Languages : </span>
            <span className="text-sm flex-1 flex gap-2 items-center flex-wrap">
              {book?.language?.map((s, index) => (
                <span key={index} className="p-2 rounded-md bg-slate-300">
                  {languageNames.of(s)}
                </span>
              )) || "No data available."}
            </span>
          </div>
          {/* time */}
          <div className={`text-gray-700`}>
            <span className="font-bold">Time : </span>
            <span className="text-sm italic">
              {book?.time?.map((s) => s).join(" ,") || "No data available."}
            </span>
          </div>
          {/* excerpts */}
          <div className="text-gray-700">
            <span className="font-bold">Excerpts</span>
            <p>{book?.first_sentence?.[0] || "No excerpts found"}</p>
          </div>
        </div>
      </div>

      <DialogBox
        label={"Save book"}
        children={<SaveMyBooks setClose={setOpen} />}
        open={open}
        setOpen={setOpen}
      />

      <DialogBox
        label={"Preview Book"}
        children={<Preview url={previewUrl} />}
        open={previewOpen}
        setOpen={setPreviewOpen}
      />
    </div>
  );
};

const Preview = ({ url }) => {
  return (
    <iframe
      title="Preview book"
      src={url}
      width="100%"
      height="450"
      allowFullScreen
    ></iframe>
  );
};

export default Book;
