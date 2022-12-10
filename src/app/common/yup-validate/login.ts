import { FormLoginType, FormRegisterType } from '@model/authentication';
import * as yup from 'yup';

export const loginValidation: yup.SchemaOf<FormLoginType> = yup.object().shape({
    phone: yup.string().required('Số điện thoại bắt buộc!'),
    password: yup.string().required('Mật khẩu bắt buộc!'),
});

export const registerValidation: yup.SchemaOf<FormRegisterType> = yup.object().shape({
    full_name: yup.string().required('Họ tên bắt buộc!'),
    phone: yup.string().required('Số điện thoại bắt buộc!'),
    email: yup.string().required('Email bắt buộc!'),
    password: yup.string().required('Mật khẩu!'),
    re_password: yup.string().required('Nhập lại mật khẩu!'),
});
