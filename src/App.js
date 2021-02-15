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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <GlobalStyle home />
          <Content>
            <Nav />
            <Home />
            <Welcome />
          </Content>
        </Route>
        <Route path="/search">
          <GlobalStyle />
          <Search />
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
