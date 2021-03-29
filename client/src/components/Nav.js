import {
  faBars,
  faBookOpen,
  faHome,
  faSearch,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import styled from 'styled-components';
import { logoutUser } from '../actions/authAction';
import YumLogo from '../images/Yum_Logo.svg';
import size from '../responsiveStyles';
import AccountDropdown from './Auth/AccountDropdown';
import MobileNav from './MobileNav';

const Nav = ({ isCookBookOpen, setIsCookBookOpen }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); //maybe switch this to just use auth redux state
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useSelector((state) => state.isMobile);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    //Added deps to remove ESLint Warning
    //Only supposed to run once on first render []
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log('expired');
        dispatch(logoutUser());
        history.push('/');
        setUser(null);
        try {
          setIsCookBookOpen(false);
        } catch (error) {}
        return;
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [dispatch, history, setIsCookBookOpen, user?.token]);

  if (typeof document !== `undefined`) {
    var prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      var threshold = 0;

      if (currentScrollPos < threshold) {
        document.getElementById('navbar').style.boxShadow =
          '0px 10px 30px -15px rgba(0, 0, 0, 0)';
      } else {
        document.getElementById('navbar').style.background = 'white';
        document.getElementById('navbar').style.boxShadow =
          'rgb(0 0 0 / 70%) 0px 5px 10px -10px';
      }
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('navbar').style.top = '0';
      } else {
        document.getElementById('navbar').style.top = '-500px';
      }
      if (currentScrollPos === 0) {
        document.getElementById('navbar').style.top = '0';
        document.getElementById('navbar').style.background = 'transparent';
        document.getElementById('navbar').style.boxShadow =
          '0px 10px 30px -15px rgba(0, 0, 0, 0)';
      }
      prevScrollpos = currentScrollPos;
    };
  }

  return (
    <Navigation id="navbar">
      <LeftContainer>
        {isMobile && (
          <>
            {' '}
            <BurgerIcon onClick={() => setIsOpen(!isOpen)} icon={faBars} />
            <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
          </>
        )}

        <Logo onClick={() => animateScroll.scrollToTop()}>
          <img src={YumLogo} alt="Yum Logo" />
        </Logo>
      </LeftContainer>
      <NavLinks>
        {!isMobile && (
          <>
            <NavItem to="/">
              <NavIcon icon={faHome} /> Home
            </NavItem>
            <NavItem to="/cookbook">
              <NavIcon icon={faBookOpen} /> My Recipes
            </NavItem>
            <NavItem to="/search">
              <NavIcon icon={faSearch} /> Search
            </NavItem>
          </>
        )}
        {user ? (
          <>
            <LoginContainer>
              <UserImage
                onClick={() => {
                  setDisplayDropdown(!displayDropdown);
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
          <NavItem to="/auth">
            <NavIcon icon={faUserCircle} />
            Login
          </NavItem>
        )}
      </NavLinks>
    </Navigation>
  );
};

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 14vw;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  /* box-shadow: rgb(0 0 0 / 70%) 0px 5px 10px -10px; */
  transition: top 0.5s, box-shadow 0.5s, background 0s;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    padding: 1rem 5vw;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const LeftContainer = styled.div`
  display: flex;
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
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    margin-left: 2rem;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
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
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin: 0;
    margin-left: 3rem;
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    margin: 0;
    font-size: 1.8rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const LoginContainer = styled.div`
  margin-left: 3rem;
  text-decoration: none;
  font-size: 2rem;
  color: var(--text-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    margin: 0;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const NavIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  display: flex;
  justify-self: center;
  align-self: center;
  margin-right: 0.5rem;
`;

const BurgerIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  display: flex;
  justify-self: center;
  align-self: center;
  color: var(--text-color);
  cursor: pointer;
`;

export default Nav;
