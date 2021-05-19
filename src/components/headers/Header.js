import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";

import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import {
  FiMenu as MenuIcon,
  FiX as CloseIcon
} from "react-icons/fi";
import { Link } from 'react-router-dom';

const MainHeader = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
  appearance-none no-underline hocus:no-underline
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`mr-3 mr-3 h-16 sm:w-24 md:w-36 md:h-24`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-50 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion.custom(styled.div`
  ${tw`lg:hidden z-50 fixed top-12 inset-x-4 p-8 border text-center rounded-lg text-gray-900 bg-white shadow-2xl`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

const Header = ({ roundedHeaderButton = true, logoLink, links, className, collapseBreakpointClass = "lg" }) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */


  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLinks = [
    <React.Fragment key="nav">
      <NavLinks key={1}>
        <NavLink as={Link} onClick={toggleNavbar} key="home" to="/">Home</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="search" to="/search">Search</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="report-item" to="/report-item">Report Item</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="alert-me" to="/alert-me">Alert Me</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="contact" to="/contact">Contact Us</NavLink>
      </NavLinks>
      <NavLinks key={2}>
        <NavLink as={Link} to="/login" tw="lg:ml-12!">
          Login
      </NavLink>
        <PrimaryLink as={Link} css={roundedHeaderButton && tw`rounded-full`} to="/sign-up">Sign Up</PrimaryLink>
      </NavLinks>
    </React.Fragment>
  ];

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <MainHeader className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6 mr-4 fixed right-4" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </MainHeader>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};

export default Header;