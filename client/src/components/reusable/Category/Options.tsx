import { MdDelete } from 'react-icons/md';

import { v4 as uuid } from 'uuid';

import useFetch from '../../../hooks/useFetch';

import styled from 'styled-components';
import { dark } from '../../../constants/vars';
import { CategoryType, MethodType, Mode } from '../../../ts/types';

interface OptionsProps {
    mode: any;
    ctgType: any;
    handleOptionVis: any;
    handleCurrentCtg: any;
    fetchCategories: any;
    ctgList: any;
    topDistance?: string; 
}

export const OptionsStyle = styled.div<any>`
    width: 100%;
    background-color: ${dark};
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(51, 51, 51, 0.6);
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
    .option-wrap {
        height: ${props => props.ctgType === CategoryType.GLOBAL ? '50px' : '35px'};
        width: 100%;
        display: flex;
        cursor: pointer;
        box-shadow: 0px 0px 2px 0px rgba(51, 51, 51, 0.8);
        position: relative;
        .option {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .option-delete {
            height: 100%;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 170;
            span {
                text-transform: capitalize;
            }
        }
    }
    .option:hover > span {
        font-size: 18px;
    }
`;

const Options = ({ 
    mode,
    ctgType,
    handleOptionVis,
    handleCurrentCtg, 
    fetchCategories,
    ctgList,
    topDistance 
}: OptionsProps) => {
    const { response, fetchData } = useFetch();

    const deleteCtg = async (name: any) => {
        await fetchData({
            method: MethodType.DELETE,
            url: `/category/${mode === Mode.PUBLIC ? 'removepublic' : 'removeprivate'}`,
            data: { name }
        })

        await fetchCategories();
    }

    return (
        <OptionsStyle ctgType={ctgType} topDistance={topDistance}>
            {ctgList.data.map((ctg: any) => {
                return (
                    <div 
                        key={uuid()} 
                        className='option-wrap'
                    >
                        <div className='option' onClick={() => handleCurrentCtg(ctg.name)}>
                            <span>{ctg.name}</span>
                        </div>
                        <div className='option-delete'>
                            {ctgType === CategoryType.GLOBAL ? 
                                ctg.isEmpty ?
                                    <MdDelete color={'#cc0000'} onClick={() => deleteCtg(ctg.name)} /> :
                                    <MdDelete color={'#cc0000'} opacity={'.3'} /> 
                                    : null
                            }
                        </div>
                    </div>
                )
            })}
        </OptionsStyle>
    )
}

export default Options;