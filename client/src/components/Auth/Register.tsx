import { useEffect } from 'react';

import AuthModal from './AuthModal';
import Button from '../reusable/Button';

import useAuth from './hooks/useAuth';
import useVerif from './hooks/useVerif';

import { boxDark } from '../../constants/vars';

import * as S from './style';

import { AuthType } from './ts/types';
import { RegisterValue } from './ts/interfaces';

import { ModalType } from '../../ts/types';

const initialValue = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

interface RegisterProps {
    handleVerifVis: () => void, 
    handleAuthState: () => void,
    waiting: boolean,
    handleWaiting: () => void
}

const Register = ({ handleAuthState, handleVerifVis, waiting, handleWaiting }: RegisterProps) => {
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
        type: AuthType.REGISTER
    });

    const registerValue = (value as RegisterValue);

    const { verifResponse, sendCodeToMail } = useVerif();

    useEffect(() => {
        const { loading, data } = response;
            
        if((data) && !loading) {
            sendCodeToMail(waiting);
        }
    }, [response.data])

    useEffect(() => {
        const { loading, data } = verifResponse;

        if((data) && !loading) {
            handleVerifVis();
            handleWaiting();
        }
    }, [verifResponse.data])

    return (
        <AuthModal 
            headerTitle='Register' 
            modalType={ModalType.AUTH}
        >
            {response.error ?
                    <div className='error-block'>
                        <span className='error'>{response.error}</span>
                    </div> 
            : null}
            <form className='form' onSubmit={handleSubmit}>
                <S.Input height='60px' color='light' error={error}>
                    <span>Name</span>
                    {error.name ? 
                        <span className='error'>{error.name}</span> : null}
                    <input 
                        type='text'
                        name='name'
                        value={registerValue.name}
                        onChange={handleValue} 
                        onFocus={clearError}
                    />
                </S.Input>
                <S.Input height='60px' color='light' error={error}>
                    <span>Email</span>
                    {error.email ? 
                        <span className='error'>{error.email}</span> : null}
                    <input 
                        type='text'
                        name='email'
                        value={registerValue.email}
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
                <S.Input height='60px' color='light' error={error}>
                    <span>Confirm Password</span>
                    {error.confirmPassword ? 
                        <span className='error'>{error.confirmPassword}</span> : null}
                    <input 
                        type='password'
                        name='confirmPassword'
                        value={registerValue.confirmPassword}
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
                        Register
                    </Button>
                </S.ModalFooter>
                <S.AuthFooter>
                    <span>Have an account already?
                        <span 
                            className='switch-modal'
                            onClick={handleAuthState}
                        >Sign in</span>
                    </span>
                </S.AuthFooter>
            </form>
        </AuthModal>
    )
}

export default Register;