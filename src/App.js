import React, { useRef, useState } from 'react';

import styled from 'styled-components';
import '@fontsource/prompt';
import '@fontsource/roboto';
import '@fontsource/montserrat';

import Nav from './components/Nav';
import Home from './components/Home';
import { GlobalStyle } from './components/GlobalStyles';
import Recipes from './components/Recipes';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FooterBackground from './images/footer_background.svg';
import RecipePreview from './components/RecipePreview';
import Carousel from './components/Carousel';
import CarouselCard from './components/CarouselCard';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import CookBookSidebar from './components/CookBookSidebar';

function App() {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);
  const [cookBookList, setCookBookList] = useState([]);

  const cookBookRef = useRef();
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <GlobalStyle home />
          <Content>
            <AnimateSharedLayout type="switch">
              <AnimatePresence>
                <Nav />
                <Home />
                <Welcome />
                <Carousel />
                <CookBookSidebar
                  cookBookRef={cookBookRef}
                  isCookBookOpen={isCookBookOpen}
                  setIsCookBookOpen={setIsCookBookOpen}
                  cookBookList={cookBookList}
                  setCookBookList={setCookBookList}
                />
                <RecipePreview
                  cookBookRef={cookBookRef}
                  cookBookList={cookBookList}
                  setCookBookList={setCookBookList}
                  isCookBookOpen={isCookBookOpen}
                  setIsCookBookOpen={setIsCookBookOpen}
                />
                <Contact />
                <Footer />
              </AnimatePresence>
            </AnimateSharedLayout>
          </Content>
          <FooterBackgroundCover> </FooterBackgroundCover>
        </Route>
        <Route path="/search">
          <GlobalStyle />
          <AnimateSharedLayout type="switch">
            <AnimatePresence>
              <Search
                cookBookRef={cookBookRef}
                cookBookList={cookBookList}
                setCookBookList={setCookBookList}
                isCookBookOpen={isCookBookOpen}
                setIsCookBookOpen={setIsCookBookOpen}
              />
            </AnimatePresence>
          </AnimateSharedLayout>
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
`;

const FooterBackgroundCover = styled.div`
  background-image: url(${FooterBackground});
  background-position: center 119%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  z-index: -3;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default App;
