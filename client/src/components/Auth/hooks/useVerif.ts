import useFetch from '../../../hooks/useFetch';

import { MethodType } from '../../../ts/types';

const useVerif = () =>{
    const { response, fetchData } = useFetch();

    const sendCodeToMail = async (waiting: boolean) => {
        if(waiting) return false;
        
        await fetchData({
            method: MethodType.POST,
            url: '/user/sendverif'
        })
    }

    return {
        verifResponse: response,
        sendCodeToMail
    }
}

export default useVerif;