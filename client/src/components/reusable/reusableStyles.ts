import styled, { css } from 'styled-components';
import * as v from '../../constants/vars';

enum ModalType {
    MODIFY = 'modify',
    AUTH = 'auth'
}

const Modal = styled.div`
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1001;
`;

const Overlay = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ModalHeader = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    svg {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 27px !important;
    }
`;

const modalTypeStyles = (props: any, { auth, modify }: any) => {
    if(props.modalType === ModalType.AUTH) {
        return auth;
    } else return modify;
}

const Window = styled.div<any>`
    height: auto;
    width: 400px;
    background-color: ${props => modalTypeStyles(props, { auth: v.superDark, modify: v.boxDark })};
    box-shadow: ${props => modalTypeStyles(props, { 
        auth: '0px 0px 6px 0px rgba(51, 51, 51, 0.6)' , 
        modify: '0px 0px 6px 0px rgba(77, 77, 77, 0.6)' 
    })};
    border-radius: 5px;
    /* overflow: hidden; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .form {
        width: 100%;
    }
`;

const fieldStyles = css`
    padding: 0 0 0 5px;
    box-sizing: border-box;
    font-size: 15px;
    color: ${v.textColor};
    margin-top: 5px;
    height: 35px;
    width: 90%;
    border: none;
    outline: none;
    border-radius: 5px;
`;

const Input = styled.div<any>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;
    position: relative;
    input {
        ${fieldStyles}
        width: ${props => props.type === 'modifyBig' && '100%'} !important;
        box-shadow: ${props => props.color === 'light' ? v.boxDark : v.superDark};
        background-color: ${props => props.color === 'light' ? v.boxDark : v.superDark};
    }
    textarea {
        ${fieldStyles}
        height: 120px;
        resize: none;
        box-shadow: ${props => props.color === 'light' ? v.boxDark : v.superDark};
        background-color: ${props => props.color === 'light' ? v.boxDark : v.superDark};
    }
`;

const ModalFooter = styled.div`
    height: 60px;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export { 
    Modal, 
    Overlay, 
    ModalHeader, 
    Window, 
    Input, 
    ModalFooter 
}