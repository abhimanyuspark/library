import React from "react";
import { WifiIcon } from "@heroicons/react/16/solid";

const CheckNetwork = () => {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center flex-col gap-4 p-10 bg-slate-900 text-white font-bold">
      <WifiIcon aria-hidden="true" className="size-8" />
      <h3 className="text-center">You are not connected to internet</h3>
    </div>
  );
};

export default CheckNetwork;
