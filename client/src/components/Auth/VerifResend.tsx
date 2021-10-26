import { useState, useEffect, useRef } from 'react';

import useVerif from './hooks/useVerif';

import * as S from './style';

import { IVerification } from './ts/interfaces';

const VerifResend = ({ waiting, handleWaiting}: IVerification) => {
    const [seconds, setSeconds] = useState<number>(12);

    const prevState = useRef<boolean>();

    const { sendCodeToMail } = useVerif();

    const handleResend = () => {
        sendCodeToMail(waiting);
        handleWaiting();
        setSeconds(12);
    }

    useEffect(() => {
        if(waiting) {
            prevState.current = waiting;

            const secInterval = setInterval(() => {
                if(seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    setSeconds(0);
                    handleWaiting();
                }
            }, 1000);
    
            return () => clearInterval(secInterval);
        }
    });

    return (
        <S.VerifResend>
            {seconds ?
                <span>Resend code in 0:{seconds >= 10 ? seconds : '0' + seconds} seconds</span> : null}
                
            {!seconds && prevState ?
                <span className='resend-verif' onClick={handleResend}>
                    Resend verification code
                </span> : null}
        </S.VerifResend>
    )
}

export default VerifResend;