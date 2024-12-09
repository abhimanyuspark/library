import React from "react";
import DropDown from "./DropDown";

const Themes = ({ value = "", options = [], setTheme }) => {
  
  return (
    <div className="flex items-center gap-2 p-2">
      <p className="pl-2 text-lg font-bold">Select Theme : </p>

      <DropDown width="100px" options={options} value={value} field={(i)=> i.name} onChange={setTheme} />
    </div>
  );
};

export default Themes;
