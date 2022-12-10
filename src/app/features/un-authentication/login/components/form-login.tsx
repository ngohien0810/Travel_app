import React from 'react';
import { View } from 'react-native';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginType } from '@model/authentication';
import { loginValidation } from '@validate/login';

import { Input } from './input';

import { Block, Button, Text } from '@components';
import { useLoginStyle } from '../style';
import { FormLoginProps } from '../type';

export const FormLogin = ({ onSubmit }: FormLoginProps) => {
    // state
    const formMethod = useForm<FormLoginType>({
        mode: 'all',
        resolver: yupResolver(loginValidation),
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
                    Đăng nhập
                </Text>

                <Input<FormLoginType> name={'email'} label={'09xxxxxxxxx'} />
                <Input<FormLoginType> name={'password'} label={'Password'} />

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
