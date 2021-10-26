import { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

interface FadingComponentProps { 
    children: ReactNode, 
    state: boolean,
    style: string 
}

const FadingComponent = ({ children, state, style }: FadingComponentProps) => {
    return (
        <CSSTransition
            in={state}
            classNames={style}
            timeout={300}
            unmountOnExit
        >
            {children}
        </CSSTransition>
    )
}

export default FadingComponent