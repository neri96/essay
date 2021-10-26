import { ReactNode } from 'react';

import { superDark } from '../../constants/vars';

import * as S from './style';

import { ModalType } from '../../ts/types';

interface AuthModaProps {
    children: ReactNode;
    headerTitle: string;
    modalType: ModalType.AUTH;
}

const AuthModal = ({ children, headerTitle, modalType }: AuthModaProps) => {
    return (
        <S.Window background={superDark} modalType={modalType}>
            <S.ModalHeader>
                <h3>{headerTitle}</h3>
            </S.ModalHeader>
            {children}
        </S.Window>
    )
}

export default AuthModal;