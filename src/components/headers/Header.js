import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import { FiMenu, FiLogIn, FiUserPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { Drawer } from "rsuite";

const MainHeader = tw.header`flex justify-between items-center max-w-none mx-auto bg-primary-500 shadow-lg`;
const NavContainer = tw.div`inline-flex`;
const NavDrawer = styled(Drawer)`
.rs-drawer-content {
  ${tw`bg-primary-500 left-10`}
}
.rs-drawer-header .rs-drawer-title, .rs-drawer-header-close {
  ${tw`text-white right-10`}
}
`;
const NavButton = tw.button`h-20 inline-flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline  appearance-none`;
const NavLink = tw(Link)`
    h-20 flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none hocus:text-white text-white font-medium px-6 py-3 no-underline hocus:no-underline  appearance-none
`;
const MobileNavLink = tw(Link)`
    h-20 flex items-center transition duration-300 hocus:bg-primary-700 hocus:outline-none text-white hocus:text-white font-medium px-6 py-3 no-underline hocus:no-underline appearance-none
`;
const Logo = tw.img`h-20 py-2 px-4 bg-white`;
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center`;
const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden z-50 focus:outline-none focus:bg-primary-500 hocus:text-white transition duration-300`;
const DrawerContainer = tw.div`mt-6 bg-primary-500 -mb-48`;

const Header = () => {

  const [drawer, showDrawer] = useState(false);
  const { toggleNavbar } = useAnimatedNavToggler();

  const defaultLinks = [
    <React.Fragment key="nav">
      <NavContainer key={1}>
        <NavLink as={Link} onClick={toggleNavbar} key="home" to="/">Home</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="search" to="/search">Search</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="report-item" to="/report-item">Report Item</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="alert-me" to="/alert-me">Alert Me</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="contact" to="/contact">Contact Us</NavLink>
      </NavContainer>
      <NavContainer key={2}>
        <NavLink as={Link} onClick={toggleNavbar} key="login" to="/agent/login">
          <FiLogIn size={20} /> &nbsp; Login
        </NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="sign-up" to="/agent/sign-up">
          <FiUserPlus /> &nbsp; Sign Up
        </NavLink>
      </NavContainer>
    </React.Fragment>
  ];

  const altLinks = [
    <React.Fragment key="nav">
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="home" to="/">Home</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="search" to="/search">Search</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="report-item" to="/report-item">Report Item</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="alert-me" to="/alert-me">Alert Me</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="contact" to="/contact">Contact Us</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="login" to="/agent/login"><FiLogIn size={20} /> &nbsp; login</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="sign-up" to="/agent/sign-up"><FiUserPlus /> &nbsp; Sign Up</MobileNavLink>
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
          <FiMenu size={24} />
        </NavToggle>
        <NavDrawer
          full
          size="xs"
          backdrop={true}
          show={drawer}
          onHide={() => showDrawer(!drawer)}
        >
          <Drawer.Header>
            <Drawer.Title>Menu</Drawer.Title>
          </Drawer.Header>
          <DrawerContainer>
            {altLinks}
          </DrawerContainer>
        </NavDrawer>
      </MobileNav>
    </MainHeader>
  );
};

export default Header;