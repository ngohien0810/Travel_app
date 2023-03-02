import { images } from '@assets/image';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { StackActions } from '@react-navigation/native';
import { selectAppProfile } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { WIDTH_SCREEN } from '@theme';
import { ColorDefault } from '@theme/color';
import axios from 'axios';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { showMessage } from 'react-native-flash-message';
// eslint-disable-next-line import/no-extraneous-dependencies
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../order/components/input';
import { userService } from './service';

const UserProfile = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [gender, setGender] = React.useState<any>();
    // state
    const formMethod = useForm<any>();
    const state: any = useSelector((state: any) => {
        return state;
    });
    const userInfo: any = useSelector(selectAppProfile);
    const [avatar, setAvatar] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    // function
    const onSubmitKey = () => {
        formMethod.handleSubmit(onSubmit)();
    };

    const onSubmit = (data: any) => {
        const dataSend = {
            Name: data?.name,
            Email: data?.email,
            Phone: data?.phone,
            Gender: gender,
            Address: data?.address,
            Avatar: avatar,
            id: userInfo?.id,
        };

        userService.updateProfile(dataSend).then((res: any) => {
            dispatch(
                appActions.setAppProfile({
                    ...userInfo,
                    ...dataSend,
                })
            );
            showMessage({
                message: 'Cập nhật thành công',
                titleStyle: { textAlign: 'center' },
                type: 'success',
            });
        });
    };

    React.useEffect(() => {
        setAvatar(userInfo?.Avatar);
        formMethod.setValue('name', state?.app?.profile?.Name);
        formMethod.setValue('phone', state?.app?.profile?.Phone);
        formMethod.setValue('email', state?.app?.profile?.Email);
        formMethod.setValue('address', state?.app?.profile?.Address);
        setGender(state?.app?.profile?.Gender);
    }, [state?.profile]);

    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            async (response: any) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    setLoading(true);

                    // Create form data with image data to upload
                    const formData = new FormData();
                    formData.append('file', {
                        uri: response?.assets?.[0]?.uri?.replace('file://', ''),
                        type: response?.assets?.[0]?.type,
                        name: response?.assets?.[0]?.name || 'image.jpg',
                    });
                    formData.append('upload_preset', 'breqd0hm');
                    formData.append('cloud_name', 'hunre');

                    fetch('https://api.cloudinary.com/v1_1/hunre/image/upload', {
                        method: 'POST',
                        body: formData,
                    })
                        .then((res) => res.json())
                        .then((data: any) => {
                            setAvatar(data?.secure_url);
                            setLoading(false);
                        });
                }
            }
        );
    };

    return (
        <Screen dialogLoading={loading} unsafe style={{ backgroundColor: '#f2f2f2' }}>
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
                    <FastImage style={styles.avatar} resizeMode="cover" source={{ uri: avatar }} />
                    <TouchableOpacity onPress={() => pickImage()} style={styles.btnCamera}>
                        <FastImage style={styles.cameraIcon} resizeMode="cover" source={images.camera} />
                    </TouchableOpacity>
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
                        <Input<any> disabled name="phone" containerStyle={{ backgroundColor: '#ccc' }} label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Email
                        </Text>
                        <Input<any> name="email" label="" />
                        <Text color="#999" style={{ marginBottom: 10, fontWeight: '500' }}>
                            Địa chỉ
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
    btnCamera: {
        backgroundColor: ColorDefault.button,
        position: 'absolute',
        right: 0,
        bottom: 30,
        height: 35,
        width: 35,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        height: 20,
        width: 20,
    },
});
