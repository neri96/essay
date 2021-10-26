import { useState, useContext } from 'react';

import axios from 'axios';

import { GlobalDataCtx } from '../context';
import { getUserData, setUserData, removeUserData } from '../localStorage/userData';

import { MethodType } from '../ts/types';

interface FetchData {
    method: MethodType,
    url: string,
    data?: any,
    authRequiered?: boolean;
    onCompleted?: any;
}

interface Response {
    loading: boolean,
    data: any,
    error: any
}

const useFetch = () => {
    let accessToken: string;
    let refreshToken: string;
    let expirationDate: number;

    const userData = getUserData();

    if(userData) {
        accessToken = userData.accessToken;
        refreshToken = userData.refreshToken;
        expirationDate = userData.expirationDate
    }

    const { handleIsAuth } = useContext(GlobalDataCtx);

    const initialValue = {
        loading: false,
        data: null,
        error: null
    }

    const [response, setResponse] = useState<Response>(initialValue);

    const clearValue = () => {
        setResponse({ ...initialValue });
    }

    const handleLoading = () => {
        setResponse({
            ...response,
            loading: true
        });
    }

    const handleSuccess = (data: any) => {
        setResponse({
            ...response,
            loading: false,
            data
        });
    }

    const handleError = (error: any) => {
        setResponse({
            ...response,
            loading: false,
            error
        });
    }


    const headers: { 'Accept': string, 'Content-Type': string, 'Authorization'?: string } = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    const validateToken = async () => {
        if(accessToken) {
            if(Date.now() > expirationDate) {
                try {
                    const response = await axios({ 
                        method: MethodType.POST,
                        url: '/user/refreshToken',
                        data: { refreshToken }
                    });

                    headers.Authorization = `Bearer ${response.data.userData.accessToken}`
                    setUserData(response.data.userData);

                    return true;
                } catch (_error) {
                    return null;             
                }
            } else {
                headers.Authorization = `Bearer ${accessToken}`;
                
                return true;
            }
        } else {
            return null;
        }
    }
    
    const fetchData = async ({ method, url, data, authRequiered, onCompleted }: FetchData) => {
        if(authRequiered) {
            const isValid = await validateToken();
            
            if(!isValid) {
                removeUserData();
                handleIsAuth();

                return null;
            }
        }

        handleLoading();
        
        try {
            const response = await axios({
                method,
                url,
                headers,
                data: data ? data : null
            });

            handleSuccess(
                response.data.notes && { notes: response.data.notes, pages: response.data.pages } ||
                response.data.note ||
                response.data.categories ||
                response.data.userData ||
                response.data.message
            );
            
            return onCompleted ? onCompleted(response.data) : null;                                
        } catch (error: any) {
            console.log(error);
            
            handleError(error.response.data.error);
        }
    }
    
    return {
        response,
        clearValue,
        fetchData 
    };
}

export default useFetch;