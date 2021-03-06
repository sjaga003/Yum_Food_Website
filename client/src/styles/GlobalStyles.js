import { createGlobalStyle } from 'styled-components';
import HomeBackground from '../images/home_background.svg';
import SearchBackground from '../images/search_background.svg';
import size from './responsiveStyles';
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
        font-family: 'Hind', sans-serif;
        position: relative;
        overflow-x: hidden;
        background: ${(props) => {
          if (props.background === 'home') {
            return `url(${HomeBackground}) no-repeat`;
          } else if (props.background === 'search') {
            return `url(${SearchBackground}) no-repeat`;
          } else if (props.background === 'cookbook') {
            return `url(${SearchBackground}) no-repeat`;
          } else if (props.background === 'auth') {
            return `url(${SearchBackground}) no-repeat`;
          } else {
            return `none`;
          }
        }};
        background-size: cover;
        line-height: 1.6;
        font-size: 1.6rem;
        @media (${size.xl}) {
        
        }
        @media (${size.lg}) {
        }
        @media (${size.md}) {
        
          background: ${(props) => {
            if (props.background === 'home') {
              return `none`;
            } else if (props.background === 'search') {
              return `url(${SearchBackground}) no-repeat cover`;
            } else if (props.background === 'cookbook') {
              return `url(${SearchBackground}) no-repeat cover`;
            }
          }}
        }
        @media (${size.sm}) {
        
        }
        @media (${size.xs}) {
        
        }
    }
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        --highlight-color: #F5A11C;
        --button-hover-color: #E38B00;
        --bg-color: #ffff;
        --text-color: #5F7597;
        --header-color: #29315D;
        --secondary-color: #718096;
        --card-color: #f4f7fc;
        --header-font: 'Montserrat', sans-serif;
        --text-font: 'Hind', sans-serif;
    }
`;
