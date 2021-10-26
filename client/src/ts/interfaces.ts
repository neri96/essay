import { NoteArticleType, Categories, ModalType, Roles, Mode } from './types';

export interface UserData {
    cid: string;
    name: string;
    role: Roles;
    accessToken: string;
    refreshToken: string;
    expirationDate: string;
}

interface Author {
    cid: string;
    name: string;
    role: Roles;
}

export interface Note {
    _id: string;
    cid: string;
    title: string;
    body: string;
    privacy: Mode;
    noteType: NoteArticleType;
    preview?: string;
    category?: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
}

export interface Notes {
    notes: Note[];
    pages: number;
}

export interface FetchNoteRes {
    loading: boolean;
    data: null | { note: Note } | Notes | { message: string };
    errorServ: any;
}

export interface FetchNote {
    response: FetchNoteRes;
    noteAmount: number | 'off_limits';
    page: number;
    fetchNotes: () => void;
    removeLimit: () => void;
    handlePage: (pageNumber: number) => void;
}

export interface GlobalCtg {
    category: Categories;
    handleCategory: (ctg: Categories) => void;
}

export interface NoteModalProps {
    modalOpen: boolean;
    handleModal: () => void;
}

export interface InputValue {
    id?: string;
    title: string;
    body: string;
    noteType: NoteArticleType
}

export interface ModifyNote {
    type: ModalType;
    valueData: any;
    errorData: any;
    categoryData?: any;
    handleModal: () => void;
    handleMode?: (arg0: Mode) => void;
    handleNoteType?: (arg0: NoteArticleType) => void;
    fetchNotes?: () => void;
}