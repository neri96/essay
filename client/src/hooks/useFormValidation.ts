import { useState, FocusEvent } from 'react';

import { nameRegEx, emailRegEx } from '../constants/regEx';

interface Passwords {
    password: string;
    confirmPassword: string;
}

interface Validate {
    value: string | Passwords;
    name: string;
    length?: number;
    maxLength?: number;
}

const useFormValidation = (initialError: any) => {
    const [error, setError] = useState(initialError); 
    
    let errorLocal: any = {};

    const checkErrors = () => {
        let hasErrors = false;

        for(let err of Object.values(errorLocal)) {
            if(err) {
                hasErrors = true;
                break;
            }
        }

        if(hasErrors) {
            setError({ ...error, ...errorLocal });
            return true;
        } 

        return false;
    }

    const validate = ({ value, name, length, maxLength }: Validate) => {
        switch(true) {
            case !value:
                errorLocal[name] = 'This field can not be empty';
                break;
            case typeof value === 'string' && length && value.length < length:
                errorLocal[name] = `This field must contain at least ${length} characters`;
                break;
            case name === 'name':
                if(!emailRegEx.test(String(value).toLowerCase()) &&
                !nameRegEx.test(String(value).toLowerCase())) {
                    errorLocal.name = 'Invalied name';
                }
                break;
            case typeof value === 'string' && length && maxLength && value.length > maxLength:
                errorLocal[name] = `Maximum amount of characters is ${maxLength}`;
                break;
            case name === 'email':
                if(!emailRegEx.test(String(value).toLowerCase())) {
                    errorLocal.email = 'This field must contain email';
                }
                break;
            case name === 'passwords':
                if((value as Passwords).password != 
                (value as Passwords).confirmPassword) {
                    errorLocal.confirmPassword = 'Passwords don\'t match';
                }
                break;
            default:
                return null;
        }
    }
   
    const clearError = (e?: FocusEvent<any> | null, isBody?: boolean) => {
        const name = e ? e.target.name : null;
        
        if(error[name]) {
            setError({ ...error, [name]: '' });
        } else if(isBody) {
            error.body && setError({ ...error, body: '' });
        }
    }

    return { error, validate, checkErrors, clearError }
}

export default useFormValidation;