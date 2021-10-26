import { useHistory } from 'react-router';
import { History } from 'history';

import RightSide from './RightSide';

import * as S from './style';

const Header = () => {
    const history = useHistory<History>();

    return (
        <S.Header>
            <div className='logo'>
                <img 
                    src={`/logo.png`}
                    alt='logo' 
                    onClick={() => history.push('/')}
                />
            </div>
            <RightSide />
        </S.Header>
    )
}

export default Header;