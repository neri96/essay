import { useState } from 'react';
import { useHistory } from 'react-router';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import ArticleDelete from './ArticleDelete';
import FadingComponent from '../../reusable/FadingComponent';
import Button from '../../reusable/Button';

import useClickOutside from '../../../hooks/useClickOutside';

import * as S from './style';

import { UserData } from './interfaces';
import { Roles } from '../../../ts/types';

interface ArticleMenuProps {
    articleId: string;
    author: string;
    authorRole: Roles;
    userData: UserData;
}

const ArticleMenu = ({ 
    articleId, 
    author, 
    authorRole,
    userData: { name, role } }: ArticleMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const history = useHistory();

    const handleIsMenuOpen = (action?: string) => {
        if(action === 'close') {
            return setIsMenuOpen(false);
        }

        setIsMenuOpen(!isMenuOpen);
    }

    const handleEdit = () => {
        history.push(`/note/modify/${articleId}`);
    }

    const handleDeleteOpen = () => {
        setDeleteOpen(!deleteOpen);
    }

    const { ref } = useClickOutside(handleIsMenuOpen);

    const articleMenu = () => {
        if(name === author) {
            return (
                <>
                    <MdKeyboardArrowDown onClick={() => handleIsMenuOpen()} />
                    <FadingComponent state={isMenuOpen} style='fade-modal'>
                        <S.ArticleMenu>
                            <div className='artc-menu-option'>
                                <Button 
                                    type='button'
                                    handleClick={handleEdit}
                                >
                                    <MdModeEdit color={'#009900'} />
                                    Edit
                                </Button>
                            </div>
                            <ArticleDelete 
                                articleId={articleId}
                                deleteOpen={deleteOpen}
                                handleDeleteOpen={handleDeleteOpen}
                            />
                        </S.ArticleMenu>
                    </FadingComponent>
                </>
            )
        } else if(name != author && role > Roles.USER) {
            return <MdDelete color={'#cc0000'} onClick={handleDeleteOpen} />
        } else if(authorRole === Roles.OWNER && role != Roles.OWNER) {
            return null;
        }
    }

    return (
        <S.ArticleMenuWrap ref={ref}>
            {articleMenu()}
        </S.ArticleMenuWrap>
    )
}

export default ArticleMenu;