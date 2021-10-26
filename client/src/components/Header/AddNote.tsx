import { useState, useContext } from 'react';

import FadingComponent from '../reusable/FadingComponent';
import Button from '../reusable/Button';
import ModifyModal from '../reusable/ModifyModal';
import NoteMenu from './NoteMenu';

import useClickOutside from '../../hooks/useClickOutside';

import { GlobalDataCtx } from '../../context';

import * as S from './style';

import { ModalType } from '../../ts/types';

const AddNote = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [noteMenu, setNoteMenu] = useState<boolean>(false);

    const { handleMode, handleNoteType } = useContext(GlobalDataCtx);

    const handleNoteMenu = (action: null | 'close' = null) => {
        if(action === 'close') {
            return setNoteMenu(false);
        }
        setNoteMenu(!noteMenu);
    }

    const { ref } = useClickOutside(handleNoteMenu);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <>
            <S.NoteMenuBtn ref={ref}>
                <Button
                    type='click' 
                    handleClick={handleNoteMenu}
                >
                    Add note
                </Button>
                <FadingComponent state={noteMenu} style='fade-modal'>
                    <NoteMenu 
                        handleNoteMenu={handleNoteMenu}
                        handleModal={handleModal} 
                    />
                </FadingComponent>
            </S.NoteMenuBtn>
            
            <FadingComponent state={modalOpen} style='fade-modal'>
                <ModifyModal 
                    type={ModalType.CREATE}
                    modalOpen={modalOpen} 
                    handleModal={handleModal} 
                    handleMode={handleMode}
                    handleNoteType={handleNoteType}
                    valueData={{ title: '', body: '', noteType: 'note' }}
                    errorData={{ title: '', body: '', noteType: '' }}
                    categoryData={''}
                />
            </FadingComponent>
        </>
    )
}

export default AddNote;