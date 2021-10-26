import { ChangeEvent, FocusEvent } from 'react';

import * as S from './style';

interface ModifyTitleProps {
    value: string;
    error: string;
    handleChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
    clearError: (arg0?: FocusEvent<any> | null, arg1?: boolean) => void;
}

const ModifyTitle = ({ value, error, handleChange, clearError }: ModifyTitleProps) => {    
    return (
        <S.Input color='light' type='modifyBig'>
            <span>Title</span>
                {error ? 
                    <span className='error'>{error}</span> : null}
                <input 
                    type='text'
                    name='title'
                    value={value}
                    onChange={handleChange} 
                    onFocus={clearError}
                />
        </S.Input>
    )
}

export default ModifyTitle;