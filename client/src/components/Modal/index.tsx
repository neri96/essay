import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { IoMdClose } from 'react-icons/io';

import * as S from './style';

interface ModalProps {
    children: ReactNode,
    headerTitle: string;
    handleClick: () => void;
}

const Modal = ({ children, headerTitle, handleClick }: ModalProps) => {
    const portalDiv = document.querySelector('#modal');

    return portalDiv ? ReactDOM.createPortal(
        <S.Modal>
            <S.Overlay onClick={handleClick} />
            <S.Window modalType='modify'>
                <S.ModalHeader>
                    <h3>{headerTitle}</h3>
                    <IoMdClose onClick={handleClick} />
                </S.ModalHeader>
                {children}
            </S.Window>
        </S.Modal>, 
        portalDiv
    ) : null;
}

export default Modal;