import React from "react";

const Button = ({ loading, children = "", onClick, type = "submit" }) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-95 disabled:opacity-30 transition-opacity"
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
