import { useLocation } from 'react-router';
import { Location } from 'history';

import AddNote from './AddNote';
import Logout from './Logout';

import * as S from './style';

const RightSide = () => {
    const location = useLocation<Location>();

    return (
        <S.RightSide>
            {location.pathname === '/auth' ? null : 
                <>
                    <AddNote />
                    <Logout />
                </>
            }
        </S.RightSide>
    )
}

export default RightSide;