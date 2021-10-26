import styled from 'styled-components';

import { Input } from '../reusable/reusableStyles';

import * as v from '../../constants/vars';

const NoteModify = styled.div`
    width: 95%;
    margin: 12px auto;
`;

const ModifyHeader = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${v.boxLight};
    border-radius: 5px;
`;

const ModifyContent = styled.div`
    width: 100%;
    margin-top: 15px;
    .wrapperClassName {
        width: 100%;
    }
    .public-DraftStyleDefault-block {
        margin: 0 !important;
        padding: 10px !important;
    }
    .demo-option-custom {
        width: 15px !important;
        height: 15px !important;
        border: none;
        background-color: #ccc !important;
    }
    .demo-dropdown-custom {
        border-color: rgb(0,47,126) !important;
        background-color: red !important;
    }
    .demo-popup-custom {
        background-color: red !important;
        left: -50%; 
    }
    .demo-content {
        border: 1px solid #F1F1F1 !important;
        padding: 5px;
        border-radius: 5px;
        width: 100%;
        border-radius: 2px;
        resize: none;
        height: 200px;
    }
`;

const ModifyPrivacy = styled.div`
    height: 35px;
    width: 100%;
    background-color: ${v.boxDark};
    margin-top: 5px;
    border-radius: 5px;
    position: relative;
    .privacy-chosen {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    span {
        text-transform: capitalize;
    }
`;

const PrivacyList = styled.div`
    width: 100%;
    position: absolute;
    top: 40px;
    left: 0;
    background-color: ${v.boxDark};
    border-radius: 5px;
    z-index: 100;
    .privacy-option {
        height: 35px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .privacy-option:hover > span {
        font-size: 18px;
    }
`;

const PreviewFile = styled.div`
    height: 35px;
    width: 100%;
    border-radius: 5px;
    margin-top: 5px;
    background-color: ${v.boxDark};
    position: relative;
    overflow: hidden;
    .previewLabel {
        position: absolute;
        top: 55%;
        transform: translateY(-50%);
        left: 0;
    }
    .file-icon {
        height: 100%;
        width: 70px;
        background-color: #808080;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        svg {
            margin-left: 20px;
        }
    }
    .file-value {
        height: 35px;
        position: absolute;
        top: 0;
        left: 80px;
        display: flex;
        align-items: center;
    }
    input[type="file"] {
        opacity: 0;
        margin: 0;
    }
`

const ModifyBody = styled.div`
    height: inherit;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span {
        margin-bottom: 5px;
    }
`;

const ModifyFooter = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .modify-response {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
    } 
`;

export { 
    NoteModify, 
    ModifyHeader, 
    ModifyContent, 
    ModifyPrivacy,
    PrivacyList,
    PreviewFile,
    Input, 
    ModifyBody,
    ModifyFooter 
}