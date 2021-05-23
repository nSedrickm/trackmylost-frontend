import React, { useState, useContext } from "react";
import tw from "twin.macro";
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import { FiBell, FiLogOut, FiMenu as MenuIcon } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { DashContext } from "Dashboard/DasbhoardContext";
import { Drawer } from "rsuite";

const MainHeader = tw.header`flex justify-between items-center max-w-none mx-auto bg-primary-500 `;
const NavLinks = tw.div`inline-flex`;
const NavButton = tw.button`h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline  appearance-none`;
const NavLink = tw(Link)`
    h-20 flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none
`;

const MobileNavButton = tw.button`h-20 inline-flex w-1/2 items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-primary-500 font-medium px-6 py-3 no-underline appearance-none mb-4  shadow-lg border border-gray-100`;
const MobileNavLink = tw(Link)`
    h-20 flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-primary-500 font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none mb-4 shadow-lg border border-gray-100
`;
const Logo = tw.img`h-20 py-1 px-4 bg-white`;
const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`
  lg:hidden z-50 focus:outline-none hocus:text-white transition duration-300
`

const DesktopNavLinks = tw.nav`hidden lg:flex flex-1 justify-between items-center`;

const DashHeader = () => {

  const { handleLogOut } = useContext(DashContext);
  const [drawer, showDrawer] = useState(false);

  const collapseBreakpointClass = "lg"
  const { toggleNavbar } = useAnimatedNavToggler();
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

  const altLinks = [
    <React.Fragment key="nav">
      <MobileNavLink onClick={toggleNavbar} key="home" to="/dashboard/items">Items</MobileNavLink>
      <MobileNavLink onClick={toggleNavbar} key="Alerts" to="/dashboard/alerts">Alerts</MobileNavLink>

      <MobileNavButton>
        <FiBell size={20} />
      </MobileNavButton>
      <MobileNavButton onClick={() => handleLogOut()}>
        <FiLogOut size={20} /> &nbsp; logout
        </MobileNavButton>
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
        <NavToggle
          onClick={() => {
            toggleNavbar()
            showDrawer(!drawer)
          }} >
          <MenuIcon size={24} />
        </NavToggle>
        <Drawer
          full
          backdrop={true}
          show={drawer}
          onHide={() => showDrawer(!drawer)}
        >
          <Drawer.Header>
            <Drawer.Title>Menu</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {altLinks}
          </Drawer.Body>
        </Drawer>

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