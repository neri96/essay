import { useState, useEffect, Dispatch, SetStateAction, FocusEvent } from 'react';

import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';

import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";

import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import * as S from './style';
import { boxLight } from '../../constants/vars';

import { Value } from './ts/interfaces';
import { MethodType, ModalType } from '../../ts/types';

interface ModifyBofyProps {
    value: Value;
    editorState: EditorState;
    setValue: Dispatch<SetStateAction<Value>>;
    setEditorState: any;
    error: string;
    clearError: (arg0?: FocusEvent<any> | null, arg1?: boolean) => void;
    modifyType: ModalType;
}

const ModifyBody = ({ 
    value, 
    editorState, 
    setValue, 
    setEditorState, 
    error,
    clearError,
    modifyType 
}: ModifyBofyProps) => {
    useEffect(() => {
        if(modifyType === ModalType.EDIT) {
            const contentBlock = htmlToDraft(value.body);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [modifyType])

    const handleEditorStateChange = (state: EditorState) => {
        setEditorState(state);
        setValue({ ...value, body: draftToHtml(convertToRaw(state.getCurrentContent())) })
    }

    return (
        <S.ModifyBody>
            <span>Text</span>
            {error ? 
                <span className='error'>{error}</span> : null}
            <Editor
                onFocus={() => clearError(null, true)}
                editorStyle={{ 
                    boxShadow: '0px 0px 3px 0px rgb(77, 77, 77)', 
                    borderRadius: '5px', 
                    height: '400px',
                }}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(state) => handleEditorStateChange(state)}
                toolbar={{
                    options: ['inline', 'blockType', 'image', 'link', 'embedded', 'colorPicker', 'list', 'history'],
                    inline:{
                        options: ['italic', 'bold', 'underline', 'strikethrough', 'monospace'],
                        italic: { className: 'demo-option-custom' },
                        bold: { className: 'demo-option-custom' },
                        underline: { className: 'demo-option-custom' },
                        strikethrough: { className: 'demo-option-custom' },
                        monospace: { className: 'demo-option-custom' }
                    },
                    image: {
                        className: "demo-option-custom",
                        popupClassName: "demo-popup-custom"
                    },
                }}
                toolbarStyle={{ backgroundColor: boxLight, border: 'none', borderRadius: '5px', }}
            />
        </S.ModifyBody>
    )
}

export default ModifyBody;