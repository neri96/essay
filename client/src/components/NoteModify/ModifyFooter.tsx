import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import FadingComponent from '../reusable/FadingComponent';
import Button from '../reusable/Button';

import { boxDark } from '../../constants/vars';

import * as S from './style';

interface ModifyFooterProps {
    response: string;
    loading: boolean;
    setRespMsg: Dispatch<SetStateAction<string>>;
}

const ModifyFooter = ({ response, loading, setRespMsg }: ModifyFooterProps) => {
    const [showMsg, setShowMsg] = useState<boolean>(false);
    
    useEffect(() => {
        if(!showMsg && response) setShowMsg(true);
    }, [response])

    useEffect(() => {
        if(showMsg) {
            const msgTimeout = setTimeout(() => {
                setRespMsg('');
                setShowMsg(false);
            }, 3000)

            return () => clearTimeout(msgTimeout)
        }
    }, [showMsg])

    return (
        <S.ModifyFooter>
            <FadingComponent state={showMsg} style='fade-modal'>
                <span className='modify-response'>{response}</span>
            </FadingComponent>
            <Button 
                type='submit'
                loading={loading}
                style={{ color: boxDark }}
            >
                <span>Send</span>
            </Button>
        </S.ModifyFooter>
    )
}

export default ModifyFooter;