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

function App() {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/">
          <Content>
            <Nav
              isCookBookOpen={isCookBookOpen}
              setIsCookBookOpen={setIsCookBookOpen}
            />
            <Home />
          </Content>
        </Route>
        <Route path="/search">
          <Recipes
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

export default App;
