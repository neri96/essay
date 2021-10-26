import { useState, useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import FadingComponent from '../../reusable/FadingComponent';
import DeleteModal from '../../reusable/DeleteModal';
import useFetch from '../../../hooks/useFetch';

import { NoteDataCtx, GlobalDataCtx } from '../../../context';

const DeleteNote = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { id } = useContext(NoteDataCtx);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <>
            <div className='modify-btn'>
                <MdDelete color={'#cc0000'} onClick={handleModal} />
            </div>
            <FadingComponent state={modalOpen} style={'fade-modal'}>
                <DeleteModal 
                    articleId={id}
                    handleModal={handleModal}
                />
            </FadingComponent>
        </>
    )
}

export default DeleteNote;