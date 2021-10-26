import { useState, ChangeEvent, FormEvent } from 'react';

import useFetch from '../../../hooks/useFetch';
import useFormValidation from '../../../hooks/useFormValidation';

import { AuthType } from '../ts/types';
import { AuthProps, RegisterValue, LoginValue } from '../ts/interfaces';

import { MethodType } from '../../../ts/types';

const useAuth = ({ 
    initialValue, 
    initialErrorValue,
    type 
}: AuthProps) => {
    const { response, fetchData } = useFetch();
    const { error, validate, checkErrors, clearError } = useFormValidation(initialErrorValue);

    const [value, setValue] = useState<LoginValue | RegisterValue>(initialValue);


    const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        validate({ value: value.name, name: 'name', length: 5 });
        validate({ value: value.password, name: 'password', length: 8 });

        if(type === AuthType.REGISTER) {
            validate({ value: (value as RegisterValue).email, name: 'email' });
            validate({ value: {
                password: value.password,
                confirmPassword: (value as RegisterValue).confirmPassword
            }, name: 'passwords' });
        }

        if(checkErrors()) return null;

        await fetchData({
            method: MethodType.POST,
            url: type === AuthType.LOGIN ? '/user/signin' : `/user/signup`,
            data: value
        });
    }

    return {
        value,
        error,
        response,
        handleValue,
        handleSubmit,
        clearError
    }
}

export default useAuth;