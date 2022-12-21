import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import { Block, Icon, Screen, Text } from '@components';
import { images } from '@assets/image';
import Header from '../../../layouts/Header';
import { ICONS } from '@assets/vector-icon/icon-name';
import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Rating } from 'react-native-ratings';

const TourDetailScreen = () => {
    return (
        <Screen unsafe scroll style={{ flex: 1, backgroundColor: '#fff' }}>
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
                <View style={{ height: 2, backgroundColor: '#15898F', flex: 1 }} />
                <Text fontSize={16} style={{ paddingHorizontal: 20 }}>
                    Thông tin chi tiết
                </Text>
                <View style={{ height: 2, backgroundColor: '#15898F', flex: 1 }} />
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
        </Screen>
    );
};

export default TourDetailScreen;

const styles = StyleSheet.create({
    header_tour_detail: {
        height: 500,
        justifyContent: 'space-between',
    },
});
