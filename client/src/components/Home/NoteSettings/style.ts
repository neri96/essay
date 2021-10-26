import styled, { css } from 'styled-components';
import * as v from '../../../constants/vars';

import { Input } from '../../reusable/reusableStyles';

const settingsPadding = '25px'

const noteSetting = css`
    min-height: 50px;
    width: 95%;
    align-items: center;
    background: ${v.boxDark};
    margin: 0 auto;
    border-radius: 5px;
`;

const NoteSettingsMobile = styled.div<any>`
    ${noteSetting};
    display: ${props => props.isRestyled ? 'flex' : 'none'};
    button {
        margin-left: auto;
        margin-right: 30px;
    }
    @media (max-width: 865px) {
        display: flex;
    }
`;

const NoteSettings = styled.div<any>`
    ${noteSetting}
    display: ${props => props.isRestyled ? 'none' : 'flex'};
    @media (max-width: 865px) {
        display: none;
    }
`;

const NoteMode = styled.div<any>`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${settingsPadding};
    svg {
        position: absolute;
        top: 50%;
        transform: ${props => `translateY(-50%) rotate(${props.modeMenuOpen ? '90deg' : '0'})`};
        right: 0;
        transition: 300ms;
    }
`;

const NoteModeChosen = styled.div`
    height: 35px;
    position: relative;
`;

const NoteModeMenu = styled.div`
    width: 150px;
    border-radius: 5px;
    position: absolute;
    overflow: hidden;
    top: 40px;
    left: 0;
    z-index: 300;
    button {
        box-shadow: 0px 0px 1px 0px rgba(153, 153, 153, 0.6);
        border-radius: 0;
    }
    button:hover {
        background-color: #404040;
    }
`;

const NoteKind = styled.div`
    height: 100%;
    margin-left: ${settingsPadding};
    display: flex;
    align-items: center;
`;

const NoteKindWrap = styled.div`
    height: 35px;
    width: 300px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    display: flex;
    button {
        border-radius: 0;
        transition: 300ms;
    }
`;

const AddCategory = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: ${settingsPadding};
`;

const AddCtgBtnWrap = styled.div`
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        position: relative;
        svg {
            height: 20px !important; 
            position: absolute;
            top: 50%;
            left: 80%;
            transform: translateY(-50%);
        }
    }
`;

const CtgRestriction = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const CtgRestictInput = styled.div`
    height: 35px;
    width: 100%;
    margin-top: 5px;
    background-color: ${v.superDark};
    margin-bottom: 10px;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RestrictionOption = styled.div`
    width: 100%;
    border-radius: 5px;
    background-color: ${v.superDark};
    overflow: hidden;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 300;
    .restrict-option {
        height: 35px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 300ms ease;
        cursor: pointer;
    }
    .restrict-option:hover {
        background-color: #404040;
    }
`;

const AddCtgFooter = styled.div`
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SettingsRestyle = styled.div`
    position: relative;
    margin-left: ${settingsPadding};
`;

const Tip = styled.div`
    height: 35px;
    padding: 0 15px;
    background: ${v.boxDark};
    position: absolute;
    top: 45px;
    left: 0;
    display: flex;
    align-items: center;
    border-radius: 5px;
    z-index: 350;
`;

export {
    NoteSettingsMobile,
    NoteSettings,
    NoteMode,
    NoteModeChosen,
    NoteModeMenu,
    NoteKind,
    Input,
    NoteKindWrap,
    AddCategory,
    AddCtgBtnWrap,
    CtgRestriction,
    CtgRestictInput,
    RestrictionOption,
    AddCtgFooter,
    SettingsRestyle,
    Tip
}