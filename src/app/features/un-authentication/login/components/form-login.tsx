import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginType } from '@model/authentication';
import { loginValidation } from '@validate/login';

import { Input } from './input';

import { Block, Button, Text } from '@components';
import { useLoginStyle } from '../style';
import { FormLoginProps } from '../type';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';

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
                <Text style={{ marginBottom: 5 }} colorTheme="button">
                    Số điện thoại
                </Text>
                <Input<FormLoginType> name={'phone'} label={'Nhập số điện thoại'} />
                <Text style={{ marginBottom: 5 }} colorTheme="button">
                    Mật khẩu
                </Text>
                <Input<FormLoginType> name={'password'} label={'Mật khẩu'} secureTextEntry />

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
