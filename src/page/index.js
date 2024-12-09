import { lazy } from "react"

const Dash = lazy(()=> import("./__root/Dash"))
const About = lazy(()=> import("./__root/About"))
const Login = lazy(()=> import("./__auth/Login"))
const NotFound = lazy(()=> import("./__auth/NotFound"))
const Contact = lazy(()=> import("./__root/Contact"))
const Book = lazy(()=> import("./__root/Book"))
const Search = lazy(()=> import("./__root/Search"))
const ForgetPassword = lazy(()=> import("./__auth/ForgetPassword"))

export {
    Dash,
    About,
    Login,
    NotFound,
    Contact,
    Book,
    Search,
    ForgetPassword,
}