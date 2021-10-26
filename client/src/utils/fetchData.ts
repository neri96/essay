import axios from 'axios';

import { getUserData } from "../localStorage/userData";

export default async (config: any) => {
    const { method, url, data } = config;

    let accessToken: string = '';
    let refreshToken: string = '';

    const userData = getUserData();

    if(userData) {
        accessToken = userData.accessToken;
        refreshToken = userData.refreshToken;
    }
    
    try {
        const response = await axios({
            method,
            url,
            headers: {
                'Authorization': `Bearer ${accessToken ? accessToken : refreshToken ? refreshToken : null}`
            },
            data: data ? data : null
        });
           
        return response;
    } catch (error) {
        return error;
    }
}