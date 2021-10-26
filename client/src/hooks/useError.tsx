import { useHistory } from 'react-router-dom';

interface Error {
    error: string;
    message: string;
}

const useError = () => {
    const history = useHistory();

    const handleErrorMsg = ({ error, message }: Error) => {
        if(error === message) {
            history.push('/');
        }
    }

    return { handleErrorMsg }
}

export default useError;