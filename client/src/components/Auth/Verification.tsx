import { useEffect, useState, useRef, useContext, ChangeEvent, FormEvent } from 'react';

import Modal from '../Modal';
import Button from '../reusable/Button';
import VerifResend from './VerifResend';

import useFetch from '../../hooks/useFetch';
import useStoreTokens from './hooks/useStoreTokens';

import { GlobalDataCtx } from '../../context';

import * as S from './style';

import { MethodType } from '../../ts/types';
import { IVerification } from './ts/interfaces';

const error = { title: '' };

interface VerifProps extends IVerification {
    handleVerifVis: () => void
}

const Verification = ({ waiting, handleWaiting, handleVerifVis }: VerifProps) => {
    const [verifCode, setVerifCode] = useState<number | string>();

    const { handleIsAuth } = useContext(GlobalDataCtx);

    const { response, fetchData } = useFetch();
    const { storeTokens } = useStoreTokens();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleVerifCode = (e: ChangeEvent<HTMLInputElement>) => {
        setVerifCode(e.target.value);
    }
    
    const handleConfirmation = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        fetchData({
            method: MethodType.POST,
            url: '/user/confirm',
            data: { code: verifCode }
        })
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    useEffect(() => {
        const { loading, data } = response;
            
        if(data && !loading) {
            handleVerifVis();
            if(waiting) handleWaiting();

            storeTokens(data);
            handleIsAuth();
        }
    }, [response.data])

    return (
        <Modal
            headerTitle={'Email verification'}
            handleClick={handleVerifVis}
        >
            <S.Verification>
                <S.VerifText>
                    <span>We sent verification code to your email address, please type it to the field below</span>
                </S.VerifText>
                <form onSubmit={handleConfirmation}>
                    <S.VerifBody>
                        <VerifResend waiting={waiting} handleWaiting={handleWaiting} />
                        <S.Input height='60px' error={error}>
                            {error.title ? 
                                <span className='error'>Error</span> : null}
                            <input 
                                ref={inputRef}
                                type='text'
                                name='code'
                                value={verifCode}
                                onChange={handleVerifCode} 
                            />
                        </S.Input>
                    </S.VerifBody>
                    <S.VerifFooter>
                        <Button type='submit' loading={response.loading}>
                            Confirm
                        </Button>
                    </S.VerifFooter>
                </form>
            </S.Verification>
        </Modal>
    )
}

export default Verification;