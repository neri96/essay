import { useState, useEffect, useContext } from 'react';
import { GoSettings } from 'react-icons/go';

import Sidebar from './Sidebar';
import NoteMode from './NoteMode';
import NoteType from './NoteType';
import AddCategory from './AddCategory';
import SettingsRestyle from './SettingsRestyle';
import Button from '../../reusable/Button';

import { GlobalDataCtx } from '../../../context';

import * as S from './style';

import { Mode, Roles } from '../../../ts/types';

const NoteSettings = () => {
    const { role, mode } = useContext(GlobalDataCtx);

    const [isRestyled, setIsRestyled] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const handleRestyled = () => {
        setIsRestyled(!isRestyled);
    }

    const handleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    
    useEffect(() => {
        if(!isRestyled && isSidebarOpen) handleSidebar();
    }, [isRestyled]);

    return (
        <>
            <Sidebar 
                isSidebarOpen={isSidebarOpen}
                handleSidebar={handleSidebar}
                isRestyled={isRestyled}
                handleRestyled={handleRestyled}
            />
            <S.NoteSettingsMobile isRestyled={isRestyled}>
                <Button 
                    type='button'
                    handleClick={handleSidebar}
                    style={{ width: '50px' }}
                >
                    <GoSettings />
                </Button>
            </S.NoteSettingsMobile>
            <S.NoteSettings isRestyled={isRestyled}>
                <NoteMode />
                <NoteType />
                {mode === Mode.PUBLIC ?
                    role > Roles.USER ?
                        <AddCategory /> : null
                : <AddCategory />}
                <SettingsRestyle handleRestyled={handleRestyled} />
            </S.NoteSettings>
        </>
    )
}

export default NoteSettings;