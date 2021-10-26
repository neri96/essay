import { useState, useContext } from 'react';
import { MdModeEdit } from 'react-icons/md';

import FadingComponent from '../../reusable/FadingComponent';
import ModifyModal from '../../reusable/ModifyModal';

import { GlobalDataCtx, NoteDataCtx } from '../../../context';

import { ModalType, NoteArticleType } from '../../../ts/types';

const EditNote = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { id, title, category, body } = useContext(NoteDataCtx);
    const { fetchNotes } = useContext(GlobalDataCtx);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <>
            <div className='modify-btn'>
                <MdModeEdit color={'#009900'} onClick={handleModal} />
            </div>

            <FadingComponent state={modalOpen} style={'fade-modal'}>
                <ModifyModal
                    type={ModalType.EDIT}
                    modalOpen={modalOpen} 
                    handleModal={handleModal} 
                    valueData={{ id, title, body, noteType: NoteArticleType.NOTE }}
                    errorData={{ title: '', body: '', noteType: null }}
                    categoryData={category}
                    fetchNotes={fetchNotes}
                />
            </FadingComponent>
        </>
    )
}

export default EditNote;