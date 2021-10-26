import styled, { createGlobalStyle, keyframes } from "styled-components";
import * as v from './constants/vars';

const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        min-height: 100vh;
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        padding: 0;
    }

    body {
        height: 100%;
        width: 100%;
        min-height: 100vh;
        padding: 0;
        margin: 0;
        background-color: #333;
        background-size: cover;
    }

    #root {
        height: 100%;
    }

    a, span, h1, h2, h3, h4, label, input, button {
        color: #ccc;
        font-family: 'Montserrat Alternates', sans-serif;
    }

    h1, h2, h3, h4 {
        margin: 0;
        color: ${v.textColor};
    }

    nav {
        padding: 0;
    }

    ul {
        margin: 0;
        padding: 0;
        li {
            list-style-type: none;
            a {
                text-decoration: none;
            }
        }
    }

    svg {
        height: 30px !important;
        width: 30px !important;
        color: #ccc; 
        cursor: pointer;
    }

    .error-block {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .error {
        font-size: 14px;
        color: #ff3333;
    }

    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: auto !important;
        width: auto !important;
        z-index: 10000;
    }

    .fade-modal-enter {
        opacity: 0;
    }
    .fade-modal-enter-active {
        opacity: 1;
        transition: 300ms;
    }
    .fade-modal-exit {
        opacity: 1;
    }
    .fade-modal-exit-active {
        opacity: 0;
        transition: 300ms;
    }
`;

export default GlobalStyle;