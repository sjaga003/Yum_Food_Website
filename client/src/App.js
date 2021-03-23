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

function App() {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);

  const cookBookRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    //Added deps to remove ESLint Warning
    //Only supposed to run once on first render []
    dispatch(setAuthData());
  }, [dispatch]);

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
            <Carousel />
            <AnimateSharedLayout type="switch">
              <AnimatePresence>
                <CookBookSidebar
                  key="CookBookSidebar"
                  cookBookRef={cookBookRef}
                  isCookBookOpen={isCookBookOpen}
                  setIsCookBookOpen={setIsCookBookOpen}
                />
                <RecipePreview
                  key="RecipePreview"
                  cookBookRef={cookBookRef}
                  isCookBookOpen={isCookBookOpen}
                  setIsCookBookOpen={setIsCookBookOpen}
                />
              </AnimatePresence>
            </AnimateSharedLayout>
            <Contact />
            <Footer />
          </Content>
          <FooterBackgroundCover> </FooterBackgroundCover>
        </Route>
        <Route path="/search">
          <GlobalStyle background="search" />
          <AnimateSharedLayout type="switch">
            <AnimatePresence>
              <Search
                cookBookRef={cookBookRef}
                isCookBookOpen={isCookBookOpen}
                setIsCookBookOpen={setIsCookBookOpen}
              />
            </AnimatePresence>
          </AnimateSharedLayout>
        </Route>
        <Route path="/cookbook">
          <GlobalStyle background="cookbook" />
          <CookBookPage
            cookBookRef={cookBookRef}
            isCookBookOpen={isCookBookOpen}
            setIsCookBookOpen={setIsCookBookOpen}
          />
        </Route>
        <Route path="/auth">
          <GlobalStyle background="home" />
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
  padding: 0 15vw;
  overflow-x: hidden;
  @media (${size.xl}) {
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
  background-image: url(${FooterBackground});
  background-position: center 116%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  z-index: -3;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default App;
