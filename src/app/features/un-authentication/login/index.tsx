import React from 'react';
import { Alert } from 'react-native';

import { dispatch, STORAGE_KEY_TOKEN } from '@common';
import { Block, Button, Screen, Text, Wallpaper } from '@components';
import { appActions } from '@redux-slice';

import { images } from '@assets/image';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { HEIGHT_SCREEN } from '@theme';
import { save } from '@utils/storage';
import FastImage from 'react-native-fast-image';
import { FormLogin } from './components/form-login';
import { FormRegister } from './components/form-register';
import { authService } from './service';

export const Login = () => {
    const [isRegister, setIsRegister] = React.useState(false);
    // const dispatch=useDispatch
    // function
    const onSubmit = (data: any) => {
        console.log('🚀 ~ file: index.tsx:24 ~ onSubmit ~ data', data);
        // dispatch(appActions.setAppTheme('dark'));
        // if (data.phone === '0987654321' && data.password === '123456') {
        //     dispatch(appActions.setToken('demo'));
        //     navigate(APP_SCREEN.HOME);
        // } else {
        // }
        if (isRegister) {
            authService
                .register({
                    Username: data.full_name,
                    Email: data.email,
                    Phone: data.phone,
                    Password: data.password,
                })
                .then(() => {
                    Alert.alert('Đăng ký tài khoản thành công');
                    setIsRegister(false);
                    // dispatch(appActions.setToken('demo'));
                    // navigate(APP_SCREEN.HOME);
                });
        } else {
            authService
                .login({
                    Phone: data.phone,
                    Password: data.password,
                })
                .then((res: any) => {
                    if (res?.msg) {
                        Alert.alert(res?.msg);
                    } else {
                        save(STORAGE_KEY_TOKEN, res.data.user?.id);
                        dispatch(appActions.setAppProfile(res.data.user));
                        setTimeout(() => {
                            navigate(APP_SCREEN.AUTHORIZE);
                        }, 1000);
                    }
                });
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
