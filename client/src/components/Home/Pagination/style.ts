import styled, { css } from 'styled-components';
import * as v from '../../../constants/vars';

const Pagination = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -110px;
`;

const pagitaionChild = css`
    height: 40px;
    /* width: auto; */
    display: flex;
    margin: 5px auto;
`;

const Pages = styled.div<any>`
${pagitaionChild}
.pag-arrow-left, .pag-arrow-right {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        height: 25px !important;
    }
}
.pag-arrow-left {
    svg {
        color: ${props => props.page === 1 && '#4d4d4d'} !important;
    }
}
.pag-arrow-right {
    svg {
        color: ${props => props.page === props.pages && '#4d4d4d'} !important;
    }
}
`;

const PageNumbersWrap = styled.div<any>`
height: 100%;
max-width: 225px;
width: ${props => props.pages * 45}px;
position: relative;
overflow: hidden;
.page-numbers {
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
    top: 0;
    left: -${props => props.distance * 45}px;
    transition: 200ms ease;
}
`;

const PageNumber = styled.div<any>`
height: 100%;
min-width: 35px;
border-radius: 5px;
margin: 0 5px;
background: ${props => props.currentPage ? 'red' : 'blue'};
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
`;

const ShowAll = styled.div`
${pagitaionChild}
`;

export {
    Pagination,
    Pages,
    PageNumbersWrap,
    PageNumber,
    ShowAll
}