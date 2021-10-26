import styled from 'styled-components';

import * as v from '../../constants/vars';

const NoteDetails = styled.section`
    height: calc(100vh - 80px);
    /* max-height: 100wv; */
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const DetailsHeader = styled.div`
    height: 80px;
    min-height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 5px 0px rgb(77, 77, 77);
`;

const DetailsBody = styled.div`
    flex-grow: 1;
    padding: 0 20px;
    box-sizing: border-box;
    overflow-y: auto;
    p {
        text-indent: 20px;
        color: ${v.textColor};
        line-height: 1.4;
    }
`;

const DetailsCtg = styled.div`
    height: 40px;
    width: 100%;
    background-color: ${v.boxDark};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    box-sizing: border-box;
`;

export { 
    NoteDetails,
    DetailsHeader,
    DetailsBody,
    DetailsCtg
}