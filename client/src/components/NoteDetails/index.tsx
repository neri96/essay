import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';

import _ from 'lodash';

import { ReactComponent as Loading } from '../../assets/loading.svg';

import Button from '../reusable/Button';
import useFetch from '../../hooks/useFetch';

import { MethodType } from '../../ts/types';

import * as S from './style';

const NoteDetails = () => {
    const { response, fetchData } = useFetch();
    const { loading, data: note, error } = response;

    const history = useHistory();

    const params = useParams<{ id: string }>();   

    const fetchNotes = async () => {
        const id = params.id;

        try {
            await fetchData({
                method: MethodType.GET,
                url: `/note/getone/${id}`,
                authRequiered: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    useEffect(() => {
        if(error) history.push('/');
    }, [error])

    return (
        <S.NoteDetails>
            {loading ? <Loading className='loading' /> :
                !(_.isEmpty(note)) ?
                    <>
                        <S.DetailsHeader>
                            <h3>{note.title}</h3>
                        </S.DetailsHeader>
                        <S.DetailsBody>
                            <S.DetailsCtg>
                                <span>Author: {note.author.name}</span>
                                {note.category ?
                                    <span>Category: {note.category}</span> : null}
                            </S.DetailsCtg>
                            <div dangerouslySetInnerHTML={{__html: note.body }} />
                        </S.DetailsBody>
                    </>
                : null}
        </S.NoteDetails>
    )
}

export default NoteDetails;