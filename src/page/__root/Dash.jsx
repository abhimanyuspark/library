import React from "react";
import { Categories } from "../../components";
import { categoriesData } from "../../data/data";
import Image from "../../assets/library.jpg"

const Dash = () => {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-primary underline cursor-pointer pl-4">
          Welcome to my Book app
        </h3>

        <div className="w-full h-80 lg:h-80 relative">
          <img src={Image} alt="library" className="w-full h-full object-cover" />
          <h2 className="absolute top-1/2 left-1/3 text-white">Choose your books here.</h2>
        </div>
      </div>

      {categoriesData?.map((data, index) => {
        return <Categories key={index} data={data} />;
      })}
    </div>
  );
};

export default Dash;
