import { ReactNode } from 'react';

import EditNote from './EditNote';
import DeleteNote from './DeleteNote';

import { MdNavigateNext } from 'react-icons/md';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

import * as S from './style';

import { NoteArticleType } from '../../../ts/types';

interface NoteHeadProps {
    children: ReactNode,
    type: NoteArticleType,
    bodyOpen?: boolean;
    handleBody?: () => void;
}

const NoteHead = ({ children, type, bodyOpen, handleBody }: NoteHeadProps) => {
    return (
        <S.NoteHead bodyOpen={bodyOpen}>
            <div className='title'>
                {children}
            </div>
            <div className='modify-btn'>
                <IoMdArrowDroprightCircle 
                    className='arrow-btn' 
                    onClick={handleBody} 
                />
            </div>
            <EditNote />
            <DeleteNote />
        </S.NoteHead>
    )
}

export default NoteHead;