import styled from 'styled-components';
import * as v from '../../constants/vars';

const NoteDropTextStyle = styled.div<any>`
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    p {
        margin: 0;
        color: ${v.textColor}
    }
`;

const NoteDropText = ({ children }: any) => {
    return (
        <NoteDropTextStyle>
            <p>{children}</p>
        </NoteDropTextStyle>
    )
}

export default NoteDropText;