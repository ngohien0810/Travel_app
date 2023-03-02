import { logout } from '@common';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { StackActions } from '@react-navigation/native';
import { selectAppProfile } from '@redux-selector/app';
import { WIDTH_SCREEN } from '@theme';
import { ColorDefault } from '@theme/color';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Input } from '../order/components/input';
import { userService } from './service';
const UserPassword = () => {
    // state
    const formMethod = useForm<any>();

    const userInfo: any = useSelector(selectAppProfile);

    const [loading, setLoading] = React.useState(false);

    // function
    const onSubmitKey = () => {
        formMethod.handleSubmit(onSubmit)();
    };

    const onSubmit = (data: any) => {
        if (data?.newPassword !== data?.reNewPassword) {
            Alert.alert('Mật khẩu mới không khớp');
        }

        setLoading(true);
        const dataSend = {
            Password: data?.newPassword,
            OldPassword: data?.password,
            id: userInfo?.id,
        };

        userService
            .changePassword(dataSend)
            .then((res) => {
                setLoading(false);
                if (!res?.status) return Alert.alert('Mật khẩu cũ không trùng khớp');

                // comfirm success and logout
                Alert.alert('Đổi mật khẩu thành công', 'Bạn có muốn đăng xuất', [
                    {
                        text: 'Không',
                    },
                    {
                        text: 'Đồng ý',
                        onPress: () => {
                            logout();
                        },
                    },
                ]);
            })
            .catch(() => {
                setLoading(false);
                Alert.alert('Mật khẩu cũ không trùng khớp');
            });
    };

    return (
        <Screen dialogLoading={loading} unsafe style={{ backgroundColor: '#f2f2f2' }}>
            {/* header */}
            <Header
                style={{ backgroundColor: '#fff', width: WIDTH_SCREEN }}
                headerText="Đổi mật khẩu"
                leftIcon
                iconLeft="black"
                iconLeftSize={30}
                titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: '600' }}
                onBack={() => StackActions.pop(1)}
            />
            <Block marginTop={2} flex={1} color="#fff">
                <Block padding={30}>
                    <FormProvider {...formMethod}>
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Mật khẩu cũ
                        </Text>
                        <Input<any> secureTextEntry placeholder="Nhập mật khẩu cũ" name="password" label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Mật khẩu mới
                        </Text>
                        <Input<any> secureTextEntry placeholder="Nhập mật khẩu mới" name="newPassword" label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Nhập lại mật khẩu mới
                        </Text>
                        <Input<any> secureTextEntry placeholder="Nhập lại mật khẩu mới" name="reNewPassword" label="" />

                        <TouchableOpacity
                            onPress={onSubmitKey}
                            style={[styles.button, { backgroundColor: ColorDefault.button }]}
                        >
                            <Text color="#fff" fontWeight="bold">
                                Cập nhật
                            </Text>
                        </TouchableOpacity>
                    </FormProvider>
                </Block>
            </Block>
        </Screen>
    );
};

export default UserPassword;

const styles = StyleSheet.create({
    button: {
        height: 44,
        backgroundColor: ColorDefault.button,
        width: '100%',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});
