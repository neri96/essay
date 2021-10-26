import { useState, useEffect, useContext } from 'react';

import FadingComponent from '../FadingComponent';
import Options from './Options';

import useClickOutside from '../../../hooks/useClickOutside';

import { GlobalDataCtx } from '../../../context';

import styled from 'styled-components';

import { CategoryType, MethodType, Mode } from '../../../ts/types';

const CategoryStyle = styled.div<any>`
    min-height: ${props => props.height};
    width: ${props => props.width};
    background-color: ${props => props.color};
    margin: ${props => `${props.ctgType === CategoryType.GLOBAL ? '10' : '5'}px auto 10px auto`};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    z-index: 200;
    h3, span {
        text-transform: capitalize;
    }
`;

const Category = ({ 
    ctgType,
    ctgValue,
    ctgMode,
    ctgList,
    fetchCategories,
    handleCtgValue, 
    style 
}: any) => {
    const [optionsToggle, setOptionsToggle] = useState(false);

    const handleOptionVis = (action: any = null) => {
        if(action === 'open') {
            return setOptionsToggle(true); 
        } else if(action === 'close') {
            return setOptionsToggle(false);
        }
            
        setOptionsToggle(!optionsToggle);
    }
    // const { optionsToggle, handleOptionVis } = useOptions();
    const { ref } = useClickOutside(handleOptionVis);

    const { 
        currentCategory, 
        handleCurrentCtg, 
    } = useContext(GlobalDataCtx);

    useEffect(() => {
        fetchCategories(ctgMode);
    }, [ctgMode])
    
    return (
        <CategoryStyle 
            ctgType={ctgType}
            height={style.height}
            width={style.width}   
            color={style.color}  
            ref={ref} 
            onClick={handleOptionVis}
        >
            {ctgType === CategoryType.GLOBAL ? 
                <h3>{currentCategory}</h3> 
                :
                !ctgValue ?
                    <span>Choose a category</span> :
                    <span>{ctgValue}</span>
            }
            <FadingComponent state={optionsToggle} style={'fade-modal'}>
                <Options 
                    mode={ctgMode}
                    ctgType={ctgType}
                    ctgList={ctgList}
                    fetchCategories={fetchCategories}
                    handleOptionVis={handleOptionVis} 
                    handleCurrentCtg={ctgType === CategoryType.GLOBAL ? handleCurrentCtg : handleCtgValue}
                />
            </FadingComponent>
        </CategoryStyle>
    )
}

export default Category;