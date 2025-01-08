import React, { Suspense, useState } from "react";
import Nav from "./Nav";
import { CheckNetwork, Loading } from "../components";
import { ThemeContext } from "../data/data";
import { Outlet } from "react-router";
import { useInternetCheck } from "../hooks";

const Layout = () => {
  const [theme] = useState(ThemeContext[3]);
  const isOnline = useInternetCheck();

  return (
    <div className={`theme-${theme.theme}`}>
      <Nav />
      <main className="bg-slate-200 p-4 w-full min-h-[calc(100vh-70px)] max-h-full">
        <div className="mx-auto py-4 w-full h-full lg:w-[80%] bg-white flex gap-4 flex-col border border-slate-200 rounded-md shadow">
          <Suspense fallback={<Loading />}>
            {isOnline ? <Outlet /> : <CheckNetwork />}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
