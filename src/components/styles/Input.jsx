import { EyeIcon } from "@heroicons/react/16/solid";
import { EyeSlashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
  label,
  error,
  show,
  setShow,
  ...props
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="flex gap-3 flex-col text-sm/6 font-medium text-gray-900"
      >
        <span className="block text-sm/6 font-semibold text-slate-700">
          {label}
        </span>

        {name === "password" && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShow();
            }}
            aria-hidden="true"
            className="size-6 text-slate-500 absolute top-[42px] right-2"
          >
            {show ? <EyeIcon /> : <EyeSlashIcon />}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
            error
              ? "outline-red-500 focus:outline-red-600"
              : "outline-gray-300 focus:outline-indigo-600"
          }`}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...props}
        />

        <p className="text-red-500 text-sm">{error}</p>
      </label>
    </div>
  );
};

export default Input;
