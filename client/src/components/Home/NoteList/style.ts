import styled, { css } from 'styled-components';
import * as v from '../../../constants/vars';

const NoteList = styled.div`
    width: 95%;
    margin: 0 auto;
`;

const NoteListEmpty = styled.div`
    height: calc(100vh - 165px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const noteBlock = css`
    min-height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 5px;
`;

const Note = styled.div<any>`
    width: 100%;
    margin-top: 10px;
    background-color: ${v.boxDark};
    border-radius: 5px;
    transition: 300ms ease;
    position: relative;
    box-shadow: 0px 0px 8px 0px rgba(77, 77, 77, 0.6);
    &:first-child {
        margin-top: 0;
    }
`;

const NoteHead = styled.div<any>`
    ${noteBlock};
    padding: 10px 0;
    .title {
        height: 100%;
        display: flex;
        align-items: center;
        flex-grow: 1;
        padding-left: 15px;
        box-sizing: border-box;
        a {
            text-decoration: none;
        }
    }
    .modify-btn {
        height: 100%;
        display: flex;
        align-items: center;
        svg {
            padding: 0 10px;
            cursor: pointer;
        }
        .arrow-btn { 
            transform: ${props => props.bodyOpen ? 'rotate(90deg)' : 'rotate(0)'}; 
            transition: 500ms ease;
        }
    }
`;

const NoteBody = styled.div<any>`
    max-height: ${props => props.bodyOpen ? '300px' : '0'};
    width: 100%;
    overflow: auto;
    background-color: ${v.boxLight};
    transition: 500ms ease;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 100;
`;

const NoteBodyTitle = styled.div`
    padding: 10px 15px;
    background-color: ${v.dark};
`;

export {
    NoteList, 
    NoteListEmpty,
    Note, 
    NoteHead,
    NoteBody,
    NoteBodyTitle
}