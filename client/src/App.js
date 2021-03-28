import '@fontsource/montserrat';
import '@fontsource/prompt';
import '@fontsource/roboto';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { setAuthData } from './actions/authAction';
import Auth from './components/Auth/Auth';
import Carousel from './components/Carousel';
import Contact from './components/Contact';
import CookBookPage from './components/CookBookPage';
import CookBookSidebar from './components/CookBookSidebar';
import Footer from './components/Footer';
import { GlobalStyle } from './components/GlobalStyles';
import Home from './components/Home';
import Nav from './components/Nav';
import RecipePreview from './components/RecipePreview';
import Search from './components/Search';
import Welcome from './components/Welcome';
import FooterBackground from './images/footer_background.svg';
import size from './responsiveStyles';
import { useMediaQuery } from 'react-responsive';
import MobileNav from './components/MobileNav';
import { setIsMobile } from './actions/isMobileAction';
import DragAndDropAnimation from './DragAndDropAnimation';
import HowToSection from './HowToSection';
import OpenCardAnimation from './components/OpenCardAnimation';

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
  }, [isMobile]);

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <GlobalStyle background="home" />
          <Content>
            <Nav
              isCookBookOpen={isCookBookOpen}
              setIsCookBookOpen={setIsCookBookOpen}
            />
            <Home />
            <Welcome />
            <HowToSection />

            <Carousel />
            <AnimateSharedLayout type="switch">
              {!isMobile && (
                <CookBookSidebar
                  key="CookBookSidebar"
                  cookBookRef={cookBookRef}
                  isCookBookOpen={isCookBookOpen}
                  setIsCookBookOpen={setIsCookBookOpen}
                />
              )}

              <RecipePreview
                key="RecipePreview"
                cookBookRef={cookBookRef}
                isCookBookOpen={isCookBookOpen}
                setIsCookBookOpen={setIsCookBookOpen}
              />
            </AnimateSharedLayout>
            <Contact />
            <Footer />
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
          <GlobalStyle background="auth" />
          <Auth />
        </Route>
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
