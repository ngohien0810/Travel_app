import React, { memo } from 'react';
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';

import { images } from '@assets/image';
import { WIDTH_SCREEN } from '@theme';
import { Screen, Text } from '@components';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

const HomeComponent = () => {
    // render
    return (
        <Screen scroll unsafe style={{ backgroundColor: '#f2f2f2' }}>
            {/* header */}
            <ImageBackground style={styles.header_image_bg} source={images.header_home_bg}>
                <Text>helo</Text>
            </ImageBackground>
            <View style={styles.wrapper_tour_special}>
                <LinearGradient
                    colors={['rgba(242, 242, 242, .01)', '#F2F2F2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.linear_header}
                />

                <Text style={styles.text_tour_special}>Tour nổi bật</Text>
                <TouchableOpacity>
                    <Text style={styles.text_more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ paddingHorizontal: 20, flexGrow: 0 }}
                data={['1', '2']}
                keyExtractor={(record) => record}
                renderItem={() => (
                    <ImageBackground style={styles.tour_image} source={images.tour_image}>
                        <LinearGradient
                            colors={['rgba(0,0,0,.01)', 'rgba(0,0,0,.55)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.wrapper_time_tour}
                        >
                            <Text style={styles.title_tour}>Tour du lịch ABC XYZ gì đó sẽ hiển thị 2 dòng ở đây</Text>
                            <View style={styles.time_tour}>
                                <Text style={styles.text_time}>4 ngày 3 đêm</Text>
                                <Text style={styles.text_calendar}>26/12/2022</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.wrapper_tour_special}>
                <Text style={styles.text_tour_special}>Tin tức du lịch</Text>
                <TouchableOpacity>
                    <Text style={styles.text_more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
                <Swiper
                    activeDotColor="rgba(33, 168, 176, 1)"
                    activeDotStyle={{ paddingHorizontal: 12 }}
                    dotStyle={{ paddingHorizontal: 2 }}
                    dotColor="#C9C9C9"
                    autoplay
                    paginationStyle={{
                        bottom: -25,
                    }}
                >
                    <ImageBackground style={styles.slide} source={images.slide} />
                    <ImageBackground style={styles.slide} source={images.slide} />
                    <ImageBackground style={styles.slide} source={images.slide} />
                </Swiper>
            </View>
            <View style={styles.wrapper_tour_special}>
                <Text style={styles.text_tour_special}>Tin tức du lịch</Text>
                <TouchableOpacity>
                    <Text style={styles.text_more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    header_image_bg: {
        width: WIDTH_SCREEN,
        height: 280,
    },
    wrapper_tour_special: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'transparent',
    },
    text_tour_special: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0C656A',
    },
    text_more: {
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    tour_image: {
        width: 260,
        height: 320,
        marginRight: 12,
        borderRadius: 16,
        resizeMode: 'cover',
        overflow: 'hidden',
        flex: 1,
        justifyContent: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title_tour: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    wrapper_time_tour: {
        padding: 20,
    },
    time_tour: {
        paddingTop: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text_time: {
        fontSize: 14,
        fontWeight: '600',
        color: '#c9c9c9',
    },
    text_calendar: {
        fontSize: 14,
        fontWeight: '600',
        color: '#c9c9c9',
    },
    linear_header: {
        position: 'absolute',
        top: -80,
        right: 0,
        left: 0,
        height: 140,
    },
    wrapper: {
        flex: 1,
        height: 200,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 20,
    },
});

export const Home = memo(HomeComponent, isEqual);
