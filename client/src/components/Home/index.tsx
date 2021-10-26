import { useContext } from 'react';

import NoteSettings from './NoteSettings';
import Category from '../reusable/Category';
import Pagination from './Pagination';

import PublicationList from '../hoc/PublicationList';
import Article from './ArticleList/Article';
import Note from './NoteList/Note';

import { GlobalDataCtx } from '../../context';

import { boxLight } from '../../constants/vars';

import * as S from './style';

import { CategoryType, NoteArticleType, Mode } from '../../ts/types';

const Home = () => {
    const { noteType, mode, categoriesResponse, fetchCategories } = useContext(GlobalDataCtx);
    
    return (
        <S.Face>
            <NoteSettings />
            <Category 
                ctgType={CategoryType.GLOBAL}
                ctgMode={mode}
                ctgList={categoriesResponse}
                fetchCategories={fetchCategories}
                style={{ height: '50px', width: '95%', color: boxLight }}
            />
            {noteType === NoteArticleType.ARTICLE ?
                <PublicationList component={Article} listType={NoteArticleType.ARTICLE} /> :
                <PublicationList component={Note} listType={NoteArticleType.NOTE} /> 
            }
            <Pagination />
        </S.Face>
    )
}

export default Home;