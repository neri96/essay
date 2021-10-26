import { useContext } from 'react';

import Button from '../reusable/Button';
import useFetch from '../../hooks/useFetch';

import { GlobalDataCtx } from '../../context';

import { removeUserData } from '../../localStorage/userData';

import { MethodType } from '../../ts/types';

const Logout = () => {
    const { handleIsAuth, clearGlobalRes } = useContext(GlobalDataCtx);
    const { fetchData } = useFetch();

    const logOut = async () => {
        await fetchData({
            method: MethodType.POST,
            url: '/user/logout',
            authRequiered: true,
            onCompleted: () => {
                clearGlobalRes();
                removeUserData();
                handleIsAuth();
            }
        })
    }

    return (
        <Button
            type='button'
            handleClick={logOut}
        >
            Logout
        </Button>
    )
}

export default Logout;