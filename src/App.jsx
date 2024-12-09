import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import { Suspense } from "react";
import { Loading, ScrollToTop } from "./components";
import { About, Book, Contact, Dash, ForgetPassword, Login, NotFound, Search, SignUp, MyBooks } from "./page";

function App() {
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
          <Route path="/book/:id" element={<Book />} />
          <Route path="/mybooks" element={<MyBooks />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
