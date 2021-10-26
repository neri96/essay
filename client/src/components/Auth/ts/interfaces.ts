import { AuthType } from './types';

export interface LoginValue {
    name: string;
    password: string;
}

export interface RegisterValue extends LoginValue {
    email: string;
    confirmPassword: string;
}

export interface AuthProps {
    initialValue: LoginValue | RegisterValue;
    initialErrorValue: LoginValue | RegisterValue;
    type: AuthType
}

export interface IVerification {
    waiting: boolean,
    handleWaiting: () => void,
}
