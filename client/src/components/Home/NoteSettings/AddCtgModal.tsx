import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import useFetch from '../../../hooks/useFetch';

import FadingComponent from '../../reusable/FadingComponent';
import Modal from '../../Modal';
import Button from '../../reusable/Button';

import AddCtgRestrictions from './AddCtgRestrictions';

import { GlobalDataCtx } from '../../../context';

import * as S from './style';

import { MethodType, CtgRestrictionStatus, Mode } from '../../../ts/types';

interface Category {
    name: string;
    restricted: CtgRestrictionStatus;
}

const AddCtgModal = ({ addCtgOpen, handleAddCtg }: { addCtgOpen: boolean, handleAddCtg: () => void }) => {
    const [category, setCategory] = useState<Category>({
        name: '',
        restricted: CtgRestrictionStatus.NOT_RESTRICTED
    });

    const { response: { loading, data }, fetchData } = useFetch();
    
    const { mode, fetchCategories } = useContext(GlobalDataCtx);

    const handleCtgVal = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory({ ...category, name: e.target.value });
    }

    const handleRestrStatus = (restrStatus: CtgRestrictionStatus) => {
        setCategory({ ...category, restricted: restrStatus });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        fetchData({
            method: MethodType.POST,
            url: `/category/${mode === Mode.PUBLIC ? 'createpublic' : 'createprivate'}`,
            data: mode === Mode.PUBLIC ? { ...category } : { name: category.name },
            authRequiered: true
        });
    }

    useEffect(() =>{
        if(data) {
            fetchCategories();
            handleAddCtg();
        }
    }, [data])
    
    return (
        <FadingComponent state={addCtgOpen} style={'fade-modal'}>
            <Modal
                headerTitle={'Add category'}
                handleClick={handleAddCtg}
            >
                <form onSubmit={handleSubmit}>
                    <S.Input>
                        <span>Category name</span>
                        {false ? 
                            <span className='error'>{'error'}</span> : null}
                        <input 
                            type='text'
                            name='category'
                            value={category.name}
                            onChange={handleCtgVal} 
                        />
                    </S.Input>
                    {mode === Mode.PUBLIC ?
                        <AddCtgRestrictions
                            restrictStatus={category.restricted}
                            handleRestrStatus={handleRestrStatus}
                        /> : null
                    }
                    <S.AddCtgFooter>
                        <Button type='submit' loading={loading}>
                            <span>Add category</span>
                        </Button> 
                    </S.AddCtgFooter>
                </form>
            </Modal>
        </FadingComponent>
    )
}

export default AddCtgModal;