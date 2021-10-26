import styled, { css } from 'styled-components';
import * as v from '../../constants/vars';

import { Input, ModalFooter } from '../reusable/reusableStyles';

const headerElement = css`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = styled.header`
    height: 80px;
    width: 100%;
    background: ${v.boxLight};
    box-shadow: 0px 3px 5px 0px rgba(102, 102, 102, 0.6);
    display: flex;
    .logo {
        height: 100%;
        width: 15%;
        ${headerElement}
        img {
            height: 100%;
            cursor: pointer;
        }
        @media (max-width: 450px) {
            height: 60% !important;
        }
    }
    @media (max-width: 450px) {
        height: 150px !important;
        align-items: center;
        flex-direction: column !important;
    }
`;

const RightSide = styled.div`
    ${headerElement};
    margin-left: auto;
    margin-right: 2.5%;
    @media (max-width: 450px) {
        height: 40%;
        width: 95%;
        margin: 0;
    }
`;

const NoteMenuBtn = styled.div`
    height: 35px;
    position: relative;
    margin-right: 25px;
`;

const NoteMenu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${v.superDark};
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    button {
        box-shadow: 0px 0px 1px 0px rgba(153, 153, 153, 0.6);
        border-radius: 0;
    }
    button:hover {
        background-color: #404040;
    }
`;

export { 
    Header, 
    RightSide,
    NoteMenuBtn,
    NoteMenu,
    Input,
    ModalFooter
}