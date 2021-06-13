import React from "react";
import tw from "twin.macro";
import { Container as ContainerBase } from "components/misc/Layouts.js"

const Container = tw(ContainerBase)`bg-primary-500 text-gray-100`
const Content = tw.div`max-w-screen-xl mx-auto py-8`;

const CopyrightAndCompanyInfoRow = tw.div`pb-0 px-10 text-sm font-normal flex flex-col sm:flex-row justify-between items-center text-gray-400`
const CopyrightNotice = tw.p`text-center font-medium tracking-wide text-sm text-gray-100`
const DevInfo = tw.a`text-center font-medium tracking-wide text-sm text-gray-100 hover:border-b-2 hover:border-gray-100 pt-10 sm:pt-0 appearance-none no-underline hocus:no-underline hocus:text-white`


const DashFooter = () => {

  let Year = new Date().getFullYear();

  return (
    <Container>
      <Content>
        <CopyrightAndCompanyInfoRow>
          <CopyrightNotice>&copy; Copyright {Year}, TrackMyLost</CopyrightNotice>
          <DevInfo href="https://github.com/nsedrickm" target="_blank">Developed by N.S</DevInfo>
        </CopyrightAndCompanyInfoRow>
      </Content>
    </Container>
  );
};

export default DashFooter;