import { MdDelete } from 'react-icons/md';

import DeleteModal from '../../reusable/DeleteModal';
import FadingComponent from '../../reusable/FadingComponent';
import Button from '../../reusable/Button';

interface ArticleDeleteProps {
    articleId: string;
    deleteOpen: boolean;
    handleDeleteOpen: () => void;
}

const ArticleDelete = ({ articleId, deleteOpen, handleDeleteOpen }: ArticleDeleteProps) =>{
    return (
        <div className='artc-menu-option'>
            <Button 
                type='button'
                handleClick={handleDeleteOpen}
            >
                <MdDelete color={'#cc0000'} />
                Delete
            </Button>
            <FadingComponent state={deleteOpen} style={'fade-modal'}>
                <DeleteModal 
                    articleId={articleId}
                    handleModal={handleDeleteOpen}
                />
            </FadingComponent>
        </div>
    )
}

export default ArticleDelete;