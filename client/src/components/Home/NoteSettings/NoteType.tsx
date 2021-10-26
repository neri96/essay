import { useContext } from 'react';

import Button from '../../reusable/Button';
import { GlobalDataCtx } from '../../../context';

import * as S from './style';

import { NoteArticleType, Mode } from '../../../ts/types';

const NoteType = () => {
    const { mode, noteType, handleNoteType } = useContext(GlobalDataCtx);

    return (
        <S.NoteKind>
            <S.NoteKindWrap>
                <Button
                    type='click' 
                    handleClick={() => handleNoteType(NoteArticleType.ARTICLE)}
                    style={{ 
                        height: '100%', 
                        color: noteType === NoteArticleType.ARTICLE && '#404040'
                    }}
                ><span>Articles</span></Button>
                <Button
                    type='click' 
                    handleClick={() => handleNoteType(NoteArticleType.NOTE)}
                    disabled={mode === Mode.PUBLIC ? true : false}
                    style={{ 
                        height: '100%',
                        color: noteType === NoteArticleType.NOTE && '#404040'
                    }}
                ><span>Notes</span></Button>
            </S.NoteKindWrap>
        </S.NoteKind>
    )
}

export default NoteType;