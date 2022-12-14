import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Block, Button, Screen, Text } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useDispatch } from 'react-redux';
import { appActions } from '@redux-slice';
import { logout } from '@common';
import { images } from '@assets/image';
import { VectorIcon } from '@assets/vector-icon/vector-icon';

const UserScreen = () => {
    const dispatch = useDispatch();

    return (
        <Screen unsafe style={{ backgroundColor: '#fff' }}>
            {/* block thì căn giữ 2 chiều */}
            {/* block -><View left -> <View right */}
            <Block
                direction="row"
                justifyContent="center"
                alignItems="center"
                paddingTop={100}
                borderBottomLeftRadius={180}
                borderBottomRightRadius={180}
                style={{ backgroundColor: '#53B7B1', paddingVertical: 38, paddingHorizontal: 68 }}
            >
                <Block>
                    <Image style={styles.avatar} source={images.avatar} />
                </Block>
                <Block style={{ paddingLeft: 20 }}>
                    <Text fontSize={20} lineHeight={40} color="#fff">
                        Lê Tiến Dũng
                    </Text>
                    <Text fontSize={14} color="#f3f3f3">
                        0987654321
                    </Text>
                </Block>
            </Block>
            <Block padding={23}>
                <Block
                    marginBottom={40}
                    marginTop={30}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Block direction="row" alignItems="center">
                        <VectorIcon color={'#15898F'} icon="information" />
                        <Text fontSize={14} color="#6B6B6B" style={{ paddingLeft: 23 }}>
                            Thông tin cá nhân
                        </Text>
                    </Block>
                    <Block paddingRight={7}>
                        <VectorIcon color={'#15898F'} size={18} icon="arrow_right_2" />
                    </Block>
                </Block>
                <Block marginBottom={40} direction="row" alignItems="center" justifyContent="space-between">
                    <Block direction="row" alignItems="center">
                        <VectorIcon color={'#15898F'} icon="card" />
                        <Text fontSize={14} color="#6B6B6B" style={{ paddingLeft: 23 }}>
                            Thông tin liên hệ
                        </Text>
                    </Block>
                    <Block paddingRight={7}>
                        <VectorIcon color={'#15898F'} size={18} icon="arrow_right_2" />
                    </Block>
                </Block>
                <Block marginBottom={40} direction="row" alignItems="center" justifyContent="space-between">
                    <Block direction="row" alignItems="center">
                        <VectorIcon color={'#15898F'} icon="ticket" />
                        <Text fontSize={14} color="#6B6B6B" style={{ paddingLeft: 23 }}>
                            Tour của tôi
                        </Text>
                    </Block>
                    <Block paddingRight={7}>
                        <VectorIcon color={'#15898F'} size={18} icon="arrow_right_2" />
                    </Block>
                </Block>
                <Block marginBottom={40} direction="row" alignItems="center" justifyContent="space-between">
                    <Block direction="row" alignItems="center">
                        <VectorIcon color={'#15898F'} icon="lock" />
                        <Text fontSize={14} color="#6B6B6B" style={{ paddingLeft: 23 }}>
                            Đổi mật khẩu
                        </Text>
                    </Block>
                    <Block paddingRight={7}>
                        <VectorIcon color={'#15898F'} size={18} icon="arrow_right_2" />
                    </Block>
                </Block>
                <TouchableOpacity
                    onPress={() => {
                        logout();
                    }}
                >
                    <Block marginBottom={40} direction="row" alignItems="center" justifyContent="space-between">
                        <Block direction="row" alignItems="center">
                            <VectorIcon color={'#15898F'} icon="logout" />
                            <Text fontSize={14} color="#6B6B6B" style={{ paddingLeft: 23 }}>
                                Đăng xuất
                            </Text>
                        </Block>
                        {/* <Block paddingRight={7}>
                    <VectorIcon color={'#15898F'} size={18} icon="arrow_right_2" />
                </Block> */}
                    </Block>
                </TouchableOpacity>
            </Block>
        </Screen>
    );
};

export default UserScreen;

const styles = StyleSheet.create({
    avatar: {
        width: 80,
        height: 80,
    },
    infor: {},
});
