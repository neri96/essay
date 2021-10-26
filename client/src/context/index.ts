import { createContext } from 'react';

import { NoteArticleType } from '../ts/types';
import { FetchNote, Note } from '../ts/interfaces';

export const NoteDataCtx = createContext<any>({ id: '', title: '', type: NoteArticleType.NOTE, body: '' });
export const FetchDataCtx = createContext<any>({});
export const FetchNotesCtx = createContext({} as FetchNote);
export const GlobalCtgCtx = createContext<any>({});

export const GlobalDataCtx = createContext<any>({});

export const VerifCtx = createContext<any>({});