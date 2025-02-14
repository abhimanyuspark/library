import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import { Suspense, useEffect } from "react";
import { Loading, ScrollToTop } from "./components";
import {
  About,
  Book,
  Contact,
  Dash,
  ForgetPassword,
  Login,
  NotFound,
  Search,
  SignUp,
  MyBooks,
} from "./page";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "./redux/server/server";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ToastContainer } from "react-toastify";

function App() {
  const { appUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (appUser?.id) {
      dispatch(userDetails(appUser?.id));
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/forget" element={<ForgetPassword />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<Dash />} />
          <Route path="/search/:q/:p" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id/:title" element={<Book />} />
          <Route path="/mybooks" element={<MyBooks />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        closeButton={false}
        draggable="touch"
        pauseOnHover={true}
        theme="light"
      />
      <SpeedInsights />
    </Suspense>
  );
}

export default App;
