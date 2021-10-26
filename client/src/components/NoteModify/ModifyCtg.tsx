import { useContext } from 'react';

import Category from '../reusable/Category';

import useFetchCtgs from '../../hooks/useFetchCtgs';
import { boxDark } from '../../constants/vars';

import * as S from './style';

import { Value } from './ts/interfaces';
import { CategoryType, Mode } from '../../ts/types';

interface ModifyCtgProps {
    value: string;
    privacy: Mode;
    handleChange: (arg0: string) => void;
}

const ModifyCtg = ({ value, privacy, handleChange }: ModifyCtgProps) => {
    const { response, fetchCtgs } = useFetchCtgs();

    return (
        <S.Input color='light' error={'error'}>
            <span>Category</span>
                {false ? 
                    <span className='error'>{'error'}</span> : null}
            <Category
                ctgValue={value}
                ctgType={CategoryType.USER_CATEGORIES}
                ctgMode={privacy}
                ctgList={response}
                fetchCategories={fetchCtgs}
                handleCtgValue={handleChange}
                style={{ height: '35px', width: '100%', color: boxDark }}
            />
        </S.Input>
    )
}

export default ModifyCtg;