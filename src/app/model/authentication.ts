export type FormLoginType = {
    phone: string;
    password: string;
};

export type FormRegisterType = {
    full_name: string;
    phone: string;
    email: string;
    password: string;
    re_password?: string;
};

export interface AuthenticationState {
    loading: boolean;
}
