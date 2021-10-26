import styled, { css } from 'styled-components';
import * as v from '../../../../constants/vars';

const setSidebar = (props: any) => {
    if(props.isSidebarOpen) {
        
    }
}

const Sidebar = styled.aside<any>`
    height: 100%;
    width: 200px;
    position: fixed;
    top: 0;
    left: ${props => props.isSidebarOpen ? '0' : '-200px'};
    display: ${props => props.isRestyled ? 'block' : 'none'};
    background: red;
    transition: 300ms ease;
    z-index: 300;
    ul {
        height: 100%;
        width: 100%;
        background-color: ${v.dark};
        li {
            width: 100%;
            background-color: ${v.boxDark};
        }
        .side-restyle {
            height: 100px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${v.dark};
        }
    }
    @media (max-width: 865px) {
        display: block !important;
        .side-restyle {
            display: none !important;
        }
    }
`;

const SidebarHeader = styled.div`
    height: 50px;
    width: 100%;
    background-color: ${v.superDark};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const SidebarClose = styled.div<any>`
    height: 30px;
    width: 30px;
    position: absolute;
    top: 50%;
    left: ${props => props.isSidebarOpen ? '205px' : '-200px'};
    display: ${props => props.isRestyled ? 'block' : 'none'};
    transform: translateY(-50%);
    transition: 200ms ease;
    @media (max-width: 865px) {
        display: block !important;
    }
`;

const svgIcon = css`
    position: absolute;
    top: 50%;
    left: 80%;
    transform: translateY(-50%);
`;

const SideOption = styled.div<any>`
    width: 100%;  
    cursor: pointer;
    span {
        text-transform: capitalize;
    }
    .option-title {
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        svg {
            ${svgIcon};
            transition: 300ms ease;
            transform: ${props => `translateY(-50%) rotate(${props.open ? '90deg' : '0'})`};
        }
    }  
    .option-body {
        height: ${props => props.open ? '70px' : '0'};
        width: 100%;
        overflow: ${props => props.open ? 'visible' : 'hidden'};
        background-color: ${v.boxLight};
        transition: 300ms ease;
        .option-body-option {
            height: 50%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 15px;
            }
        }
        .option-body-option:hover {
            background-color: #404040;
            span {
                font-size: 17px;
            }
        }
    }
`;

const AddCtgSide = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    svg {
        ${svgIcon};
        height: 20px !important;
    }
`;

export {
    Sidebar,
    SidebarHeader,
    SidebarClose,
    SideOption,
    AddCtgSide
}