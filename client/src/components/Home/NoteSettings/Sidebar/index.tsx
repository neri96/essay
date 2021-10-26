import { useContext } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import SideOption from './SideOption';
import SideAddCtg from './SideAddCtg';
import SettingsRestyle from '../SettingsRestyle';

import { GlobalDataCtx } from '../../../../context';

import * as S from './style';

import { Mode, NoteArticleType } from '../../../../ts/types';

interface SidebarProps { 
    isSidebarOpen: boolean;
    handleSidebar: () => void; 
    isRestyled: boolean;
    handleRestyled: () => void; 
}

const Sidebar = ({ isSidebarOpen, handleSidebar, isRestyled, handleRestyled }: SidebarProps) => {
    const { mode, handleMode, noteType, handleNoteType } = useContext(GlobalDataCtx);

    return (
        <S.Sidebar 
            isRestyled={isRestyled} 
            isSidebarOpen={isSidebarOpen}
        >
            <S.SidebarHeader>
                <h3>Configuration</h3>
                <S.SidebarClose 
                    isRestyled={isRestyled} 
                    isSidebarOpen={isSidebarOpen}
                    onClick={handleSidebar}
                >
                    <IoMdCloseCircleOutline />
                </S.SidebarClose>
            </S.SidebarHeader>
            <ul>
                <li>
                    <SideOption 
                        title={mode}
                        handleOption={handleMode}
                        optionOne={Mode.PUBLIC}
                        optionTwo={Mode.PRIVATE}
                        handleSidebar={handleSidebar}
                    />
                </li>
                <li>
                    <SideOption 
                        title={noteType}
                        handleOption={handleNoteType}
                        optionOne={NoteArticleType.ARTICLE}
                        optionTwo={NoteArticleType.NOTE}
                        handleSidebar={handleSidebar}
                    />
                </li>
                <li>
                    <SideAddCtg />
                </li>
                <li className='side-restyle'>
                    <SettingsRestyle handleRestyled={handleRestyled} />
                </li>
            </ul>
        </S.Sidebar>
    )
}

export default Sidebar;