import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, LinkButton, Loading, Ratings } from "../../components";
import { fetchBookDetails } from "../../redux/server/server";

const Book = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  return (
    <div className="flex items-center justify-center p-4 sm:px-6 lg:px-8">
      {loading ? (
        <Loading />
      ) : error || !book ? (
        <Error />
      ) : (
        <Details book={book} />
      )}
    </div>
  );
};

const Details = ({ book }) => {
  const image = book?.covers;
  const useLocalStorage = JSON.parse(localStorage.getItem("userbook")) || {};
  const { rating, count } = useLocalStorage;

  const [sub, setSub] = useState(false);
  const [subPeop, setSubPeop] = useState(false);
  const [places, setPlaces] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const onSub = () => {
    setSub(!sub);
  };

  const onSubPeop = () => {
    setSubPeop(!subPeop);
  };

  const onPlaces = () => {
    setPlaces(!places);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="w-full overflow-hidden flex flex-col gap-6 lg:flex-row">
      {/* Image Section */}
      <div className="lg:w-[40%] relative flex flex-col gap-4">
        <div
          className={`w-full h-96 rounded-md bg-slate-300 overflow-hidden ${
            image ? "p-0" : "p-4"
          }`}
        >
          {image ? (
            <img
              className="w-full h-full object-cover"
              src={`https://covers.openlibrary.org/b/id/${image[0]}-L.jpg`}
              loading="lazy"
              alt={book?.title}
            />
          ) : (
            <div
              className={`border border-white rounded-md w-full h-full`}
            ></div>
          )}
        </div>

        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded capitalize transform transition-all hover:scale-110 hover:translate-x-1 hover:translate-y-[0.05rem] cursor-pointer">
          {book?.subjects?.[0] || "Fiction"}
        </span>

        <LinkButton book={useLocalStorage} />
      </div>

      {/* Details Section */}
      <div className="lg:w-full flex flex-col justify-between">
        <div className="flex gap-8 flex-col">
          {/* title */}
          <div className="flex flex-col lg:flex-row lg:justify-between items-start">
            <h1 className="text-4xl flex-none lg:flex-1 font-extrabold text-gray-900">
              {book?.title}
            </h1>
            <div className="flex flex-col items-start lg:items-end pt-2">
              <p>
                <span className="font-bold">Last Modified date : </span>
                {new Date(book?.last_modified?.value).toLocaleDateString() ||
                  "No data available"}
              </p>
            </div>
          </div>
          {/* ratings */}
          <div>
            <Ratings rating={rating} count={count} />
          </div>
          {/* author */}
          <p className="text-gray-700">
            <span className="font-bold">Authors : </span>
            {typeof book?.authors === "string"
              ? book?.authors?.map((author) => author?.name).join(", ")
              : book?.authors?.value || "No data available."}
          </p>
          {/* publish, created */}
          <div className="flex gap-4 items-center">
            {[
              { d: book?.first_publish_date, name: "Publish" },
              {
                d: new Date(book?.created?.value).toLocaleDateString(),
                name: "Created",
              },
            ].map(
              (d, i) =>
                d.d && (
                  <div
                    key={i}
                    className="p-4 border border-slate-300 rounded-md flex-1 flex items-center flex-col justify-center"
                  >
                    <h4>{d.name}</h4>
                    <p>{d?.d}</p>
                  </div>
                )
            )}
          </div>
          {/* description */}
          <p className="text-gray-600 leading-relaxed">
            <span className="font-bold">Description : </span>
            {typeof book?.description === "string" ? (
              <>
                {showFullDescription
                  ? book.description.split("\r\n").join(" ")
                  : book.description.split("\r\n").slice(0, 2).join(" ")}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? " Read Less" : " Read More"}
                </span>
              </>
            ) : (
              book?.description?.value || "No description available."
            )}
          </p>
          {/* peoples */}
          <div
            className={`${
              subPeop ? "line-clamp-none" : "line-clamp-1"
            } text-gray-700 hover:cursor-pointer clamp`}
            data-before={subPeop ? "▾ " : "▸ "}
            onClick={onSubPeop}
          >
            <span className="font-bold">Subject Peoples : </span>
            <span className="text-sm italic">
              {book?.subject_people?.map((s) => s).join(" ,") ||
                "No data available."}
            </span>
          </div>
          {/* subject */}
          <div
            className={`${
              sub ? "line-clamp-none" : "line-clamp-1"
            } text-gray-700 hover:cursor-pointer clamp`}
            data-before={sub ? "▾ " : "▸ "}
            onClick={onSub}
          >
            <span className="font-bold">Subject : </span>
            <span className="text-sm italic">
              {book?.subjects?.map((s, i) => (
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
            onClick={onPlaces}
          >
            <span className="font-bold">Places : </span>
            <span className="text-sm italic">
              {book?.subject_places?.map((s) => s).join(" ,") ||
                "No data available."}
            </span>
          </div>
          {/* excerpts */}
          <div className="text-gray-700">
            <span className="font-bold">Excerpts</span>
            {typeof book?.excerpts === "string"
              ? book?.excerpts?.value || "No data available."
              : book?.excerpts?.map((e, i) => (
                  <div key={i} className="flex gap-1 flex-col">
                    <span>{e.excerpt}</span>
                    <span>{e.comment}</span>
                  </div>
                ))}
          </div>
          {/* links */}
          <div className="text-gray-700">
            <span className="font-bold">Links</span>
            {typeof book?.links === "string"
              ? book?.links?.value || "No data available."
              : book?.links?.map((l, i) => (
                  <div key={i} className="flex gap-1 flex-col  text-primary">
                    <a target="_blank" href={l.url}>
                      {l.title}
                    </a>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
