import { MusicalNoteIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const LinkButton = ({ book, onClick, button_book }) => {
  const navigate = useNavigate();
  const { access, link, isbn, oclc, key, title } = book;
  const { id } = useParams();
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
      if (id) {
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
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Download is not available",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        navigate(`/book/${key}/${title}`);
      }
    }
  };

  return (
    <a
      onClick={onClick || onCheck}
      className="text-white relative cursor-pointer flex w-full gap-2 items-stretch bg-primary rounded-md overflow-hidden"
    >
      <span className="p-2 pl-4 flex items-center">
        {access === "public"
          ? "Read"
          : access === "borrowable"
          ? "Borrow"
          : access === "no_ebook" || access === "unclassified"
          ? "Locate"
          : "Details"}
      </span>

      {button_book ? access === "public" || access === "borrowable" ? (
        <span
          className="border-l-2 border-white p-2 absolute w-full bg-primary transition-all -right-[83%] top-0 hover:-right-[17%] flex items-center gap-3"
          onClick={() => {
            window.open(
              `https://archive.org/details/${link}/page/n16/mode/2up?ref=ol&_autoReadAloud=show&view=theater`,
              "_blank"
            );
          }}
        >
          <MusicalNoteIcon className="size-6" /> <span>Listen</span>
        </span>
      ) : (
        ""
      ) : ""}
    </a>
  );
};

export default LinkButton;
