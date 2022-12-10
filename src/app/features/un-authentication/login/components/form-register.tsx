import React from 'react';
import { View } from 'react-native';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginType, FormRegisterType } from '@model/authentication';
import { registerValidation } from '@validate/login';

import { Input } from './input';

import { Block, Button, Text } from '@components';
import { useLoginStyle } from '../style';
import { FormRegisterProps } from '../type';

export const FormRegister = ({ onSubmit }: FormRegisterProps) => {
    // state
    const formMethod = useForm<FormRegisterType>({
        mode: 'all',
        resolver: yupResolver(registerValidation),
    });

    // function
    const onSubmitKey = () => {
        formMethod.handleSubmit(onSubmit)();
    };
    // render
    return (
        <FormProvider {...formMethod}>
            <View style={useLoginStyle().login_container}>
                <Text
                    style={{ marginBottom: 22, marginTop: 5 }}
                    textAlign="center"
                    fontSize={22}
                    fontWeight="500"
                    colorTheme="button"
                >
                    Đăng ký
                </Text>
                <Text style={{ marginBottom: 5 }} colorTheme="button">
                    Họ tên
                </Text>
                <Input<FormRegisterType> name={'full_name'} label={'Nhập họ tên'} />

                <Text style={{ marginBottom: 5 }} colorTheme="button">
                    Số điện thoại
                </Text>
                <Input<FormRegisterType> name={'phone'} label={'Nhập số điện thoại'} />

                <Text style={{ marginBottom: 5 }} colorTheme="button">
                    Email
                </Text>
                <Input<FormRegisterType> name={'email'} label={'Nhập email'} />

                <Text style={{ marginBottom: 5 }} colorTheme="button">
                    Mật khẩu
                </Text>
                <Input<FormRegisterType> name={'password'} label={'Mật khẩu'} />

                <Text style={{ marginBottom: 5 }} colorTheme="button">
                    Nhập lại mật khẩu
                </Text>
                <Input<FormRegisterType> name={'re_password'} label={'Nhập lại mật khẩu'} />

                <Button
                    buttonColorTheme="button"
                    textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
                    style={{ paddingVertical: 16, borderRadius: 12, marginTop: 20 }}
                    textColorTheme="background"
                    onPress={onSubmitKey}
                    text="Tiếp tục"
                />
            </View>
        </FormProvider>
    );
};
