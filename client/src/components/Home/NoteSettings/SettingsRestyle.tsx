import { useState } from 'react';
import { MdStyle } from 'react-icons/md';

import FadingComponent from '../../reusable/FadingComponent';
import Button from '../../reusable/Button';

import * as S from './style';

const SettingsRestyle = ({ handleRestyled }: { handleRestyled: () => void }) => {
    const [tipOpen, setTipOpen] = useState<boolean>(false);

    const handleTip = () => {
        setTipOpen(!tipOpen);
    }
    
    return (
        <S.SettingsRestyle>
            <Button 
                type='button'
                handleClick={handleRestyled}
                style={{ width: '50px' }}
            >
                <MdStyle
                    onMouseEnter={handleTip}
                    onMouseLeave={handleTip}
                />
            </Button>

            <FadingComponent state={tipOpen} style='fade-modal'>
                <S.Tip>
                    <span>Restyle</span>
                </S.Tip>
            </FadingComponent>
        </S.SettingsRestyle>
    )
}

export default SettingsRestyle;