import { motion } from 'framer-motion';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import YumLogo from '../images/Yum_Logo.svg';

const Nav = () => {
  return (
    <Navigation>
      <Logo>
        <img src={YumLogo} alt="Yum Logo" />
      </Logo>
      <NavLinks>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/cookbook">My Recipes</NavItem>
        <NavItem to="/">Event</NavItem>
        <NavItem to="/">Team</NavItem>
        <NavItem to="/search">Search</NavItem>
        <NavItem to="/">Contact</NavItem>
      </NavLinks>
    </Navigation>
  );
};

const Navigation = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 0;
  width: 100%;
  /* position: fixed; */
  left: 0;
  top: 0;
  /* background: white; */
`;

const Logo = styled.div`
  width: 8rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavItem = styled(NavLink)`
  margin: 0px 3rem;
  text-decoration: none;
  font-size: 2rem;
  color: var(--text-color);
`;

export default Nav;
