import '@fontsource/montserrat';
import '@fontsource/prompt';
import '@fontsource/roboto';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { setAuthData } from './actions/authAction';
import { setIsMobile } from './actions/isMobileAction';
import Auth from './components/AuthPage/AuthPage';
import CookBookPage from './components/CookBookPage';
import { GlobalStyle } from './styles/GlobalStyles';
import MainPage from './components/MainPage/MainPage';
import Search from './components/SearchPage/SearchPage';
import size from './styles/responsiveStyles';

function App() {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);

  const cookBookRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    //Added deps to remove ESLint Warning
    //Only supposed to run once on first render []
    dispatch(setAuthData());
  }, [dispatch]);

  const isMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <GlobalStyle background="home" />
            <Content>
              <MainPage
                isCookBookOpen={isCookBookOpen}
                setIsCookBookOpen={setIsCookBookOpen}
                cookBookRef={cookBookRef}
              />
            </Content>
            <FooterBackgroundCover />
          </Route>
          <Route path="/search">
            <GlobalStyle background="search" />
            <Content>
              <AnimateSharedLayout type="switch">
                <AnimatePresence>
                  <Search
                    cookBookRef={cookBookRef}
                    isCookBookOpen={isCookBookOpen}
                    setIsCookBookOpen={setIsCookBookOpen}
                  />
                </AnimatePresence>
              </AnimateSharedLayout>
            </Content>
          </Route>
          <Route path="/cookbook">
            <GlobalStyle background="cookbook" />
            <Content>
              <CookBookPage
                cookBookRef={cookBookRef}
                isCookBookOpen={isCookBookOpen}
                setIsCookBookOpen={setIsCookBookOpen}
              />
            </Content>
          </Route>
          <Route path="/auth">
            HELLO
            {/* <GlobalStyle background="auth" />
            <Auth /> */}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100%;
  padding: 0 14vw;
  overflow-x: hidden;
  @media (${size.xl}) {
    padding: 0 25vw;
  }
  @media (${size.lg}) {
    padding: 0;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const FooterBackgroundCover = styled.div`
  background: rgb(227, 139, 0);
  background: linear-gradient(
    180deg,
    rgba(227, 139, 0, 0.29735644257703087) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  transform: skewY(3deg);
  background-size: cover;
  background-position: bottom;
  width: 100vw;
  height: 35rem;
  overflow-x: hidden;
  background-repeat: no-repeat;
  z-index: -3;
  position: absolute;
  bottom: 0;
  left: 0;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    height: 60rem;
  }
  @media (${size.xs}) {
  }
`;

export default App;
