import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { images } from '@assets/image';
import { WIDTH_SCREEN } from '@theme';
import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { navigationRef } from '@navigation/navigation-service';
import { StackActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Input } from '../order/components/input';
import { ColorDefault } from '@theme/color';

const UserProfile = ({ navigation }: any) => {
    const [gender, setGender] = React.useState<any>();
    // state
    const formMethod = useForm<any>();
    const state: any = useSelector((state: any) => {
        return state;
    });

    // function
    const onSubmitKey = () => {
        formMethod.handleSubmit(onSubmit)();
    };

    const onSubmit = (data: any) => {};

    React.useEffect(() => {
        console.log('🚀 ~ file: User.Profile.tsx:31 ~ React.useEffect ~ state?.profile?.name:', state?.app?.profile);
        formMethod.setValue('name', state?.app?.profile?.Name);
        formMethod.setValue('phone', state?.app?.profile?.Phone);
        formMethod.setValue('email', state?.app?.profile?.Email);
        formMethod.setValue('address', state?.app?.profile?.Address);
        setGender(state?.app?.profile?.Gender);
    }, [state?.profile]);

    return (
        <Screen unsafe style={{ backgroundColor: '#f2f2f2' }}>
            {/* header */}
            <Header
                style={{ backgroundColor: '#fff', width: WIDTH_SCREEN }}
                headerText="Thông tin cá nhân"
                leftIcon
                iconLeft="black"
                iconLeftSize={30}
                titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: '600' }}
                onBack={() => StackActions.pop(1)}
            />
            <Block flex={1} color="#fff">
                <Block paddingVertical={20} style={{ alignSelf: 'center' }}>
                    <FastImage style={styles.avatar} resizeMode="cover" source={{ uri: 'https://i.pravatar.cc/500' }} />
                    {/* <TouchableOpacity style={styles.btnCamera}>
                                        <FastImage
                                            style={styles.cameraIcon}
                                            resizeMode="cover"
                                            source={assets.images.camera}
                                        />
                                    </TouchableOpacity> */}
                </Block>
                <Block paddingHorizontal={30}>
                    <FormProvider {...formMethod}>
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Họ tên
                        </Text>
                        <Input<any> name="name" label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Số điện thoại
                        </Text>
                        <Input<any> name="phone" label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Email
                        </Text>
                        <Input<any> name="email" label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Các yêu cầu khác
                        </Text>
                        <Input<any> name="address" label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Giới tính
                        </Text>
                        <Block direction="row">
                            <Block flex={1}>
                                <TouchableOpacity onPress={() => setGender(1)}>
                                    <Block
                                        justifyContent="center"
                                        alignItems="center"
                                        borderWidth={1}
                                        borderColorTheme={gender == 1 ? 'button' : 'border'}
                                        paddingVertical={13}
                                        borderRadius={10}
                                        marginLeft={4}
                                        marginRight={4}
                                    >
                                        <Text>Nam</Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                            <Block flex={1}>
                                <TouchableOpacity onPress={() => setGender(0)}>
                                    <Block
                                        justifyContent="center"
                                        alignItems="center"
                                        borderWidth={1}
                                        paddingVertical={13}
                                        borderRadius={10}
                                        marginLeft={4}
                                        marginRight={4}
                                        borderColorTheme={gender == 0 ? 'button' : 'border'}
                                    >
                                        <Text>Nữ</Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                        </Block>
                        <TouchableOpacity
                            // onPress={() => {
                            //     navigate(APP_SCREEN.ORDER, detailTour);
                            // }}
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

export default UserProfile;

const styles = StyleSheet.create({
    avatar: {
        height: 140,
        width: 140,
        borderRadius: 100,
        marginBottom: 10,
    },
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
