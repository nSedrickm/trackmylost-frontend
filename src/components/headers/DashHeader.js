import React, { useState } from "react";
import tw from "twin.macro";
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import { FiBell, FiLogOut, FiMenu as MenuIcon, FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useDashContext } from "Dashboard/DashboardContext";
import { Drawer } from "rsuite";

const MainHeader = tw.header`flex justify-between items-center max-w-none mx-auto bg-primary-500 shadow-lg`;
const NavContainer = tw.div`inline-flex`;
const NavButton = tw.button`h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline  appearance-none`;
const NavLink = tw(Link)`
    h-20 flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none
`;
const MobileNavButton = tw.button`h-20 inline-flex w-1/2 items-center transition duration-300 bg-primary-500 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline appearance-none mb-4  shadow-lg border border-gray-100`;
const MobileNavLink = tw(Link)`
    h-20 flex items-center transition duration-300 bg-primary-500 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none mb-4 shadow-lg
`;
const Logo = tw.img`h-20 py-1 px-4 bg-white`;
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center`;
const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden z-50 focus:outline-none focus:bg-primary-500 hocus:text-white transition duration-300`;

const DashHeader = () => {

  const { handleLogOut } = useDashContext();
  const [drawer, showDrawer] = useState(false);
  const { toggleNavbar } = useAnimatedNavToggler();

  const defaultLinks = [
    <React.Fragment key="nav">
      <NavContainer key={1}>
        <NavLink onClick={toggleNavbar} key="home" to="/agent/dashboard/items">Items</NavLink>
      </NavContainer>
      <NavContainer key={2}>
        <NavLink onClick={toggleNavbar} key="search" to="/agent/dashboard/search">
          <FiSearch size={20} />
        </NavLink>
        <NavButton>
          <FiBell size={20} />
        </NavButton>
        <NavButton onClick={() => handleLogOut()}>
          <FiLogOut size={20} /> &nbsp; logout
        </NavButton>
      </NavContainer>
    </React.Fragment>
  ];

  const altLinks = [
    <React.Fragment key="nav">
      <MobileNavLink onClick={toggleNavbar} key="items" to="/agent/dashboard/items">Items</MobileNavLink>

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
      <DesktopNav>
        <Logo src={logo} alt="logo" />
        {defaultLinks}
      </DesktopNav>

      <MobileNav>
        <Logo src={logo} alt="logo" />
        <NavToggle
          onClick={() => {
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
      </MobileNav>
    </MainHeader>
  );
};

export default DashHeader;