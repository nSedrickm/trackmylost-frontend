import React from "react";
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

const MainHeader = tw.header`flex justify-between items-center max-w-none mx-auto bg-primary-500 `;

export const NavLinks = tw.div`inline-flex`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
const NavButton = tw.button`h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline  appearance-none`;

export const NavLink = tw(Link)`
    h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none
`;


export const Logo = tw.img`h-20 py-1 px-4 bg-white`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw(NavButton)`
  lg:hidden z-50 focus:outline-none hocus:text-white transition duration-300
`;
export const MobileNavLinks = motion.custom(styled.div`
  ${tw`lg:hidden z-50 fixed top-12 inset-x-4 p-8 border text-center rounded-lg text-gray-900 bg-white shadow-2xl`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`hidden lg:flex flex-1 justify-between items-center`;

const DashHeader = ({ roundedHeaderButton = true, logoLink, links, className, collapseBreakpointClass = "lg" }) => {
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
        <NavLink onClick={toggleNavbar} key="home" to="/dashboard/items">Items</NavLink>
        <NavLink onClick={toggleNavbar} key="Alerts" to="/dashboard/alerts">Alerts</NavLink>
      </NavLinks>
      <NavLinks key={2}>
        <NavButton><FiBell size={20} /></NavButton>
        <NavButton><FiLogOut size={20} /> &nbsp; logout</NavButton>
      </NavLinks>
    </React.Fragment>
  ];


  links = links || defaultLinks;

  return (
    <MainHeader className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        <Logo src={logo} alt="logo" />
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        <Logo src={logo} alt="logo" />
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {links}
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