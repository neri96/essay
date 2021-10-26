import { useState, useContext } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

import FadingComponent from '../../reusable/FadingComponent';
import Button from '../../reusable/Button';

import useClickOutside from '../../../hooks/useClickOutside';

import { GlobalDataCtx } from '../../../context';

import * as S from './style';

import { Mode } from '../../../ts/types';

const NoteMode = () => {
    const [modeMenuOpen, setModeMenuOpen] = useState<boolean>(false);

    const { mode, handleMode } = useContext(GlobalDataCtx);
    
    const handleModeMenu = (action?: string) => {
        if(action === 'close') {
            return setModeMenuOpen(false);
        }

        setModeMenuOpen(!modeMenuOpen);
    }

    const { ref } = useClickOutside(handleModeMenu);

    const setName = (mode: Mode) => {
        if(mode === Mode.PUBLIC) {
            return 'Community'
        } else {
            return 'Private'
        }
    }

    const handleModeClick = (mode: Mode) => {
        handleMode(mode);
        setModeMenuOpen(false);
    }

    return (
        <S.NoteMode modeMenuOpen={modeMenuOpen}>
            <S.NoteModeChosen ref={ref}>
                <Button
                    type='click' 
                    handleClick={handleModeMenu}
                    style={{ height: '100%' }}
                >
                    <span>{setName(mode)}</span>
                    <IoMdArrowDropright color='#ccc' />
                </Button>
                <FadingComponent state={modeMenuOpen} style='fade-modal'>
                    <S.NoteModeMenu>
                        <Button
                            type='click' 
                            style={{ width: '100%' }}
                            handleClick={() => handleModeClick(Mode.PUBLIC)}
                        ><span>{setName(Mode.PUBLIC)}</span></Button>
                        <Button
                            type='click' 
                            style={{ width: '100%' }}
                            handleClick={() => handleModeClick(Mode.PRIVATE)}
                        ><span>{setName(Mode.PRIVATE)}</span></Button>
                    </S.NoteModeMenu>
                </FadingComponent>
            </S.NoteModeChosen>

        </S.NoteMode>
    )
}

export default NoteMode;