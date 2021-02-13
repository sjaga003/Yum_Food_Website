import { createGlobalStyle } from 'styled-components';
import HomeBackground from '../images/home_background.svg';
export const GlobalStyle = createGlobalStyle`
    html {
        width: 100%;
        box-sizing: border-box;
        position:relative;
        height: 100%;
        font-size: 62.5%;
    }
    body {
        width: 100%;
        background: white;
        color: black;
        font-family: 'Roboto', sans-serif;
        position: relative;
        overflow-x: hidden;
        background: url(${HomeBackground}) no-repeat;
        background-size: cover;
        line-height: 1.6;
    }
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        --highlight-color: rgba(255, 185, 2, 1);
        --bg-color: #fff;
        --text-color: #000;
        --secondary-color: #7d90a6;
        --card-color: #f4f7fc;
        --header-font: 'Montserrat', sans-serif;
        --text-font: 'Roboto', sans-serif;
    }
`;
