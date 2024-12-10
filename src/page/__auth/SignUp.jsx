import React, { useState } from "react";
import { Input, validation, Button } from "../../components";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signupToBoth } from "../../redux/server/server";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    name: "",
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

    if (isValid) {
      const response = await dispatch(signupToBoth(formData));
      if (response?.meta?.requestStatus === "fulfilled") {
        navigate("/", { replace: true });
      } else {
        console.log(response)
        setFormError((p) => ({ ...p, ...response?.payload }));
      }
    } else {
      setFormError((p) => ({ ...p, ...validError }));
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
          Sign up to libray account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <Input
            label={"UserName"}
            name={"name"}
            value={formData.name}
            onChange={(e) => {
              handleChange("name", e);
            }}
            error={formError.name}
          />

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

          <Button loading={loading} children="Sign Up" />
        </form>

        <p className="mt-10 text-center text-gray-500">
          Already User .{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
