import React, { useState } from 'react';

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

function App() {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);
  const [cookBookList, setCookBookList] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <GlobalStyle home />
          <Content>
            <Nav />
            <Home />
            <Welcome />
            <RecipePreview
              cookBookList={cookBookList}
              setCookBookList={setCookBookList}
              isCookBookOpen={isCookBookOpen}
              setIsCookBookOpen={setIsCookBookOpen}
            />
            <Contact />
            <Footer />
          </Content>
          <FooterBackgroundCover> </FooterBackgroundCover>
        </Route>
        <Route path="/search">
          <GlobalStyle />
          <Search
            cookBookList={cookBookList}
            setCookBookList={setCookBookList}
            isCookBookOpen={isCookBookOpen}
            setIsCookBookOpen={setIsCookBookOpen}
          />
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
  background-position: center 125%;
  background-repeat: no-repeat;
  /* background: red; */
  height: 100%;
  width: 100%;
  z-index: -3;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default App;
