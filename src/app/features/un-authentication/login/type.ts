import { FormLoginType, FormRegisterType } from '@model/authentication';

export interface FormLoginProps {
    onSubmit: (data: FormLoginType) => void;
}

export interface FormRegisterProps {
    onSubmit: (data: FormRegisterType) => void;
}
