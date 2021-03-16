import '@fontsource/montserrat';
import '@fontsource/prompt';
import '@fontsource/roboto';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchToCookBook } from './actions/cookBookAction';
import { clearRecipeCards } from './actions/recipeCardsAction';
import {
  fetchAllRecipes,
  addRecipeToDatabase,
  deleteFromDatabase,
} from './api/databaseApi';
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
import { recipePreviewPopular } from './recipePreviewData';

function App() {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);

  const cookBookRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const test = recipePreviewPopular();
    // addRecipeToDatabase({
    //   recipeId: test.results[1].id,
    //   recipeObject: test.results[1],
    // });
    // deleteFromDatabase('60512d613e6e2e232c4ff8c2');
    dispatch(fetchToCookBook());
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <GlobalStyle background="home" />
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
