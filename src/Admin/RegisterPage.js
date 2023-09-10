import React, { useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import AnimateLoader from "components/Loaders/AnimateLoader";
import toast from "react-hot-toast";
import { FiUserPlus, FiEye, FiEyeOff } from "react-icons/fi";
import { registerAdminUser } from "services/admin.service";
import { Link } from "react-router-dom";
import PhoneNumberInput from "components/PhoneNumberInput";

const SubmitButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Input = tw.input`w-full rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl placeholder-gray-400`;
const Label = tw.label`leading-7 text-xs text-gray-600 uppercase tracking-wide font-medium block mb-2`;
const Form = tw.form`mx-auto md:w-2/5 md:p-10 md:border border-primary-500 rounded-2xl`;
const ToggleButton = tw.span`absolute inset-y-0 right-5 flex items-center  cursor-pointer`;
const NavLink = tw(
  Link
)`inline-flex items-center transition duration-300 hocus:text-primary-700 hocus:outline-none  text-primary-500 font-medium no-underline hocus:no-underline  appearance-none
`;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [isInvalid, setInvalid] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      setInvalid(true);
      evt.target.elements.password2?.focus();
      return;
    }

    let formData = {
      first_name: evt.target.elements.first_name?.value,
      last_name: evt.target.elements.last_name?.value,
      phone_number: evt.target.elements.phone_number?.value,
      town: evt.target.elements.town?.value,
      password: password,
    };
    console.log(formData);

    setLoading(true);
    registerAdminUser(formData)
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.replace("/admin/login");
        }, 1500);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setLoading(false);
          toast.error(error.response.data.errors.phone_number[0]);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setLoading(false);
          toast.error(
            "An error occurred Please check your network and try again"
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setLoading(false);
          toast.error(
            "An error occurred Please check your network and try again"
          );
        }
      });
  };

  if (loading) {
    return <AnimateLoader />;
  } else {
    return (
      <AnimationRevealPage>
        <section tw="text-gray-600 relative">
          <div tw="container py-12 mx-auto">
            <div tw="flex flex-col text-center w-full mb-12">
              <h1 tw="sm:text-4xl text-2xl font-black mb-4 text-primary-500">
                Admin Registration
              </h1>
              <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">
                TrackMyLost Admin registration portal
              </p>
              <p tw="leading-relaxed text-base text-center mt-2">
                Already an Admin ? <NavLink to="/admin/login"> Log in </NavLink>
              </p>
            </div>

            <Form onSubmit={(evt) => handleSubmit(evt)}>
              <div tw="flex flex-wrap -m-2">
                <div tw="p-2 w-full mb-4">
                  <div tw="relative">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      required
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Enter first Name"
                    />
                  </div>
                </div>
                <div tw="p-2 w-full mb-4">
                  <div tw="relative">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      required
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Enter last Name"
                    />
                  </div>
                </div>
                <div tw="p-2 w-full">
                  <div tw="relative">
                    <Label htmlFor="phone_number">Your Phone Number</Label>
                    <PhoneNumberInput
                      required
                      type="tel"
                      placeholder="e.g 670020023"
                      inputProps={{
                        name: "phone_number",
                        required: true,
                        autoFocus: true,
                      }}
                    />
                  </div>
                </div>
                <div tw="p-2 w-full mb-4">
                  <div tw="relative">
                    <Label htmlFor="town">Town</Label>
                    <Input
                      required
                      type="text"
                      id="town"
                      name="town"
                      placeholder="Enter your town"
                    />
                  </div>
                </div>
                <div tw="p-2 w-full">
                  <Label htmlFor="password">Password</Label>
                  <div tw="relative">
                    <Input
                      required
                      type={toggle ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      minLength="4"
                      onChange={(evt) => setPassword(evt.target.value)}
                    />
                    <ToggleButton onClick={() => setToggle(!toggle)}>
                      {toggle ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </ToggleButton>
                  </div>
                </div>
                <div tw="p-2 w-full">
                  <Label htmlFor="password">Confirm Password</Label>
                  <div tw="relative">
                    <Input
                      required
                      type={toggle2 ? "text" : "password"}
                      id="password2"
                      name="password2"
                      placeholder="re-enter password"
                      minLength="4"
                      onChange={(evt) => {
                        setPassword2(evt.target.value);
                        setInvalid(false);
                      }}
                      style={isInvalid ? { border: "1px solid red" } : {}}
                    />
                    <ToggleButton onClick={() => setToggle2(!toggle2)}>
                      {toggle2 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </ToggleButton>
                  </div>
                </div>
              </div>
              <div tw="p-2 w-full mt-2">
                <SubmitButton type="submit" disabled={isInvalid ? true : false}>
                  <FiUserPlus /> &nbsp; Register
                </SubmitButton>
              </div>
            </Form>
          </div>
        </section>
      </AnimationRevealPage>
    );
  }
};

export default RegisterPage;
