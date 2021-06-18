import React, { useState } from "react";
import { useTranslation } from 'react-i18next'
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo.png";
import { FiMenu, FiLogIn, FiUserPlus, FiMail, FiBell, FiFilePlus, FiSearch, FiHome } from "react-icons/fi";
import { Link } from 'react-router-dom';
import {
  NavDrawer, NavContainer, NavLink, MobileNav, MobileNavLink,
  MainHeader, DesktopNav, Logo, NavToggle, DrawerContainer
} from "components/General";
const Header = () => {

  const [drawer, showDrawer] = useState(false);
  const { toggleNavbar } = useAnimatedNavToggler();
  const  {t} = useTranslation();

  const defaultLinks = [
    <React.Fragment key="nav">
      <NavContainer key={1}>
        <NavLink as={Link} onClick={toggleNavbar} key="home" to="/">{t('menu.link-1')}</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="search" to="/search">{t('menu.link-2')}</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="report-item" to="/report-item">{t('menu.link-3')}</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="alert-me" to="/alert-me">{t('menu.link-4')}</NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="contact" to="/contact">{t('menu.link-5')}</NavLink>
      </NavContainer>
      <NavContainer key={2}>
        <NavLink as={Link} onClick={toggleNavbar} key="login" to="/agent/login">
          <FiLogIn size={20} /> &nbsp; {t('menu.link-6')}
        </NavLink>
        <NavLink as={Link} onClick={toggleNavbar} key="sign-up" to="/agent/sign-up">
          <FiUserPlus size={20} /> &nbsp; {t('menu.link-7')}
        </NavLink>
      </NavContainer>
    </React.Fragment>
  ];

  const altLinks = [
    <React.Fragment key="nav">
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="home" to="/"><FiHome size={16} /> &nbsp; {t('menu.link-1')}</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="search" to="/search"><FiSearch size={16} /> &nbsp; {t('menu.link-2')}</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="report-item" to="/report-item"><FiFilePlus size={16} /> &nbsp; {t('menu.link-3')}</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="alert-me" to="/alert-me"><FiBell size={16} /> &nbsp; {t('menu.link-4')}</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="contact" to="/contact"><FiMail size={16} /> &nbsp; {t('menu.link-5')}</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="login" to="/agent/login"><FiLogIn size={16} /> &nbsp; {t('menu.link-6')}</MobileNavLink>
      <MobileNavLink as={Link} onClick={() => { toggleNavbar(); showDrawer(!drawer) }} key="sign-up" to="/agent/sign-up"><FiUserPlus size={16} /> &nbsp; {t('menu.link-7')}</MobileNavLink>
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

export default Header;