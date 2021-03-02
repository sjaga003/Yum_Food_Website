import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import YumLogo from '../images/Yum_Logo.svg';

const Nav = () => {
  return (
    <Navigation>
      <Logo>
        <img src={YumLogo} alt="Yum Logo" />
      </Logo>
      <NavLinks>
        <NavItem href="#">Home</NavItem>
        <NavItem href="#">Menu</NavItem>
        <NavItem href="#">Event</NavItem>
        <NavItem href="#">Team</NavItem>
        <NavItem href="#">Shop</NavItem>
        <NavItem href="#">Contact</NavItem>
      </NavLinks>
    </Navigation>
  );
};

const Navigation = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

const NavItem = styled.a`
  margin: 0px 3rem;

  text-decoration: none;
  color: var(--text-color);
  font-size: 2rem;
`;

const ContactButton = styled(motion.div)`
  padding: 1rem 3rem;
  background: var(--highlight-color);
  border-radius: 4px;
  color: var(--bg-color);
  position: relative;
`;

export default Nav;
