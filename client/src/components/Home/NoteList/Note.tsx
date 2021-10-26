import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import NoteHead from './NoteHead';
import NoteDropText from '../../reusable/NoteDropText';

import { NoteDataCtx } from '../../../context';

import * as S from './style';

import { NoteArticleType } from '../../../ts/types';
import * as I from '../../../ts/interfaces';

const Note = ({ note }: { note: I.Note }) => {
    const { cid, title, category, noteType, body } = note;
    
    const [bodyOpen, setBodyOpen] = useState<boolean>(false);

    const handleBody = () => {
        setBodyOpen(!bodyOpen);
    }

    return (
        <S.Note bodyOpen={bodyOpen}>
            <NoteDataCtx.Provider value={{ id: cid, title, category, noteType, body }}>
                <NoteHead 
                    type={NoteArticleType.NOTE} 
                    bodyOpen={bodyOpen} 
                    handleBody={handleBody}
                >
                    <h4>{title}</h4>
                </NoteHead>
                <S.NoteBody bodyOpen={bodyOpen}>
                    <NoteDropText bodyOpen={bodyOpen}>
                        {body}
                    </NoteDropText>
                </S.NoteBody>
            </NoteDataCtx.Provider>
        </S.Note>
    )
}

export default Note;