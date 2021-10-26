import { useState, useEffect, useContext } from 'react';

import Modal from "../Modal";
import Button from './Button';
import Category from './Category';

import useFetch from '../../hooks/useFetch';
import useFetchCtgs from '../../hooks/useFetchCtgs';
import useFormValidation from '../../hooks/useFormValidation';

import { GlobalDataCtx } from '../../context';

import { ReactComponent as Loading } from '../../assets/loading.svg';

import * as S from '../Header/style';
import { superDark } from '../../constants/vars';

import { Mode, ModalType, MethodType, Categories, CategoryType, NoteArticleType } from '../../ts/types';
import { ModifyNote, InputValue } from '../../ts/interfaces';

interface AddNoteModalProps extends ModifyNote {
    type: ModalType;
    modalOpen: boolean;
    handleModal: () => void;
}

const ModifyModal = ({ 
    type,
    modalOpen, 
    handleMode,
    handleNoteType,
    handleModal,
    valueData,
    errorData,
    categoryData
}: AddNoteModalProps) => {
    const [value, setValue] = useState<InputValue>(valueData);
    const [category, setCategory] = useState<any>(categoryData);

    const { mode, fetchNotes } = useContext(GlobalDataCtx);

    const { response, fetchData } = useFetch();
    const { response: categoriesResponse, fetchCtgs } = useFetchCtgs();
    const { error, validate, checkErrors, clearError } = useFormValidation(errorData);

    const handleValue = (e: any) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const handleCategory = (ctg: any) => {
        setCategory(ctg);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        validate({ value: value.title, name: 'title', length: 5, maxLength: 200 });
        validate({ value: value.body, name: 'body', length: 10 });

        if(checkErrors()) return null;

        await fetchData({
            method: type === ModalType.EDIT ? MethodType.PATCH : MethodType.POST,
            url: type === ModalType.CREATE ? 
            `/note/create?mode=${mode}&noteType=${NoteArticleType.NOTE}` : 
            `/note/edit/${valueData.id}?mode=${mode}`,
            data: { ...value, category },
            authRequiered: true,
            onCompleted: () => {
                handleModal();
                
                if(handleNoteType) {
                    return handleNoteType(NoteArticleType.NOTE);
                }

                fetchNotes();
            }
        })
    }
    
    return (
        <Modal headerTitle={type === ModalType.CREATE ? 'Add a note' : 'Edit'} handleClick={handleModal}>
            <form className='form' onSubmit={handleSubmit}>
                <S.Input height='60px' color='dark' error={error}>
                    <span>Title</span>
                    {error.title ? 
                        <span className='error'>{error.title}</span> : null}
                    <input 
                        type='text'
                        name='title'
                        value={value.title}
                        onChange={handleValue} 
                        onFocus={(e: any) => clearError(e)}
                    />
                </S.Input>
                <S.Input height='60px' color='dark' error={error}>
                    <span>Category</span>
                    <Category
                        ctgType={CategoryType.USER_CATEGORIES}
                        ctgValue={category}
                        ctgMode={Mode.PRIVATE}
                        ctgList={categoriesResponse}
                        fetchCategories={fetchCtgs}
                        handleCtgValue={handleCategory}
                        style={{ height: '35px', width: '90%', color: superDark }}
                    />
                </S.Input>
                <S.Input height='120px' color='dark' fieldType='textarea' error={error}>
                    <span>Text</span>
                    {error.body ? 
                        <span className='error'>{error.body}</span> : null}
                    <textarea 
                        name='body'
                        value={value.body}
                        onChange={handleValue}
                        onFocus={(e: any) => clearError(e)}
                    />
                </S.Input>
                <S.ModalFooter>
                        <Button type='submit' loading={response.loading}>
                            {type === ModalType.CREATE ? 'Add' : 'Edit'}
                        </Button>
                </S.ModalFooter>
            </form>
        </Modal>
    )
}

export default ModifyModal;