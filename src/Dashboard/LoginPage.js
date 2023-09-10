import React, { useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { useTranslation } from "react-i18next";
import { useDashContext } from "Dashboard/DashboardContext";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import PhoneNumberInput from "components/PhoneNumberInput";

const SubmitButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Input = tw.input`w-full rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl placeholder-gray-400`;
const Label = tw.label`leading-7 text-xs text-gray-600 uppercase tracking-wide font-medium block mb-2`;
const Form = tw.form`mx-auto md:w-2/5 md:p-10 md:border border-primary-500 rounded-2xl`;
const ToggleButton = tw.span`absolute inset-y-0 right-5 flex items-center  cursor-pointer`;
const NavLink = tw(Link)`
     inline-flex items-center transition duration-300 hocus:text-primary-700 hocus:outline-none  text-primary-500 font-medium no-underline hocus:no-underline  appearance-none
`;
const LoginPage = () => {
  const { handleLogin } = useDashContext();
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();

  return (
    <AnimationRevealPage>
      <section tw="text-gray-600 relative">
        <div tw="container py-28 mx-auto">
          <div tw="flex flex-col text-center w-full mb-12">
            <h1 tw="sm:text-4xl text-2xl font-black mb-4 text-primary-500">
              Agent Login
            </h1>
            <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">
              TrackMyLost agent portal
            </p>
          </div>

          <Form onSubmit={(evt) => handleLogin(evt)}>
            <div tw="flex flex-wrap -m-2">
              <div tw="p-2 w-full">
                <div tw="relative">
                  <Label htmlFor="phone_number">{t("form.number")}</Label>

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
              <div tw="p-2 w-full">
                <Label htmlFor="password">{t("form.password")}</Label>
                <div tw="relative">
                  <Input
                    required
                    type={toggle ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                  />
                  <ToggleButton onClick={() => setToggle(!toggle)}>
                    {toggle ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </ToggleButton>
                </div>
              </div>
            </div>
            <div tw="p-2 w-full mt-2">
              <SubmitButton type="submit">
                <FiLogIn /> &nbsp; {t("menu.link-6")}
              </SubmitButton>
            </div>
            <p tw="leading-relaxed text-base text-center mt-2">
              Not an agent ?{" "}
              <NavLink to="/agent/sign-up"> {t("menu.link-7")}</NavLink>
            </p>
          </Form>
        </div>
      </section>
    </AnimationRevealPage>
  );
};

export default LoginPage;
