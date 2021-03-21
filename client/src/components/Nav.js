import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logoutUser } from '../actions/authAction';
import YumLogo from '../images/Yum_Logo.svg';
import AccountDropdown from './Auth/AccountDropdown';
import decode from 'jwt-decode';

const Nav = ({ isCookBookOpen, setIsCookBookOpen }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); //maybe switch this to just use auth redux state
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = user?.token;

    //JWT
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logoutUser());
        history.push('/');
        setIsCookBookOpen(false);
        setUser(null);
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

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

        {user ? (
          <>
            <LoginContainer>
              <UserImage
                onClick={() => {
                  setDisplayDropdown(!displayDropdown);
                  // document.body.style.overflow = 'hidden';
                }}
              >
                {user.result.imageUrl ? (
                  <img src={user.result.imageUrl} alt={user.result.name} />
                ) : (
                  <AccountIcon>{user.result.name.charAt(0)}</AccountIcon>
                )}
              </UserImage>
              {displayDropdown && (
                <AccountDropdown
                  user={user}
                  setUser={setUser}
                  displayDropdown={displayDropdown}
                  setDisplayDropdown={setDisplayDropdown}
                  isCookBookOpen={isCookBookOpen}
                  setIsCookBookOpen={setIsCookBookOpen}
                />
              )}
            </LoginContainer>
          </>
        ) : (
          <NavItem to="/auth">Login</NavItem>
        )}
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

const UserImage = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  overflow: hidden;
  position: relative;
  font-size: 1.8rem;
  align-items: center;
  flex-shrink: 0;
  font-family: var(--header-font);
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  background: var(--highlight-color);
  color: var(--bg-color);
  font-weight: 600;
  cursor: pointer;
  svg {
    color: var(--bg-color);
    height: 2rem;
  }
  img {
    height: 4rem;
  }
`;

const AccountIcon = styled.span`
  font-size: 2.4rem;
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

const LoginContainer = styled.div`
  margin: 0px 3rem;
  text-decoration: none;
  font-size: 2rem;
  color: var(--text-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export default Nav;
