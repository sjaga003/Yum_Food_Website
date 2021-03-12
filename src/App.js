import '@fontsource/montserrat';
import '@fontsource/prompt';
import '@fontsource/roboto';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from './components/Carousel';
import Contact from './components/Contact';
import CookBookSidebar from './components/CookBookSidebar';
import Footer from './components/Footer';
import { GlobalStyle } from './components/GlobalStyles';
import Home from './components/Home';
import Nav from './components/Nav';
import RecipePreview from './components/RecipePreview';
import Search from './components/Search';
import Welcome from './components/Welcome';
import FooterBackground from './images/footer_background.svg';

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
            <Nav />
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
                  cookBookList={cookBookList}
                  setCookBookList={setCookBookList}
                />
                <RecipePreview
                  key="RecipePreview"
                  cookBookRef={cookBookRef}
                  cookBookList={cookBookList}
                  setCookBookList={setCookBookList}
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
