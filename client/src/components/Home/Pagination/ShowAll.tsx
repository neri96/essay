import Button from '../../reusable/Button';

import { boxDark } from '../../../constants/vars';

import * as S from './style';

const ShowAll = ({ removeLimit }: { removeLimit: () => void }) => {
    return (
        <S.ShowAll>
            <Button 
                type='button'
                handleClick={removeLimit}
                style={{ color: boxDark }}
            >
                Show all
            </Button>
        </S.ShowAll>
    )
}

export default ShowAll;