import { useHistory } from 'react-router';
import { History } from 'history';

import { setUserData } from '../../../localStorage/userData';

import { UserData } from '../../../ts/interfaces';

const useStoreTokens = () => {
    const history = useHistory<History>();

    const storeTokens = (userData: UserData) => {
        setUserData(userData);

        history.push('/');
    }

    return { storeTokens }
}

export default useStoreTokens;