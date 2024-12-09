import React, { useState } from "react";
import { Input, validation, Button } from "../../components";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login, setError, startLoading } from "../../redux/fetures/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
    setFormError((p) => ({ ...p, [key]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;
    dispatch(startLoading());

    if (isValid) {
      setTimeout(() => {
        navigate(-1);
        dispatch(login(formData));
      }, 1000);
    } else {
      setFormError((p) => ({ ...p, ...validError }));
      dispatch(setError(validError));
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          loading="lazy"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <Input
            label={"Email"}
            name={"email"}
            value={formData.email}
            onChange={(e) => {
              handleChange("email", e);
            }}
            error={formError.email}
          />

          <Input
            label={"Password"}
            name={"password"}
            type={show ? "text" : "password"}
            autoComplete="false"
            value={formData.password}
            onChange={(e) => {
              handleChange("password", e);
            }}
            show={show}
            setShow={() => {
              setShow(!show);
            }}
            error={formError.password}
          />

          <Link
            to="/forget"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>

          <Button loading={loading} children="Sign in" />
        </form>

        <p className="mt-10 text-center text-gray-500">
          Not a member?{" "}
          <Link
            to="#"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
