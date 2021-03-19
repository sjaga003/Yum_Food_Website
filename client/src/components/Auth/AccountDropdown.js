import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../actions/authAction';

const AccountDropdown = ({
  user,
  setUser,
  displayDropdown,
  setDisplayDropdown,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logoutUser());
    history.push('/');
    setUser(null);
  };

  return (
    <>
      <Background
        className="background"
        onClick={(e) => {
          if (e.target.classList.contains('background')) {
            setDisplayDropdown(!displayDropdown);
          }
        }}
      ></Background>
      <Card>
        <UserImage>
          {user.result.imageUrl ? (
            <img src={user.result.imageUrl} alt={user.result.name} />
          ) : (
            <AccountIcon>{user.result.name.charAt(0)}</AccountIcon>
          )}
        </UserImage>
        <UserName>{user.result.name}</UserName>
        <Email>{user.result.email}</Email>
        <Body>
          <Button onClick={() => logout()}>Logout</Button>
        </Body>
      </Card>
    </>
  );
};

const Card = styled.div`
  background: var(--card-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 30rem;
  padding: 2rem;
  color: var(--header-color);
  font-family: var(--header-font);
  font-size: 2.4rem;
  border-radius: 6px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  position: absolute;
  top: 50px;
  left: -132px;
  z-index: 10;
`;

const UserImage = styled.div`
  width: 8rem;
  height: 8rem;
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
  svg {
    color: var(--bg-color);
    height: 8rem;
  }
  img {
    height: 8rem;
  }
`;

const AccountIcon = styled.span`
  font-size: 3.6rem;
`;

const UserName = styled.span`
  text-align: center;
  margin-top: 1rem;
`;

const Email = styled.span`
  text-align: center;
  font-family: var(--text-font);
  color: var(--text-color);
  font-size: 1.6rem;
`;

const Body = styled.div`
  border-top: 1px solid lightgray;
  width: 100%;
  margin-top: 1rem;
`;

const Button = styled.button`
  border: 0;
  padding: 1rem 2rem;
  font-family: var(--text-font);
  font-size: 1.8rem;
  cursor: pointer;
  outline: none;
  background: var(--highlight-color);
  color: white;
  border-radius: 4px;
  margin-top: 2rem;
  width: 100%;
`;

const Background = styled.div`
  width: 100%;
  min-height: 100vh;

  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
`;

export default AccountDropdown;
