import { ChangeEvent } from 'react';

import { GrImage } from 'react-icons/gr';

import * as S from './style';

interface ModifyPreviewProps {
    value: any;
    handleChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
    fileRef: any;
}

const ModifyPreview = ({ handleChange, fileRef }: ModifyPreviewProps) => {
    return (
        <S.Input color='light' type='modifyBig'>
            <span>Preview image</span>
            {false ? 
            <span className='error'>{'error'}</span> : null}
            <S.PreviewFile>
                <div className='file-icon'>
                    <label htmlFor='previewInput' className='previewLabel'>
                        <GrImage height='35px' />
                    </label>
                </div>
                <div className='file-value'>
                    <span>
                        {fileRef.current && fileRef.current.files[0] ? 
                        fileRef.current.files[0].name : null}
                    </span>
                </div>
                <input
                    ref={fileRef}
                    id='previewInput' 
                    type='file'
                    name='preview'
                    accept='image/png, image/jpg, image/jpeg'
                    onChange={handleChange} 
                />
            </S.PreviewFile>
        </S.Input>
    )
}

export default ModifyPreview;