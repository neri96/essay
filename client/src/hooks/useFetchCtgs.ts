import useFetch from './useFetch';

import { getUserData } from '../localStorage/userData';

import { Mode, MethodType } from '../ts/types';

const useFetchCtgs = () => {
    const userData = getUserData();

    const { response, fetchData } = useFetch();

    const fetchCtgs = (mode: any) => {
        const config = mode === Mode.PUBLIC ? {
            method: MethodType.GET, 
            url: `/category/getallpublic`,
            authRequiered: true
        } : {
            method: MethodType.POST,
            url: `/category/getallprivate`,
            data: { id: userData.cid },
            authRequiered: true
        }

        fetchData(config);
    }

    return { response, fetchCtgs }
}

export default useFetchCtgs;