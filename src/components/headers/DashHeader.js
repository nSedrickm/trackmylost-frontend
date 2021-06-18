import React, { useState } from "react";
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import { FiBell, FiFileText, FiLogOut, FiMenu as MenuIcon, FiSearch } from "react-icons/fi";
import { useDashContext } from "Dashboard/DashboardContext";
import {
  NavDrawer, NavContainer, NavLink, NavButton, MobileNav, MobileNavLink,
  MobileNavButton, MainHeader, DesktopNav, Logo, NavToggle, DrawerContainer
} from "components/General";

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
      <MobileNavLink onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="items" to="/agent/dashboard/items">
        <FiFileText size={16} /> &nbsp; Items</MobileNavLink>

      <MobileNavButton onClick={() => { toggleNavbar(); showDrawer(!drawer) }}>
        <FiBell size={16} /> &nbsp; Notifications
      </MobileNavButton>
      <MobileNavButton onClick={() => handleLogOut()}>
        <FiLogOut size={16} /> &nbsp; Logout
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
        <NavDrawer
          full
          size="xs"
          backdrop={true}
          show={drawer}
          onHide={() => showDrawer(!drawer)}
        >
          <NavDrawer.Header>
            <NavDrawer.Title>Menu</NavDrawer.Title>
          </NavDrawer.Header>
          <DrawerContainer>
            {altLinks}
          </DrawerContainer>
        </NavDrawer>
      </MobileNav>
    </MainHeader>
  );
};

export default DashHeader;