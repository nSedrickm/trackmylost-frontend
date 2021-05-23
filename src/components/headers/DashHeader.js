import React, { useContext } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";

import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import {
  FiBell,
  FiLogOut,
  FiMenu as MenuIcon,
  FiX as CloseIcon
} from "react-icons/fi";
import { Link } from 'react-router-dom';
import { DashContext } from "Dashboard/DasbhoardContext";

const MainHeader = tw.header`flex justify-between items-center max-w-none mx-auto bg-primary-500 `;
const NavLinks = tw.div`inline-flex`;
const NavButton = tw.button`h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline  appearance-none`;
const NavLink = tw(Link)`
    h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none
`;
const Logo = tw.img`h-20 py-1 px-4 bg-white`;
const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`
  lg:hidden z-50 focus:outline-none hocus:text-white transition duration-300
`;
const MobileNavLinks = motion.custom(styled.div`
  ${tw`lg:hidden z-50 fixed top-12 inset-x-4 p-8 border text-center rounded-lg text-gray-900 bg-white shadow-2xl`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

const DesktopNavLinks = tw.nav`hidden lg:flex flex-1 justify-between items-center`;

const DashHeader = () => {

  const { handleLogOut } = useContext(DashContext);

  const collapseBreakpointClass = "lg"
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLinks = [
    <React.Fragment key="nav">
      <NavLinks key={1}>
        <NavLink onClick={toggleNavbar} key="home" to="/dashboard/items">Items</NavLink>
        <NavLink onClick={toggleNavbar} key="Alerts" to="/dashboard/alerts">Alerts</NavLink>
      </NavLinks>
      <NavLinks key={2}>
        <NavButton>
          <FiBell size={20} />
        </NavButton>
        <NavButton onClick={() => handleLogOut()}>
          <FiLogOut size={20} /> &nbsp; logout
        </NavButton>
      </NavLinks>
    </React.Fragment>
  ];


  return (
    <MainHeader>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        <Logo src={logo} alt="logo" />
        {defaultLinks}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        <Logo src={logo} alt="logo" />
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {defaultLinks}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon size={24} tw="mr-4 fixed right-4" /> : <MenuIcon size={24} />}
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

export default DashHeader;