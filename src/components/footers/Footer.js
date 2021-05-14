import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts.js"
import logo from "images/logo.png";
import { FiFacebook as FacebookIcon, FiTwitter as TwitterIcon, FiYoutube as YoutubeIcon } from "react-icons/fi";

import { Link } from 'react-router-dom';


const Container = tw(ContainerBase)`bg-primary-700 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-10`;

const Row = tw.div`flex items-center justify-center flex-col px-8 py-8`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-40`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const FooterLink = tw.a`border-b-2 border-transparent hocus:text-gray-100 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const CopyrightAndCompanyInfoRow = tw.div`pb-0 px-10 text-sm font-normal flex flex-col sm:flex-row justify-between items-center text-gray-400`
const CopyrightNotice = tw.a`text-center font-medium tracking-wide text-sm text-gray-100`
const DevInfo = tw.a`text-center font-medium tracking-wide text-sm text-gray-100 hover:text-primary-500 pt-10 sm:pt-0`

const Divider = tw.div`my-8 border-b-2 border-gray-100`


const Footer = () => {

  let Year = new Date().getFullYear();

  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={logo} />
          </LogoContainer>
          <LinksContainer>
            <FooterLink as={Link} key="home" to="/">Home</FooterLink>
            <FooterLink as={Link} key="search" to="/search">Search</FooterLink>
            <FooterLink as={Link} key="report-item" to="/report-item">Report Item</FooterLink>
            <FooterLink as={Link} key="alert-me" to="/alert-me">Alert Me</FooterLink>
            <FooterLink as={Link} key="contact" to="/contact">Contact Us</FooterLink>
          </LinksContainer>
          <SocialLinksContainer>
            <SocialLink href="">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
        </Row>

        <Divider />
        <CopyrightAndCompanyInfoRow>
          <CopyrightNotice>&copy; Copyright {Year}, TrackMyLost</CopyrightNotice>
          <DevInfo href="https://nsedrickm-ezky8.ondigitalocean.app/" target="_blank">Developed by N.S</DevInfo>
        </CopyrightAndCompanyInfoRow>
      </Content>
    </Container>
  );
};

export default Footer;