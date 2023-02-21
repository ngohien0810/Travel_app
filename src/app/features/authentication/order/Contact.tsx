import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { FormContactType } from '@model/contact';
import { Input } from './components/input';
import { FormProvider, useForm } from 'react-hook-form';
import { ColorDefault } from '@theme/color';
import { orderService } from './service';
import { useSelector } from 'react-redux';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';

const ContactScreen = ({ route }: any) => {
    const dataRoute = route.params;
    // state
    const formMethod = useForm<FormContactType>();
    const state: any = useSelector((state: any) => {
        return state;
    });

    // function
    const onSubmitKey = () => {
        formMethod.handleSubmit(onSubmit)();
    };

    const onSubmit = (data: any) => {
        orderService
            .createContact({
                Name: data?.name,
                Phone: data?.phone,
                Email: data?.email,
                Note: data?.note,
                OrderID: 0,
            })
            .then((res: any) => {
                orderService
                    .createOrder({
                        CustomerID: state?.app?.profile?.id,
                        Code: 'ORDER-' + Math.floor(1000 + Math.random() * 9000),
                        CodeTour: dataRoute?.Code,
                        AdultTicket: dataRoute?.ticketAdult,
                        ChildTicket: dataRoute?.ticketChildren,
                        PaymentMethod: 1,
                        TotalPrice: dataRoute?.total,
                        TourID: dataRoute?.id,
                        StatusOrder: 0,
                        ContactID: res?.data?.data?.id,
                    })
                    .then(() => {
                        Alert.alert('Thông báo', 'Đặt vé thành công', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigate(APP_SCREEN.TOUR);
                                },
                            },
                        ]);
                    });
            });
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
                        <Input name="name" label="Nhập họ và tên" />
                        <Text style={{ marginBottom: 5 }}>Số điện thoại</Text>
                        <Input name="phone" label="0912345***" />
                        <Text style={{ marginBottom: 5 }}>Email</Text>
                        <Input name="email" label="NguyenVanA@gmail.com" />
                        <Text style={{ marginBottom: 5 }}>Các yêu cầu khác</Text>
                        <Input name="note" label="Nhập yêu cầu của bạn" />
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
