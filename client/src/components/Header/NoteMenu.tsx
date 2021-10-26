import { useHistory } from 'react-router';
import { History } from 'history';

import Button from '../reusable/Button';

import * as S from './style';

interface NoteMenuProps {
    handleModal: () => void;
    handleNoteMenu: (action?: null | 'close') => void;
}

const NoteMenu = ({ 
    handleModal,
    handleNoteMenu 
}: NoteMenuProps) => {
    const history = useHistory<History>();

    const handleNote = () => {
        handleModal();
        handleNoteMenu('close'); 
    }

    const handleArticle = () => {
        history.push('/note/modify');
        handleNoteMenu('close'); 
    }

    return (
        <S.NoteMenu>
            <Button 
                type='click' 
                handleClick={handleNote}
            >
                Note
            </Button>
            <Button 
                type='click' 
                handleClick={handleArticle}
            >
                Article
            </Button>
        </S.NoteMenu>
    )
}

export default NoteMenu;