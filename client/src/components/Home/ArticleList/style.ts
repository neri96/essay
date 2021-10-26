import styled, { css } from 'styled-components';
import * as v from '../../../constants/vars';

const ArticleList = styled.div`
    /* height: calc(100% - 120px); // at least minus 120px */
    width: 95%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    @media (max-width: 1150px) {
        grid-template-columns: repeat(3, 1fr) !important;
    }
    @media (max-width: 930px) {
        grid-template-columns: repeat(2, 1fr) !important;
    }
    @media (max-width: 570px) {
        grid-template-columns: repeat(1, 1fr) !important;
    }
`;

const Article = styled.div`
    height: 300px;
    background-color: ${v.boxDark};
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    @media (min-width: 1750px) {
        height: 400px;
    }

`;

const ArticleHeader = styled.div`
    height: 20%;
    width: 100%;
    /* background-color: rgba(51, 51, 51, .2); */
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        margin: 0 15px;
    }
`;

const ArticleMenuWrap = styled.div`
    position: relative;
`;

const ArticleMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 10px;
    border-radius: 5px;
    overflow: hidden;
    .artc-menu-option {
        height: 35px;
        position: relative;
        button {
            box-shadow: 0px 0px 1px 0px rgba(153, 153, 153, 0.6);
            border-radius: 0;
        }
        button:hover {
            background-color: #404040;
        }
        svg {
            height: 25px !important;
            margin: 0 5px;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            z-index: 100;
        }
    }
`;

const ArticleBody = styled.div`
    height: 100%;
    width: 100%;
    img {
        height: 100%;
        width: 100%;
    }
`;

const ArticleFooter = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(51, 51, 51, .3);
    box-shadow: 0px 0px 5px 0px rgba(51, 51, 51, 0.6);
    .artc-title, .artc-button {
        min-height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .artc-button {
        align-items: flex-start;
    }
    span {
        padding: 10px 10px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export { 
    ArticleList,
    Article,
    ArticleHeader,
    ArticleMenuWrap,
    ArticleMenu,
    ArticleBody,
    ArticleFooter
}