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
import { FormRegister } from './components/form-register';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useDispatch } from 'react-redux';

export const Login = () => {
    const [isRegister, setIsRegister] = React.useState(false);
    // const dispatch=useDispatch
    // function
    const onSubmit = (data: FormLoginType) => {
        dispatch(appActions.setAppTheme('dark'));

        if (data.phone === '0987654321' && data.password === '123456') {
            dispatch(appActions.setToken('demo'));
            navigate(APP_SCREEN.HOME);
        } else {
            Alert.alert(JSON.stringify(data));
        }
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
                    <Block flex={isRegister ? 0.35 : 0.9}>
                        <Block direction="row" height="100%" justifyContent="center" alignItems="center">
                            <FastImage
                                style={{ height: isRegister ? 80 : 128, width: isRegister ? 80 : 128 }}
                                source={images.location_login}
                            />
                        </Block>
                    </Block>
                    <Block flex={1} direction="column" justifyContent="space-between">
                        {isRegister ? <FormRegister onSubmit={onSubmit} /> : <FormLogin onSubmit={onSubmit} />}

                        <Block direction="row" style={{ marginBottom: 50 }} alignItems="center" justifyContent="center">
                            <Text fontSize={16} colorTheme="background">
                                {isRegister ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'}
                            </Text>
                            <Button
                                textStyle={{ fontSize: 16, textDecorationLine: 'underline' }}
                                textColorTheme="background"
                                text={isRegister ? ' Đăng nhập' : ' Đăng ký'}
                                onPress={() => (isRegister ? setIsRegister(false) : setIsRegister(true))}
                            />
                        </Block>
                    </Block>
                </Block>
            </Screen>
        </Block>
    );
};
