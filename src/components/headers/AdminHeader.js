import React, { useState } from "react";
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import { FiBell, FiBellOff, FiFileText, FiLogOut, FiMenu as MenuIcon, FiRadio, FiSearch, FiUser } from "react-icons/fi";
import { useAdminContext } from "Admin/AdminContext";
import {
  NavDrawer, NavContainer, NavLink, NavButton, MobileNav, MobileNavLink,
  MobileNavButton, MainHeader, DesktopNav, Logo, NavToggle, DrawerContainer
} from "components/General";
import { Badge } from "rsuite";

const DashHeader = () => {

  const { handleLogOut, state } = useAdminContext();
  const { notifications } = state;
  const [drawer, showDrawer] = useState(false);
  const { toggleNavbar } = useAnimatedNavToggler();

  const defaultLinks = [
    <React.Fragment key="nav">
      <NavContainer key={1}>
        <NavLink onClick={toggleNavbar} key="home" to="/admin/dashboard/items">Items</NavLink>
        <NavLink onClick={toggleNavbar} key="Alerts" to="/admin/dashboard/alerts">Alerts</NavLink>
        <NavLink onClick={toggleNavbar} key="Agents" to="/admin/dashboard/agents">Agents</NavLink>
      </NavContainer>
      <NavContainer key={2}>
        <NavLink onClick={toggleNavbar} key="search" to="/admin/dashboard/search">
          <FiSearch size={20} />
        </NavLink>
        <NavLink onClick={toggleNavbar} key="notifications" to="/admin/dashboard/notifications">
          {notifications.length ? (
            <Badge content={notifications.length}><FiBell size={22} /></Badge>
          ) : (
            <FiBellOff size={22} />
          )}
        </NavLink>
        <NavButton onClick={() => handleLogOut()}>
          <FiLogOut size={20} /> &nbsp; logout
        </NavButton>
      </NavContainer>
    </React.Fragment>
  ];

  const altLinks = [
    <React.Fragment key="nav">
      <MobileNavLink onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="items" to="/admin/dashboard/items">
        <FiFileText size={18} /> &nbsp; Items</MobileNavLink>
      <MobileNavLink onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="alerts" to="/admin/dashboard/alerts">
        <FiRadio size={18} /> &nbsp; Alerts
      </MobileNavLink>
      <MobileNavLink onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="agents" to="/admin/dashboard/agents">
        <FiUser size={18} /> &nbsp; Agents
      </MobileNavLink>

      <MobileNavLink onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="notifications" to="/admin/dashboard/notifications">
        {notifications.length ? (
          <><Badge content={notifications.length}></Badge> &nbsp; Notifications &nbsp; </>
        ) : (
          <><FiBellOff size={18} /> &nbsp; Notifications </>
        )}
      </MobileNavLink>
      <MobileNavButton onClick={() => handleLogOut()}>
        <FiLogOut size={18} /> &nbsp; Logout
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