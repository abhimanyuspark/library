import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router";
import { NavContext } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/fetures/auth";
import Swal from "sweetalert2";
import { Search } from "../components";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { appUser, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const Auth = () => {
    return (
      <>
        {isLogin ? (
          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You want to Sign out!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Sign out!",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(logout());
                  setMobileMenuOpen(false);
                }
              });
            }}
          >
            Sign out <span aria-hidden="true">&rarr;</span>
          </button>
        ) : (
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
            Sign in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </>
    );
  };

  return (
    <header className={`bg-white border-b sticky top-0 z-10 w-full`}>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl gap-2 items-center justify-between p-3 lg:px-4"
      >
        {/* logo */}
        <div className="flex">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              loading="lazy"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* mobile view button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* navigation links */}
        <div className="hidden lg:flex lg:gap-x-12">
          {NavContext?.map((nav, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-sm/6 font-semibold"
                  : "text-gray-900 text-sm/6 font-semibold"
              }
              to={nav?.url}
            >
              {nav?.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex">
          <Search />
        </div>

        {/* login page */}
        <div className="hidden hover:text-primary lg:flex lg:justify-end text-sm/6 font-semibold text-gray-900">
          <Auth />
        </div>
      </nav>

      {/* menu for mobile view */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* logo */}
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                loading="lazy"
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* search */}
              <div className="space-y-1 py-6">
                <Search onChange={() => setMobileMenuOpen(false)} />
              </div>
              {/* Navigaton link */}
              <div className="space-y-2 py-6">
                {NavContext?.map((nav, index) => (
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-100"
                        : "text-gray-900 -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-100"
                    }
                    to={nav?.url}
                  >
                    {nav?.name}
                  </NavLink>
                ))}
              </div>

              {/* login page link */}
              <div className="py-6">
                <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-100">
                  <Auth />
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Nav;
