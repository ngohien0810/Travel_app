import { ImageBackground, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Block, Icon, Screen, Text } from '@components';
import { images } from '@assets/image';
import Header from '../../../layouts/Header';
import { ICONS } from '@assets/vector-icon/icon-name';
import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Rating } from 'react-native-ratings';
import { HEIGHT_SCREEN } from '@theme';
import LinearGradient from 'react-native-linear-gradient';

const TourDetailScreen = () => {
    return (
        <Screen unsafe scroll style={{ backgroundColor: '#fff' }}>
            <ImageBackground style={styles.header_tour_detail} source={images.detail_tour}>
                <Header
                    style={{
                        backgroundColor: 'transparent',
                        marginBottom: 10,
                        borderBottomColor: '#fff',
                    }}
                    leftIconStyled={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 999,
                    }}
                    rightIconStyled={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 999,
                        height: 46,
                        width: 46,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    iconLeft="#222"
                    leftIcon
                    rightIcon="heart"
                />
                <Block direction="row" style={{ marginBottom: -16 }} justifyContent="space-between">
                    <Block
                        direction="row"
                        alignItems="center"
                        style={{
                            backgroundColor: '#fff',
                            borderTopRightRadius: 18,
                            borderBottomRightRadius: 18,
                            paddingHorizontal: 20,
                        }}
                    >
                        <VectorIcon icon="eye" colorTheme="button" />
                        <Text colorTheme="button">1000</Text>
                    </Block>
                    <Block
                        direction="row"
                        alignItems="center"
                        style={{
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 18,
                            borderBottomLeftRadius: 18,
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text colorTheme="button">4.5/5</Text>
                        <Rating startingValue={5} imageSize={16} style={{ paddingVertical: 10 }} />
                    </Block>
                </Block>
            </ImageBackground>
            <Block paddingHorizontal={20} paddingVertical={20}>
                <Text fontSize={20} color="#15898F">
                    Tour du lịch ABC XYZ gì đó sẽ hiển thị 2 dòng ở đây Tour du lịch ABC XYZ gì đó sẽ hiển thị 2 dòng ở
                    đây
                </Text>
            </Block>
            <Block direction="row" alignItems="center" paddingHorizontal={20}>
                <View style={{ height: 2, backgroundColor: '#D9D9D9', flex: 1 }} />
                <Text fontSize={16} style={{ paddingHorizontal: 20 }}>
                    Thông tin chi tiết
                </Text>
                <View style={{ height: 2, backgroundColor: '#D9D9D9', flex: 1 }} />
            </Block>
            <Block paddingHorizontal={20} paddingTop={10}>
                <Text textAlign="justify">
                    Lorem ipsum dolor sit amet consectetur. Vestibulum arcu sapien nulla odio. Ut vel ligula eu id sed
                    varius commodo sapien pretium. Morbi enim sit euismod turpis velit id neque gravida amet. Ipsum
                    massa sapien volutpat cursus lacus ut a lorem facilisis. Orci nisi ultrices ornare cum augue
                    tristique eget eget neque. Sit commodo ultrices amet maecenas mattis vulputate at. In dolor
                    fermentum non sit. Elementum cursus ultrices massa et aliquam enim. Ultrices nibh justo pellentesque
                    phasellus fusce sed.
                </Text>
                <Block direction="row" alignItems="center" marginTop={10} justifyContent="center">
                    <Text style={{ marginRight: 10 }}>Xem thêm</Text>
                    <VectorIcon icon="arrow_down_1" />
                </Block>
            </Block>
            <Block direction="row" marginTop={10} marginBottom={10} alignItems="center" paddingHorizontal={20}>
                <View style={{ height: 2, backgroundColor: '#D9D9D9', flex: 1 }} />
            </Block>

            <Block paddingHorizontal={20}>
                <TouchableOpacity style={styles.button}>
                    <Text>Lộ trình gợi ý</Text>
                </TouchableOpacity>
            </Block>

            <LinearGradient
                colors={['#309A94', '#53B7B1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    height: HEIGHT_SCREEN,
                    marginTop: 30,
                    padding: 20,
                    paddingTop: 30,
                }}
            >
                <Text fontSize={18} fontWeight="600" color="#fff">
                    Đánh giá
                </Text>

                <Block alignItems="center" marginTop={20} direction="row" justifyContent="space-between">
                    <Block direction="row" alignItems="center">
                        <Text fontSize={40} color="#fff">
                            5.0
                        </Text>
                        <View style={{ marginLeft: 10 }}>
                            <Rating startingValue={5} imageSize={18} style={{ paddingVertical: 6 }} />
                            <Text color="#e5d5d5">(128 đánh giá)</Text>
                        </View>
                    </Block>
                    <Block
                        style={{
                            borderWidth: 1,
                            borderColor: '#fff',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 10,
                        }}
                        alignItems="center"
                        direction="row"
                    >
                        <Text style={{ marginRight: 10, fontSize: 20 }} color="#fff">
                            +
                        </Text>
                        <Text color="#fff">Đánh giá</Text>
                    </Block>
                </Block>
                <Block marginTop={30}>
                    <Block
                        style={{
                            backgroundColor: '#fff',
                        }}
                        padding={20}
                        borderRadius={20}
                    >
                        <Block direction="row" alignItems="center" justifyContent="space-between">
                            <Block direction="row" alignItems="center">
                                <Image source={images.avatar} style={{ width: 50, height: 50 }} />
                                <Block marginLeft={10} alignItems="center">
                                    <Text>Lê Tiến Dũng</Text>
                                    <View style={styles.wrapper_clock_style}>
                                        <Image style={styles.clock_style} source={images.clock} />
                                        <Text style={{ marginLeft: 6 }}>12/12/2022</Text>
                                    </View>
                                </Block>
                            </Block>
                            <Rating startingValue={5} imageSize={18} style={{ paddingVertical: 6 }} />
                        </Block>
                        <Block paddingTop={20}>
                            <Text>
                                Đây là một nhận xét của khách hàng nào đó. Đây là một nhận xét của khách hàng nào đó.
                                Đây là một nhận xét của khách hàng nào đó. Đây là một nhận xét của khách hàng nào đó.
                                Đây là một nhận xét của khách hàng nào đó.
                            </Text>
                        </Block>
                    </Block>
                </Block>
                <Block marginTop={15}>
                    <Block
                        style={{
                            backgroundColor: '#fff',
                        }}
                        padding={20}
                        borderRadius={20}
                    >
                        <Block direction="row" alignItems="center" justifyContent="space-between">
                            <Block direction="row" alignItems="center">
                                <Image source={images.avatar} style={{ width: 50, height: 50 }} />
                                <Block marginLeft={10} alignItems="center">
                                    <Text>Lê Tiến Dũng</Text>
                                    <View style={styles.wrapper_clock_style}>
                                        <Image style={styles.clock_style} source={images.clock} />
                                        <Text style={{ marginLeft: 6 }}>12/12/2022</Text>
                                    </View>
                                </Block>
                            </Block>
                            <Rating startingValue={5} imageSize={18} style={{ paddingVertical: 6 }} />
                        </Block>
                        <Block paddingTop={20}>
                            <Text>
                                Đây là một nhận xét của khách hàng nào đó. Đây là một nhận xét của khách hàng nào đó.
                                Đây là một nhận xét của khách hàng nào đó. Đây là một nhận xét của khách hàng nào đó.
                                Đây là một nhận xét của khách hàng nào đó.
                            </Text>
                        </Block>
                    </Block>
                </Block>
                <Block marginTop={15}>
                    <Block
                        style={{
                            backgroundColor: '#fff',
                        }}
                        padding={20}
                        borderRadius={20}
                    >
                        <Block direction="row" alignItems="center" justifyContent="space-between">
                            <Block direction="row" alignItems="center">
                                <Image source={images.avatar} style={{ width: 50, height: 50 }} />
                                <Block marginLeft={10} alignItems="center">
                                    <Text>Lê Tiến Dũng</Text>
                                    <View style={styles.wrapper_clock_style}>
                                        <Image style={styles.clock_style} source={images.clock} />
                                        <Text style={{ marginLeft: 6 }}>12/12/2022</Text>
                                    </View>
                                </Block>
                            </Block>
                            <Rating startingValue={5} imageSize={18} style={{ paddingVertical: 6 }} />
                        </Block>
                        <Block paddingTop={20}>
                            <Text>
                                Đây là một nhận xét của khách hàng nào đó. Đây là một nhận xét của khách hàng nào đó.
                                Đây là một nhận xét của khách hàng nào đó. Đây là một nhận xét của khách hàng nào đó.
                                Đây là một nhận xét của khách hàng nào đó.
                            </Text>
                        </Block>
                    </Block>
                </Block>
                <Block direction="row" marginTop={20} justifyContent="center">
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 40,
                            borderRadius: 14,
                            borderColor: '#fff',
                        }}
                    >
                        <Text color="#fff" fontWeight="700">
                            Xem tất cả
                        </Text>
                    </TouchableOpacity>
                </Block>
            </LinearGradient>
        </Screen>
    );
};

export default TourDetailScreen;

const styles = StyleSheet.create({
    header_tour_detail: {
        height: 500,
        justifyContent: 'space-between',
    },
    button: {
        height: 44,
        backgroundColor: '#FFC656',
        width: '100%',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper_clock_style: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 6,
    },
    clock_style: {
        height: 17,
        width: 17,
    },
});
