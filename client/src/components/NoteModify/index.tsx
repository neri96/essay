import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import ModifyContent from './ModifyContent';
import useFetch from '../../hooks/useFetch';

import { ReactComponent as Loading } from '../../assets/loading.svg';

import * as S from './style';

import { ModalType, MethodType } from '../../ts/types';

const NoteModify = () => {
    const { response, fetchData } = useFetch();
    
    const [modifyType, setModifyType] = useState<ModalType>(ModalType.CREATE);
    const params = useParams<{ id?: string }>();

    const handleModifyType = (currentModifyType: ModalType) => {
        setModifyType(currentModifyType);
    }

    useEffect(() => {
        const fetchNote = async () => {
            await fetchData({
                method: MethodType.GET,
                url: `/note/getone/${params.id}`,
                authRequiered: true
            })
        }

        if(params.id) {
            fetchNote();
        } else if(!params.id && modifyType === ModalType.EDIT) {
            handleModifyType(ModalType.CREATE);
        }
    }, [params])

    return (
        <S.NoteModify>
            {response.loading ? <Loading className='loading' />
                :
                <>
                    <S.ModifyHeader>
                        <h3>
                            {modifyType === ModalType.CREATE ?
                                'Add ' : 'Edit '
                            } article
                        </h3>
                    </S.ModifyHeader>
                    <ModifyContent
                        modifyType={modifyType}
                        noteResponse={response}
                        handleModifyType={handleModifyType}
                    />
                </>}
        </S.NoteModify>
    )
}

export default NoteModify;
