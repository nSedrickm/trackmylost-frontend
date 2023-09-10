import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";

const StyledInput = styled(PhoneInput)`
  ${tw`w-full px-4 py-2 text-base leading-8 text-gray-700 placeholder-gray-400 transition-colors duration-200 ease-in-out bg-opacity-50 border border-gray-300 rounded outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 rounded-4xl `}
  .form-control {
    ${tw`text-lg border-none`}
  }
  .flag-dropdown {
    ${tw`p-0 bg-transparent border-none`}
  }
`;

const PhoneNumberInput = (props) => {
  return <StyledInput country="ne" {...props} />;
};

export default PhoneNumberInput;
