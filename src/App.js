import React, { useState } from 'react';

import styled from 'styled-components';
import '@fontsource/prompt';
import '@fontsource/roboto';
import '@fontsource/montserrat';

import Nav from './components/Nav';
import Home from './components/Home';
import { GlobalStyle } from './components/GlobalStyles';
import Recipes from './components/Recipes';

function App() {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);
  return (
    <div className="App">
      <GlobalStyle />
      <Content>
        <Nav
          isCookBookOpen={isCookBookOpen}
          setIsCookBookOpen={setIsCookBookOpen}
        />
        <Home />
        <Recipes
          isCookBookOpen={isCookBookOpen}
          setIsCookBookOpen={setIsCookBookOpen}
        />
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  min-height: 100vh;
  padding: 0px 15vw;
  overflow-x: hidden;
  height: 100%;
`;

export default App;
