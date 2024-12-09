import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Field, Label, Switch } from "@headlessui/react";
import { useNavigate, Link } from "react-router";
import { Button, Input, validation } from "../../components";

const Contact = () => {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    country: "",
    phone_number: "",
    message: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    first_name: ""
  });
  const [isSubmit, setIsSubmit] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
    setFormError((p) => ({ ...p, [key]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;
    setIsSubmit(true);
    if (isValid) {
      // const response = await dispatch(contactUs(formData));
      // if (response?.meta?.requestStatus === "fulfilled") {
      //   navigate("/");
      // } else {
      //   setFormError((p) => ({ ...p, ...response?.payload }));
      // }
      setIsSubmit(false);
      console.log(formData);
    } else {
      setFormError((p) => ({ ...p, ...validError }));
      setIsSubmit(false);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Contact sales
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>

      {/* contact form */}
      <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <Input
            type="text"
            label={"First name"}
            name="first-name"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e)}
            error={formError.first_name}
          />
          <Input
            type="text"
            label={"Last name"}
            name="last-name"
            value={formData.last_name}
            onChange={(e) => handleChange("last_name", e)}
          />
          <Input
            type="text"
            label={"Company"}
            name="company"
            value={formData.company}
            onChange={(e) => handleChange("company", e)}
          />
          <Input
            type="text"
            label={"Email"}
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e)}
            error={formError.email}
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value={"US"}>US</option>
                    <option value={"CA"}>CA</option>
                    <option value={"EU"}>EU</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>

                <input
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  value={formData.phone_number}
                  placeholder="123-456-7890"
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>
          </div>

          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm/6 text-gray-600">
              By selecting this, you agree to our{" "}
              <Link to="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </Link>
              .
            </Label>
          </Field>
        </div>

        <div className="mt-10">
          <Button children="Let's talk" loading={isSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Contact;
