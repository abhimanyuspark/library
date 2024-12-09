import React, { useState } from "react";
import SearchList from "../__comp/SearchList";
import AdvancedSearch from "../__comp/AdvancedSearch";
import { Search as Input } from "../../components";

const searchPageTabs = [
  { id: 1, name: "Search", tab: <SearchList /> },
  // {
  //   id: 2,
  //   name: "Advanced",
  //   tab: <AdvancedSearch />,
  // },
];

const Search = () => {
  const [tabs, setTabs] = useState(searchPageTabs[0]);

  return (
    <div className="flex gap-4 flex-col px-4">
      <h1 className="text-slate-500">
        Search Books
      </h1>

      <div className="flex gap-2">
        {searchPageTabs?.map((t, index) => (
          <div
            key={index}
            className="group/item flex gap-1 p-2 flex-col"
            onClick={() => {
              setTabs(t);
            }}
          >
            <h4
              className={`${
                tabs.name === t.name ? "text-primary" : "text-slate-500"
              } cursor-pointer font-bold px-4`}
            >
              {t?.name}
            </h4>
            <div
              className={`h-[2px] bg-primary ${
                tabs.name === t.name ? " w-full" : "w-0"
              } group-hover/item:w-full transition-width`}
            ></div>
          </div>
        ))}
      </div>

      <Input />

      {tabs?.tab}
    </div>
  );
};

export default Search;
