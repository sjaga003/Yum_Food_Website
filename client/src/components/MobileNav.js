import {
  faBars,
  faHamburger,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MobileNav = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <CardContainer
        initial={{ left: -500 }}
        animate={
          isOpen
            ? {
                left: 0,
                boxShadow: `rgb(0 0 0 / 80%) 0px 5px 25px -10px`,
                background: 'rgba(255, 255, 255, 1)',
                transition: { type: 'tween' },
              }
            : {
                background: 'rgba(255, 255, 255, 0)',
                transition: { type: 'tween' },
              }
        }
      >
        <Card>
          <TopRow>
            <FontAwesomeIcon
              onClick={() => setIsOpen(!isOpen)}
              icon={faTimes}
            />
          </TopRow>

          <NavLinks>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/cookbook">My Recipes</NavItem>
            <NavItem to="/">Quicksearch</NavItem>
            <NavItem to="/">Contact Us</NavItem>
            <NavItem to="/search">Search</NavItem>
          </NavLinks>
        </Card>
      </CardContainer>
    </>
  );
};

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
`;

const CardContainer = styled(motion.div)`
  height: 100vh;
  position: fixed;
  top: 0;

  z-index: 6;
`;

const Card = styled(motion.div)`
  background: rgba(0, 0, 0, 0);
  font-family: var(--header-font);
  padding: 3rem 5rem;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  font-size: 2.4rem;
  cursor: pointer;
  svg {
    color: var(--header-color);
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 3rem;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

export default MobileNav;
