import { useState } from 'react';

import useClickOutside from '../../../hooks/useClickOutside';
import FadingComponent from '../../reusable/FadingComponent';

import * as S from './style';

import { CtgRestrictionStatus } from '../../../ts/types';

interface AddCtgRestrictionsProps {
    restrictStatus: CtgRestrictionStatus;
    handleRestrStatus: (arg0: CtgRestrictionStatus) => void;
}

const AddCtgRestrictions = ({ restrictStatus, handleRestrStatus }: AddCtgRestrictionsProps) => {
    const [restOptionsOpen, setRestOptionsOpen] = useState(false);

    const handleRestOptions = (action?: string) => {
        if(action === 'close') {
            return setRestOptionsOpen(false); 
        }
        setRestOptionsOpen(!restOptionsOpen);
    }

    const { ref } = useClickOutside(handleRestOptions);

    return (
        <S.CtgRestriction>
            <span>Set restrictions</span>
            <S.CtgRestictInput ref={ref} onClick={() => handleRestOptions()}>
                <span>{restrictStatus}</span>
                <FadingComponent
                    state={restOptionsOpen}
                    style={'fade-modal'}
                >
                    <S.RestrictionOption>
                        <div 
                            className='restrict-option'
                            onClick={() => handleRestrStatus(CtgRestrictionStatus.NOT_RESTRICTED)}
                        >
                            <span>{CtgRestrictionStatus.NOT_RESTRICTED}</span>
                        </div>
                        <div 
                            className='restrict-option'
                            onClick={() => handleRestrStatus(CtgRestrictionStatus.RESTRICTED)}
                        >
                            <span>{CtgRestrictionStatus.RESTRICTED}</span>
                        </div>
                    </S.RestrictionOption>
                </FadingComponent>
            </S.CtgRestictInput>
        </S.CtgRestriction>
    )
}

export default AddCtgRestrictions;