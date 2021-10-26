import { GoPlus } from 'react-icons/go';

import AddCtgModal from './AddCtgModal';
import Button from '../../reusable/Button';

import useOpen from './useOpen';

import * as S from './style';

const AddCategory = () => {
    const { addCtgOpen, handleAddCtg } = useOpen();

    return (
        <S.AddCategory>
            <S.AddCtgBtnWrap>
                <Button
                    type='click' 
                    handleClick={handleAddCtg}
                    style={{ 
                        height: '100%',
                        width: '170px'
                    }}
                >
                    <span>Add Category</span>
                    <GoPlus />
                </Button>
            </S.AddCtgBtnWrap>

            <AddCtgModal 
                addCtgOpen={addCtgOpen} 
                handleAddCtg={handleAddCtg} 
            />
        </S.AddCategory>
    )
}

export default AddCategory;