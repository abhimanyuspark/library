import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64 p-4">
      <ExclamationCircleIcon className="w-16 h-16 text-gray-400" />
      <p className="mt-4 text-lg font-medium text-gray-600">No Data Found</p>
    </div>
  );
};

export default Error;
