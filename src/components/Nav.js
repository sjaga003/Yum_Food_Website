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
        <ContactButton href="#">Contact</ContactButton>
      </NavLinks>
    </Navigation>
  );
};

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0px;
`;

const Logo = styled.div`
  margin: 0px 30px;
  width: 5vw;

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
  margin: 0px 30px;

  text-decoration: none;
  color: var(--text-color);
  font-size: 20px;
`;

const ContactButton = styled(NavItem)`
  padding: 10px 30px;
  background: var(--highlight-color);
  border-radius: 4px;
  color: var(--bg-color);
`;

export default Nav;
