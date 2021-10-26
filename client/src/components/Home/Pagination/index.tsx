import { useState, useEffect, useContext } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import ShowAll from './ShowAll';

import { v4 as uuid } from 'uuid';

import { GlobalDataCtx } from '../../../context';

import * as S from './style';

import { Notes } from '../../../ts/interfaces';

enum Direction {
    FORWARD = 'forward',
    BACK = 'back'
}

const Pagination = () => {
    const { globalResponse: { data }, currentPage, removeLimit, handlePage } = useContext(GlobalDataCtx);
    const [pages, setPages] = useState(0);
    const [distance, setDistance] = useState(0);
    
    useEffect(() => {
        console.log('PAGINATION');
        
        if(data) {
            (data as Notes).pages ? 
            setPages((data as Notes).pages) : 
            pages && setPages(0); 
        }
    }, [data])

    const handleDistance = (direction: Direction) => {
        if(direction === Direction.BACK) {
            if((pages - currentPage) <= 2) {
                return false;
            }
        } else if((currentPage + 1) === pages) {
            return false
        } 

        setDistance(currentPage - 3);
    }

    const handleNumClick = (direction: Direction) => {
        if(direction === Direction.FORWARD) {
            if(currentPage === pages) {
                return false
            } else {
                handlePage(currentPage + 1);
            }
        } else if(direction === Direction.BACK) {
            if(currentPage === 1) {
                return false
            } else {
                handlePage(currentPage - 1);
            }
        }

        handleDistance(direction);
    }

    return (
        pages <= 1 ?
            null :
            <S.Pagination>
                <S.Pages page={currentPage} pages={pages}>
                    <div 
                        className='pag-arrow-left' 
                        onClick={() => handleNumClick(Direction.BACK)}
                    >
                        <IoIosArrowBack />
                    </div>
                    <S.PageNumbersWrap 
                        distance={distance}
                        pages={pages}
                    >
                        <div className='page-numbers'>
                            {[...Array(pages)].map((_, i) => i + 1).map((num: number) => {
                                return (
                                    <S.PageNumber 
                                        key={uuid()}
                                        currentPage={num === currentPage} 
                                        onClick={() => handlePage(num)}
                                    >
                                        <span>{num}</span>
                                    </S.PageNumber>
                                )
                            })}
                        </div>
                    </S.PageNumbersWrap>
                    <div 
                        className='pag-arrow-right' 
                        onClick={() => handleNumClick(Direction.FORWARD)}
                    >
                        <IoIosArrowForward />
                    </div>
                </S.Pages>
                <ShowAll removeLimit={removeLimit} />
            </S.Pagination>
    )
}

export default Pagination;