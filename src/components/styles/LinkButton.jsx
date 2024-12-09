import { MusicalNoteIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const LinkButton = ({ book, onClick }) => {
  const navigate = useNavigate();
  const access = book?.ebook_access;
  const link = book?.lending_identifier_s;
  const isbn = book?.isbn?.[0] || book?.bn || book?.isbn;
  const oclc = book?.oclc?.[0] || book?.oclc;
  const { isLogin } = useSelector((state) => state.auth);

  const onCheck = () => {
    if (access === "public") {
      window.open(
        `https://archive.org/details/${link}/mode/2up?ref=ol&view=theater`,
        "_blank"
      );
    } else if (access === "no_ebook") {
      window.open(`https://search.worldcat.org/search?q=bn:${isbn}`, "_blank");
    } else if (access === "unclassified") {
      window.open(`https://search.worldcat.org/title/${oclc}`);
    } else if (access === "borrowable") {
      if (!isLogin) {
        Swal.fire({
          title: "Download File!",
          text: "Please log in to download this file.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Log in",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        return;
      } else {
        window.open(
          `https://archive.org/details/${link}/mode/2up?ref=ol&view=theater`,
          "_blank"
        );
      }
    } else {
      //access =  printdisabled
      navigate(`/book/${book?.key.split("/works/")[1]}`);
    }
  };

  return (
    <a
      onClick={onClick || onCheck}
      className="cursor-pointer flex w-full gap-2 justify-between items-stretch rounded-md bg-primary px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-95 disabled:opacity-30 transition-opacity"
    >
      <span className="hover:flex-1 transition-all">
        {access === "public"
          ? "ReadOnly"
          : access === "borrowable"
          ? "Borrow"
          : access === "no_ebook" || access === "unclassified"
          ? "Locate"
          : "DetailsOnly"}
      </span>
      {access === "public" || access === "borrowable" ? (
        <hr className="border border-white h-auto" />
      ) : (
        ""
      )}
      {access === "public" || access === "borrowable" ? (
        <span className="transition-all hover:flex-1" onClick={()=>{
          window.open(`https://archive.org/details/${link}/page/n16/mode/2up?ref=ol&_autoReadAloud=show&view=theater`, "_blank")
        }}>
          <MusicalNoteIcon className="text-white size-6" />
        </span>
      ) : (
        ""
      )}
      {/* <span>
        {access}
        {" , "}
        {link}
      </span> */}
    </a>
  );
};

export default LinkButton;
