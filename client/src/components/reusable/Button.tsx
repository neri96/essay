import { ReactNode } from 'react';

import { ReactComponent as Loading } from '../../assets/loading.svg';

import styled from 'styled-components';
import * as v from '../../constants/vars';

interface ButtonProps {
    children: ReactNode,
    elemRef?: any,
    type: string,
    disabled?: boolean,
    loading?: boolean;
    style?: { height?: string, width?: string, color?: any };
    handleClick?: () => void
}

const ButtonStyle = styled.button<any>`
    height: ${props => props.height ? props.height : '35px'};
    width: ${props => props.width ? props.width : '150px'};
    color: ${v.textColor};
    border: none;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    border-radius: 5px;
    font-size: 15px;
    box-shadow: 0px 0px 5px 0px rgba(51, 51, 51, 0.6);
    background-color: ${props => props.color ? props.color : v.superDark};
    opacity: ${props => props.disabled && '0.3'};
    position: relative;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = ({ children, elemRef, style, disabled, loading, handleClick }: ButtonProps) => {
    return (
        <ButtonStyle
            ref={elemRef}
            color={style && style.color ? style.color : null} 
            disabled={disabled || loading}
            height={style && style.height ? style.height : null} 
            width={style && style.width ? style.width : null} 
            onClick={handleClick}
        >
            {loading ? 
                <Loading height='30' /> :
            children}
        </ButtonStyle>
    )
}

export default Button;