import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';

import { EditorState } from 'draft-js';

import ModifyTitle from './ModifyTitle';
import ModifyPreview from './ModifyPreview';
import ModifyCtg from './ModifyCtg';
import ModifyPrivacy from './ModifyPrivacy';
import ModifyBody from './ModifyBody';
import ModifyFooter from './ModifyFooter';

import useFetch from '../../hooks/useFetch';
import useFormValidation from '../../hooks/useFormValidation';

import * as S from './style';

import { Value } from './ts/interfaces';
import { MethodType, ModalType, Mode } from '../../ts/types';
import { Note } from '../../ts/interfaces';

type StateType = typeof initialValue;

interface ModifyContentProps {
    modifyType: ModalType;
    noteResponse: {
        loading: boolean;
        data: null | Value;
        error: null | string;
    };
    handleModifyType: (arg0: ModalType) => void;
}

const initialValue = {
    cid: '',
    title: '',
    body: '',
    privacy: Mode.PUBLIC,
    category: '',
    preview: {
        name: '',
        file: ''
    }
}

const initialError = { title: '', body: '' }

const ModifyContent = ({ 
    modifyType, 
    noteResponse,
    handleModifyType, 
}: ModifyContentProps) => {
    const { response: resultResponse, fetchData } = useFetch();
    const { error, validate, checkErrors, clearError } = useFormValidation(initialError);

    const [value, setValue] = useState<Value>(initialValue);
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
    const [respMsg, setRespMsg] = useState('');

    const fileInput = useRef<any>();
    
    useEffect(() => {
        if(noteResponse.data) {
            const { data } = noteResponse;
            
            setValue({ 
                ...value, 
                cid: data.cid,
                title: data.title,
                body: data.body,
                privacy: data.privacy,
                category: data.category,
            });
            handleModifyType(ModalType.EDIT);
        }
    }, [noteResponse])

    const hanleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, title: e.target.value });
    }

    const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            preview: {
                name: (e.target.files as FileList)[0].name,
                file: (e.target.files as FileList)[0]
            }
        })
    }

    const handlePrivacy = (currentPrivacy: Mode) => {
        setValue({ ...value, privacy: currentPrivacy });
    }

    const handleCtg = (category: string) => {
        setValue({ ...value, category });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        validate({ value: value.title, name: 'title', length: 5 });
        validate({ value: value.body, name: 'body', length: 150 });

        if(checkErrors()) return null;

        const formData = new FormData();

        formData.append('title', value.title);
        formData.append('category', value.category);
        formData.append('privacy', value.privacy);
        formData.append('body', value.body);
        formData.append('previewName', value.preview.name);
        formData.append('previewFile', value.preview.file);
        
        fetchData({
            method: modifyType === ModalType.CREATE ? MethodType.POST : MethodType.PATCH,
            url: modifyType === ModalType.CREATE ? 
                `/note/create?mode=${value.privacy}&noteType=article` : 
                `/note/edit/${value.cid}?noteType=article`,
            data: formData,
            authRequiered: true,
            onCompleted: (data: { message: string }) => {
                if(modifyType === ModalType.CREATE) {
                    setValue(initialValue);
                    fileInput.current.value = '';
                    setEditorState(EditorState.createEmpty());
                }
                
                setRespMsg(data.message);
            }
        });
    }
    // console.log(resultResponse,'result');
    
    return (
        <S.ModifyContent>
            <form onSubmit={handleSubmit}>
                <ModifyTitle
                    value={value.title}
                    error={error.title}
                    handleChange={hanleTitle}
                    clearError={clearError}
                />
                <ModifyPreview 
                    fileRef={fileInput}
                    value={value.preview}
                    handleChange={handlePreview}
                />
                <ModifyCtg
                    value={value.category}
                    privacy={value.privacy}
                    handleChange={handleCtg}
                />
                <ModifyPrivacy
                    value={value.privacy}
                    handleChange={handlePrivacy}
                />
                <ModifyBody
                    value={value}
                    editorState={editorState}
                    setValue={setValue}
                    setEditorState={setEditorState}
                    error={error.body}
                    clearError={clearError}
                    modifyType={modifyType}
                />
                <ModifyFooter 
                    response={respMsg} 
                    loading={resultResponse.loading}
                    setRespMsg={setRespMsg}
                />
            </form>
        </S.ModifyContent>
    )
}

export default ModifyContent;