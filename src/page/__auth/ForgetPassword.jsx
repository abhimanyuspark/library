import React, { useState } from "react";
import { Input, validation, Button } from "../../components";
import { Link, useNavigate } from "react-router";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [formError, setFormError] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
    setFormError((p) => ({ ...p, [key]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;
    setLoading(true);

    if (isValid) {
      setTimeout(() => {
        navigate(-1, { replace: true });
        //
        setLoading(false);
      }, 1000);
    } else {
      setFormError((p) => ({ ...p, ...validError }));
      setLoading(false);
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
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Forget Password
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

          <Link
            to="/login"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>

          <Button loading={loading} children="Sign in" />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
