import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { FormContactType } from '@model/contact';
import { Input } from './components/input';
import { FormProvider, useForm } from 'react-hook-form';
import { ColorDefault } from '@theme/color';

const ContactScreen = () => {
    // state
    const formMethod = useForm<FormContactType>();

    // function
    const onSubmitKey = () => {
        formMethod.handleSubmit(onSubmit)();
    };

    const onSubmit = (data: any) => {
        console.log('🚀 ~ file: contact.tsx:19 ~ onSubmit ~ data', data);
    };

    return (
        <Screen unsafe>
            <Header
                children={
                    <Text textAlign="center" fontWeight="600" fontSize={16}>
                        Thông tin liên hệ
                    </Text>
                }
                leftIcon
                iconLeft="black"
                iconLeftSize={34}
            />
            <View style={styles.body}>
                <Text textAlign="center">
                    Quý khách vui lòng nhập thông tin yêu cầu. Nhân viên sẽ liên hệ lại ngay sau ít phút.
                </Text>
                <Block>
                    <FormProvider {...formMethod}>
                        <Text style={{ marginBottom: 5 }}>Họ tên</Text>
                        <Input<FormContactType> name="name" label="Nhập họ và tên" />
                        <Text style={{ marginBottom: 5 }}>Số điện thoại</Text>
                        <Input<FormContactType> name="phone" label="0912345***" />
                        <Text style={{ marginBottom: 5 }}>Email</Text>
                        <Input<FormContactType> name="email" label="NguyenVanA@gmail.com" />
                        <Text style={{ marginBottom: 5 }}>Các yêu cầu khác</Text>
                        <Input<FormContactType> name="note" label="Nhập yêu cầu của bạn" />
                        <TouchableOpacity onPress={onSubmitKey} style={styles.button}>
                            <Text color="#fff">Xác nhận</Text>
                        </TouchableOpacity>
                    </FormProvider>
                </Block>
            </View>
        </Screen>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 1,
        padding: 20,
    },
    button: {
        height: 44,
        backgroundColor: ColorDefault.button,
        width: '100%',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
});
