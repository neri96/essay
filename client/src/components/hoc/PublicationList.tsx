import { useState, useEffect, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import { GlobalDataCtx } from '../../context/index';
import { ReactComponent as Loading } from '../../assets/loading.svg';

import * as S from '../Home/style';

import { NoteArticleType } from '../../ts/types';
import { Note } from '../../ts/interfaces';

interface PublicList {
    component: any;
    listType: NoteArticleType;
}

const PublicationList = ({ component: Component, listType }: PublicList) => {
    const { 
        mode,
        noteType,
        globalResponse,
        currentCategory, 
        currentPage,
        limit,
        fetchNotes 
    } = useContext(GlobalDataCtx);
    const { loading, data, error } = globalResponse;

    useEffect(() => {
        fetchNotes();
    }, [currentCategory, currentPage, limit])
    
    const handleNotes = (currentNoteType: any) => {
        const notesFiltered = () => {
            console.log(data, 'inside');
            
            return data && data.notes.filter((note: any) => {
                return note.noteType === currentNoteType &&
                note.privacy === mode;
            })
        }

        const notes = notesFiltered();
        
        return (
            loading ? 
                <Loading className='loading' /> :
            notes && notes.length ?
                notes.map((note: Note) => (
                    <Component 
                        key={uuid()} 
                        note={note} 
                        loading={loading} 
                    />
                )) : null 
        )
    }
    
    return (
        listType === NoteArticleType.ARTICLE ?
            <S.ArticleList>
                {handleNotes(NoteArticleType.ARTICLE)}
            </S.ArticleList> :
            <S.NoteList>
                {handleNotes(NoteArticleType.NOTE)}
            </S.NoteList>
    )
}

export default PublicationList;