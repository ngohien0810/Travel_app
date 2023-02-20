import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { images } from '@assets/image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_SCREEN } from '@navigation/screen-types';
import { navigate } from '@navigation/navigation-service';
import { currencyFormat } from '@common';

const OrderScreen = ({ route }: any) => {
    const data = route?.params;
    const insets = useSafeAreaInsets();
    const [ticketAdult, setTicketAdult] = React.useState(1);
    const [ticketChildren, setTicketChildren] = React.useState(1);

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
                        <Block direction="row" marginTop={12}>
                            <Block
                                direction="row"
                                borderWidth={1}
                                borderColorTheme="button"
                                borderRadius={8}
                                style={{ flexGrow: 0 }}
                            >
                                <Block
                                    height={44}
                                    width={44}
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRightWidth={1}
                                    borderRightColor="#309A94"
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            if (ticketAdult > 1) {
                                                setTicketAdult(ticketAdult - 1);
                                            }
                                        }}
                                    >
                                        <Text fontSize={18}>-</Text>
                                    </TouchableOpacity>
                                </Block>
                                <Block
                                    height={44}
                                    width={44}
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRightWidth={1}
                                    borderRightColor="#309A94"
                                >
                                    <Text fontSize={18}>{ticketAdult}</Text>
                                </Block>
                                <Block height={44} width={44} justifyContent="center" alignItems="center">
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            setTicketAdult(ticketAdult + 1);
                                        }}
                                    >
                                        <Text fontSize={18}>+</Text>
                                    </TouchableOpacity>
                                </Block>
                            </Block>
                        </Block>
                        <Text lineHeight={40} color="#5B5B5B">
                            ( 120cm trở lên )
                        </Text>

                        <Text fontSize={20} colorTheme="button" fontWeight="700">
                            {currencyFormat(data?.TourPrice)} vnđ
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
                            Trẻ nhỏ
                        </Text>
                        <Block direction="row" marginTop={12}>
                            <Block
                                direction="row"
                                borderWidth={1}
                                borderColorTheme="button"
                                borderRadius={8}
                                style={{ flexGrow: 0 }}
                            >
                                <Block
                                    height={44}
                                    width={44}
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRightWidth={1}
                                    borderRightColor="#309A94"
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            if (ticketChildren > 1) {
                                                setTicketChildren(ticketChildren - 1);
                                            }
                                        }}
                                    >
                                        <Text fontSize={18}>-</Text>
                                    </TouchableOpacity>
                                </Block>
                                <Block
                                    height={44}
                                    width={44}
                                    justifyContent="center"
                                    alignItems="center"
                                    borderRightWidth={1}
                                    borderRightColor="#309A94"
                                >
                                    <Text fontSize={18}>{ticketChildren}</Text>
                                </Block>
                                <Block height={44} width={44} justifyContent="center" alignItems="center">
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            setTicketChildren(ticketChildren + 1);
                                        }}
                                    >
                                        <Text fontSize={18}>+</Text>
                                    </TouchableOpacity>
                                </Block>
                            </Block>
                        </Block>
                        <Text lineHeight={40} color="#5B5B5B">
                            ( Thấp hơn 120cm )
                        </Text>
                        <Text fontSize={20} colorTheme="button" fontWeight="700">
                            {currencyFormat((data?.TourPrice / 2).toFixed(0))} vnđ
                        </Text>
                    </Block>
                </Block>
            </View>
            <Block colorTheme="card" borderTopWidth={1} borderTopColor="#eee" style={{ paddingBottom: insets.bottom }}>
                <Block direction="row">
                    <Block flex={1} paddingHorizontal={16} paddingTop={6}>
                        <Text lineHeight={30} color="#949494">
                            {ticketAdult + ticketChildren} người
                        </Text>
                        <Text fontSize={16} colorTheme="button" fontWeight="700">
                            {currencyFormat(
                                data?.TourPrice * ticketAdult + (data?.TourPrice / 2).toFixed(0) * ticketChildren
                            )}{' '}
                            vnđ
                        </Text>
                    </Block>
                    <TouchableOpacity
                        onPress={() => {
                            navigate(APP_SCREEN.CONTACT, {
                                ticketAdult: ticketAdult,
                                ticketChildren: ticketChildren,
                                total:
                                    data?.TourPrice * ticketAdult + (data?.TourPrice / 2).toFixed(0) * ticketChildren,
                                ...data,
                            });
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
