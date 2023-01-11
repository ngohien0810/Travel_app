import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { images } from '@assets/image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_SCREEN } from '@navigation/screen-types';
import { navigate } from '@navigation/navigation-service';

const OrderScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <Screen unsafe>
            <Header
                children={
                    <Text textAlign="center" fontWeight="600" fontSize={16}>
                        Chọn số lượng
                    </Text>
                }
                leftIcon
                iconLeft="black"
                iconLeftSize={34}
            />
            <View style={styles.body}>
                <Text color="#5B5B5B">Vui lòng chọn số lượng người tham gia để tiến hành đặt tour</Text>
                <Block marginTop={40} borderRadius={16} direction="row" colorTheme="background">
                    <Block flex={1} padding={20}>
                        <Text fontSize={22} colorTheme="button" fontWeight="700">
                            Người lớn
                        </Text>
                        <Text lineHeight={40} color="#5B5B5B">
                            ( 120cm trở lên )
                        </Text>
                        <Block paddingVertical={5}>
                            <Text>Số lượng: 1</Text>
                        </Block>
                        <Text fontSize={20} colorTheme="button" fontWeight="700">
                            1.000.000 vnđ
                        </Text>
                    </Block>
                    <Block flex={1} position="relative">
                        <Image style={styles.image_card} source={images.not_children} />
                    </Block>
                </Block>

                <Block marginTop={60} borderRadius={16} direction="row" colorTheme="background">
                    <Block flex={1} position="relative">
                        <Image style={[styles.image_card, { left: 10 }]} source={images.children} />
                    </Block>
                    <Block flex={1} padding={20}>
                        <Text fontSize={22} colorTheme="button" fontWeight="700">
                            Người lớn
                        </Text>
                        <Text lineHeight={40} color="#5B5B5B">
                            ( 120cm trở lên )
                        </Text>
                        <Block paddingVertical={5}>
                            <Text>Số lượng: 1</Text>
                        </Block>
                        <Text fontSize={20} colorTheme="button" fontWeight="700">
                            500.000 vnđ
                        </Text>
                    </Block>
                </Block>
            </View>
            <Block colorTheme="card" borderTopWidth={1} borderTopColor="#eee" style={{ paddingBottom: insets.bottom }}>
                <Block direction="row">
                    <Block flex={1} paddingHorizontal={16} paddingTop={6}>
                        <Text lineHeight={30} color="#949494">
                            2 người
                        </Text>
                        <Text fontSize={16} colorTheme="button" fontWeight="700">
                            1.500.000đ
                        </Text>
                    </Block>
                    <TouchableOpacity
                        onPress={() => {
                            navigate(APP_SCREEN.CONTACT);
                        }}
                        style={{ flex: 1 }}
                    >
                        <Block alignItems="center" justifyContent="center" colorTheme="button" flex={1}>
                            <Text color="#fff" fontWeight="700">
                                Đặt hàng
                            </Text>
                        </Block>
                    </TouchableOpacity>
                </Block>
            </Block>
        </Screen>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 1,
        padding: 20,
    },
    image_card: {
        width: 134,
        height: 217,
        position: 'absolute',
        bottom: 0,
    },
});
