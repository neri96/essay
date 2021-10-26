import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { MdLock } from 'react-icons/md';

import ArticleMenu from './ArticleMenu';
import Button from '../../reusable/Button';

import { getUserData } from '../../../localStorage/userData';

import * as S from './style';

import { UserData } from './interfaces';
import { Mode, Roles } from '../../../ts/types';

import { Note } from '../../../ts/interfaces';

const Article = ({ note }: { note: Note }) => {
    const [userData, setUserData] = useState<UserData>({ 
        name: '', 
        role: Roles.USER 
    });
    
    const history = useHistory();

    const handleRead = () => {
        history.push(`/note/${note.cid}`);
    }

    useEffect(() => {
        const { name, role } = getUserData();

        setUserData({ ...userData, name, role });
    }, [])

    const articleMenu = () => {
        const { name, role } = userData;
        
        if(
            (name != note.author.name &&
            role < Roles.ADMIN) ||
            (note.author.role === Roles.OWNER &&
            role < Roles.OWNER)
        ) {
            return null;
        }

        return (
            <ArticleMenu 
                articleId={note.cid}
                author={note.author.name} 
                authorRole={note.author.role} 
                userData={userData} 
            />
        )
    }
    
    return (
        <S.Article>
            <S.ArticleHeader>
                {articleMenu()}
                {note.privacy === Mode.PRIVATE ?
                    <MdLock /> : null}
            </S.ArticleHeader>
            <S.ArticleBody>
                {note.preview ?
                    <img src={`./uploads/${note.preview}`} alt='Preview' /> 
                    : null}
            </S.ArticleBody>
            <S.ArticleFooter>
                <div className='artc-title'>
                    <span>{note.title}</span>
                </div>
                <div className='artc-button'>
                    <Button type='button' handleClick={handleRead}>
                        Read
                    </Button>
                </div>
            </S.ArticleFooter>
        </S.Article>
    )
}

export default Article;