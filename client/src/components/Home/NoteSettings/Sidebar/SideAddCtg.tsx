import { GoPlus } from 'react-icons/go';

import AddCtgModal from '../AddCtgModal';
import useOpen from '../useOpen';

import * as S from './style';

const SideAddCtg = () => {
    const { addCtgOpen, handleAddCtg } = useOpen();
    
    return (
        <>
            <S.AddCtgSide onClick={handleAddCtg}>
                <span>Add Category</span>
                <GoPlus />
            </S.AddCtgSide>

            <AddCtgModal 
                addCtgOpen={addCtgOpen}
                handleAddCtg={handleAddCtg}
            />
        </>
    )
}

export default SideAddCtg;