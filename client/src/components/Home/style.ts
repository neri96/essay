import styled, { css } from 'styled-components';

import { ArticleList } from './ArticleList/style';
import { NoteList } from './NoteList/style';

const Face = styled.section<any>`
    /* height: ${props => `calc(${props.innerHeight}px - 95px)`}; */
    min-height: 100vh;
    width: 100%;
    margin-top: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const EmptyList = styled.div`
    height: 100%;
    width: 100%;
`;

export { 
    Face,
    ArticleList,
    NoteList,
    EmptyList
}