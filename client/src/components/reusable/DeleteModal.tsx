import { useContext } from 'react';

import styled from 'styled-components';

import FadingComponent from './FadingComponent';
import Modal from '../Modal';
import Button from './Button';

import useFetch from '../../hooks/useFetch';

import { GlobalDataCtx } from '../../context';

import { MethodType } from '../../ts/types';

const DeleteBody = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;
`;

interface DeleteModalProps {
    articleId: string;
    handleModal: () => void;
}

const DeleteModal = ({ articleId, handleModal }: DeleteModalProps) => {
    const { response: { loading, error }, fetchData } = useFetch();
    const { fetchNotes } = useContext(GlobalDataCtx);

    console.log(error);
    
    const handleDelete = async () => {
        try {
            await fetchData({
                method: MethodType.DELETE,
                url: `/note/remove/${articleId}`,
                authRequiered: true,
                onCompleted: () => {
                    fetchNotes();
                }
            })
                
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <Modal headerTitle={'Do you want to delete this note?'} handleClick={handleModal}>
            <DeleteBody>
                <Button type='click' handleClick={handleModal}>
                    No
                </Button>
                <Button 
                    type='click' 
                    loading={loading}
                    handleClick={handleDelete}
                >
                    Yes
                </Button>
            </DeleteBody>
        </Modal>
    )
}

export default DeleteModal;