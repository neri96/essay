import styled, { css } from 'styled-components';

import { Modal, Window, ModalHeader, Input, ModalFooter } from '../reusable/reusableStyles';

import * as v from '../../constants/vars';

const Auth = styled.section`
    height: calc(100vh - 80px);
    width: 100%;
    background-color: ${v.boxDark};
`;

const linkStyle = css`
    color: #7070db;
    text-decoration: underline;
    cursor: pointer;
`;

const AuthFooter = styled.div`
    height: 40px;
    width: 100%;
    background-color: ${v.superDark};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    .switch-modal {
        margin-left: 5px;
        ${linkStyle}
    }
`;

const Verification = styled.div`
    width: 100%;
    form {
        width: 100%;
    }
`;

const VerifText = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: ${v.superDark};
    span {
        text-align: center;
    }
`;

const VerifResend = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    .resend-verif {
        ${linkStyle}
    }
`;

const VerifBody = styled.div`
    /* padding: 10px 0; */
    width: 100%;
    padding-top: 5px;
`;

const VerifFooter = styled.div`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export { 
    Auth,
    Modal,
    Window,
    ModalHeader,
    Input,
    ModalFooter,
    AuthFooter,
    Verification,
    VerifText,
    VerifResend,
    VerifBody,
    VerifFooter
}