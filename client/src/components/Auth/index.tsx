import { useState } from 'react';

import Login from './Login';
import Register from './Register';
import Verification from './Verification';

import { VerifCtx } from '../../context';

import * as S from './style';

import { AuthType } from './ts/types';

const Auth = () => {
    const [authState, setAuthState] = useState<AuthType>(AuthType.LOGIN);

    const [verifVis, setVerifVis] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(false);

    const handleAuthState = () => {
        if(authState === AuthType.LOGIN) {
            setAuthState(AuthType.REGISTER);
        } else {            
            setAuthState(AuthType.LOGIN);
        }
    }

    const handleVerifVis = () => {
        setVerifVis(!verifVis);
    }

    const handleWaiting = () => {
        setWaiting(!waiting);
    }
    
    return (
        <S.Auth>
            {authState === AuthType.LOGIN ?
                <Login handleAuthState={handleAuthState} /> :
                <Register
                    handleAuthState={handleAuthState}
                    handleVerifVis={handleVerifVis}
                    waiting={waiting}
                    handleWaiting={handleWaiting}
                />
            }

            {verifVis ?
                <Verification 
                    waiting={waiting}
                    handleWaiting={handleWaiting}
                    handleVerifVis={handleVerifVis} 
                /> 
            : null}
        </S.Auth>
    )
}

export default Auth;