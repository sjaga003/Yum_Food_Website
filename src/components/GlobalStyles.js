import { createGlobalStyle } from 'styled-components';
import HomeBackground from '../images/home_background.svg';
export const GlobalStyle = createGlobalStyle`
html {
        width: 100%;
        box-sizing: border-box;
        position:relative;
        height: 100%;
    }
    body {
        width: 100%;
        background: white;
        color: black;
        font-family: 'Roboto', sans-serif;
        position:relative;
        overflow-x:hidden;
        background: url(${HomeBackground}) no-repeat;
        background-size: cover;
    }
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        --highlight-color: rgba(255, 185, 2, 1);
        --bg-color: white;
        --text-color: black;
        --secondary-color: #7d90a6;
    }
`;
