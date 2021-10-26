import { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

import * as S from './style';

import { Mode, NoteArticleType } from '../../../../ts/types';

type Option = Mode | NoteArticleType;

interface SideOptionProps {
    title: Option;
    handleOption: (arg0: Option) => void;
    optionOne: Option; 
    optionTwo: Option;
    handleSidebar: () => void;
}

const SideOption = ({
    title,
    handleOption,
    optionOne,
    optionTwo,
    handleSidebar
}: SideOptionProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleClick = (option: Option) => {
        handleOption(option);
        handleOpen();
        handleSidebar();
    }

    return (
        <S.SideOption open={open}>
            <div className='option-title' onClick={handleOpen}>
                <span>{title}</span>
                <IoMdArrowDropright />
            </div>
            <div className='option-body'>
                <div 
                    className='option-body-option'
                    onClick={() => handleClick(optionOne)}
                >
                    <span>{optionOne}</span>
                </div>
                <div 
                    className='option-body-option'
                    onClick={() => handleClick(optionTwo)}
                >
                    <span>{optionTwo}</span>
                </div>
            </div>
        </S.SideOption>
    )
}

export default SideOption;