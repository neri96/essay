import { useEffect, useContext } from 'react';

import AuthModal from './AuthModal';
import Button from '../reusable/Button';

import useAuth from './hooks/useAuth';
import useStoreTokens from './hooks/useStoreTokens';

import { GlobalDataCtx } from '../../context';

import { boxDark } from '../../constants/vars';

import * as S from './style';

import { AuthType } from './ts/types';
import { ModalType } from '../../ts/types';

const initialValue = {
    name: '',
    password: ''
}

const Login = ({ handleAuthState }: { handleAuthState: () => void }) => {
    const { 
        value, 
        error,
        response, 
        handleValue,
        handleSubmit,
        clearError 
    } = useAuth({ 
        initialValue,
        initialErrorValue: initialValue,
        type: AuthType.LOGIN
    });

    const { handleIsAuth } = useContext(GlobalDataCtx);

    const { storeTokens } = useStoreTokens();

    useEffect(() => {
        const { loading, data } = response;
            
        if(data && !loading) {
            storeTokens(data);
            handleIsAuth();
        }
    }, [response.data])
    
    return (
        <AuthModal 
            headerTitle='Login' 
            modalType={ModalType.AUTH}
        >
            {response.error ?
                    <div className='error-block'>
                        <span className='error'>{response.error}</span>
                    </div> 
            : null}
            <form className='form' onSubmit={handleSubmit}>
                <S.Input height='60px' color='light' error={error}>
                    <span>Name or Email</span>
                    {error.name ? 
                        <span className='error'>{error.name}</span> : null}
                    <input 
                        type='text'
                        name='name'
                        value={value.name}
                        onChange={handleValue}
                        onFocus={clearError} 
                    />
                </S.Input>
                <S.Input height='60px' color='light' error={error}>
                    <span>Password</span>
                    {error.password ? 
                        <span className='error'>{error.password}</span> : null}
                    <input 
                        type='password'
                        name='password'
                        value={value.password}
                        onChange={handleValue} 
                        onFocus={clearError} 
                    />
                </S.Input>
                <S.ModalFooter>
                    <Button 
                        type='submit' 
                        loading={response.loading}
                        style={{ color: boxDark }}
                    >
                        Sign in
                    </Button>
                </S.ModalFooter>
                <S.AuthFooter>
                    <span>Need a new account?
                        <span 
                            className='switch-modal'
                            onClick={handleAuthState}
                        >Register</span>
                    </span> 
                </S.AuthFooter>
            </form>
        </AuthModal>
    )
}

export default Login;