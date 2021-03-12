import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import { createGlobalStyle } from 'styled-components';
import HomeBackground from '../images/home_background.svg';
import SearchBackground from '../images/search_background.svg';
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
        color: black;
        font-family: 'Roboto', sans-serif;
        position: relative;
        overflow-x: hidden;
        background: ${(props) => {
          if (props.background === 'home') {
            return `url(${HomeBackground}) no-repeat`;
          } else if (props.background === 'search') {
            return `url(${SearchBackground}) no-repeat`;
          } else {
            return `none`;
          }
        }};
        background-size: cover;
        line-height: 1.6;
        font-size: 1.6rem;
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
