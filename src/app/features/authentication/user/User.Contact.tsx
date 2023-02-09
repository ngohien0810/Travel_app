import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { images } from '@assets/image';
import { WIDTH_SCREEN } from '@theme';
import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { navigationRef } from '@navigation/navigation-service';
import { StackActions } from '@react-navigation/native';

const UserContact = ({ navigation }: any) => {
    return (
        <Screen unsafe style={{ backgroundColor: '#f2f2f2' }}>
            {/* header */}
            <ImageBackground style={styles.header_image_bg} source={images.header_home_bg}>
                <Block position="absolute" top={10} zIndex={10}>
                    <Header
                        style={{ backgroundColor: 'transparent', width: WIDTH_SCREEN }}
                        headerText="Thông tin liên hệ"
                        leftIcon
                        iconLeftSize={30}
                        titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: '600', color: '#fff' }}
                        onBack={() => StackActions.pop(1)}
                    />
                </Block>
            </ImageBackground>
            <Block
                marginTop={-12}
                flex={1}
                color="#fff"
                padding={40}
                borderTopLeftRadius={14}
                borderTopRightRadius={14}
            >
                <Text textAlign="center" colorTheme="button" fontWeight="bold">
                    Số điện thoại
                </Text>
                <Block direction="row" paddingVertical={20} alignItems="center" justifyContent="center">
                    <VectorIcon style={{ paddingRight: 10 }} icon="airpods" colorTheme="button" />
                    <Text color="#777">0123456789</Text>
                </Block>
                <Text textAlign="center" colorTheme="button" fontWeight="bold">
                    Email
                </Text>
                <Block direction="row" paddingVertical={20} alignItems="center" justifyContent="center">
                    <VectorIcon style={{ paddingRight: 10 }} icon="box" colorTheme="button" />
                    <Text color="#777">nguyennhuy170400@gmail.com</Text>
                </Block>
            </Block>
        </Screen>
    );
};

export default UserContact;

const styles = StyleSheet.create({
    header_image_bg: {
        width: WIDTH_SCREEN,
        height: 280,
    },
});
