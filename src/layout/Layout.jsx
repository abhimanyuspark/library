import React, { Suspense, useState } from "react";
import Nav from "./Nav";
import { Loading } from "../components";
import { ThemeContext } from "../data/data";
import { Outlet } from "react-router";

const Layout = () => {
  const [theme] = useState(ThemeContext[3]);

  return (
    <div className={`theme-${theme.theme}`}>
      <Nav />
      <main className="bg-slate-200 p-4 w-full min-h-screen">
        <div className="mx-auto py-4 w-full min-h-screen lg:w-[80%] bg-white flex gap-4 flex-col border border-slate-200 rounded-md">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
