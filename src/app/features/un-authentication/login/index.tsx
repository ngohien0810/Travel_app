import React from 'react';
import { Alert } from 'react-native';

import { dispatch } from '@common';
import { Block, Button, Screen, Text, Wallpaper } from '@components';
import { FormLoginType } from '@model/authentication';
import { appActions } from '@redux-slice';

import { FormLogin } from './components/form-login';
import FastImage from 'react-native-fast-image';
import { images } from '@assets/image';
import { HEIGHT_SCREEN } from '@theme';

export const Login = () => {
    // function
    const onSubmit = (data: FormLoginType) => {
        dispatch(appActions.setAppTheme('dark'));
        Alert.alert(JSON.stringify(data));
    };

    // render
    return (
        <Block block paddingTop={0} paddingHorizontal={15}>
            <Wallpaper />

            <Screen
                unsafe
                bottomInsetColor="transparent"
                style={{ paddingVertical: 0, paddingHorizontal: 10 }}
                backgroundColor={'transparent'}
            >
                <Block direction="column" height={HEIGHT_SCREEN}>
                    <Block flex={1}>
                        <Block direction="row" height="100%" justifyContent="center" alignItems="center">
                            <FastImage style={{ height: 128, width: 128 }} source={images.location_login} />
                        </Block>
                    </Block>
                    <Block flex={1} direction="column" justifyContent="space-between">
                        <FormLogin onSubmit={onSubmit} />
                        <Block direction="row" style={{ marginBottom: 40 }} alignItems="center" justifyContent="center">
                            <Text fontSize={16} colorTheme="background">
                                Bạn chưa có tài khoản?
                            </Text>
                            <Button
                                textStyle={{ fontSize: 16, textDecorationLine: 'underline' }}
                                textColorTheme="background"
                                text=" Đăng ký"
                            />
                        </Block>
                    </Block>
                </Block>
            </Screen>
        </Block>
    );
};
