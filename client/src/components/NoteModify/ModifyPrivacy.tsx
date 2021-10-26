import { useState, MouseEvent } from 'react';

import FadingComponent from '../reusable/FadingComponent';
import useClickOutside from '../../hooks/useClickOutside';

import * as S from './style';

import { Mode } from '../../ts/types';

interface ModifyPrivacyProps {
    value: Mode;
    handleChange: (arg0: Mode) => void;
}

const ModifyPrivacy = ({ value, handleChange }: ModifyPrivacyProps) => {
    const [privacyOpen, setPrivacyOpen] = useState<boolean>(false);

    const handlePrivacyOpen = (action?: string) => {
        if(action === 'close') {
            return setPrivacyOpen(false);
        }
        setPrivacyOpen(!privacyOpen);
    }

    const { ref } = useClickOutside(handlePrivacyOpen);

    const handleClick = (mode: Mode) => {
        handleChange(mode);
        handlePrivacyOpen();
    }

    return (
        <S.Input color='light' error={'error'}>
            <span>Privacy</span>
                {false ? 
                    <span className='error'>{'error'}</span> : null}
            <S.ModifyPrivacy ref={ref}>
                <div 
                    className='privacy-chosen'
                    onClick={() => handlePrivacyOpen()}
                >
                    <span>{value}</span>
                </div>

                <FadingComponent state={privacyOpen} style={'fade-modal'}>
                    <S.PrivacyList>
                        <div 
                            className='privacy-option'
                            onClick={() => handleClick(Mode.PUBLIC)}
                        >
                            <span>{Mode.PUBLIC}</span>
                        </div>
                        <div 
                            className='privacy-option'
                            onClick={() => handleClick(Mode.PRIVATE)}
                        >
                            <span>{Mode.PRIVATE}</span>
                        </div>
                    </S.PrivacyList>
                </FadingComponent>
            </S.ModifyPrivacy>
        </S.Input>
    )
}

export default ModifyPrivacy;