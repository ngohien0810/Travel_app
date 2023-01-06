import React, { memo } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';

import { images } from '@assets/image';
import { Block, Screen, Text, TextField } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { WIDTH_SCREEN } from '@theme';
import { Rating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { homeService } from './service';
import moment from 'moment';
import CardTour from '../../../components/CardTour';

const HomeComponent = () => {
    const [hotTour, setHotTour] = React.useState([]);
    console.log('🚀 ~ file: index.tsx:19 ~ HomeComponent ~ hotTour', hotTour);

    const insets = useSafeAreaInsets();

    React.useEffect(() => {
        homeService.getHotTour().then((res: any) => {
            console.log('🚀 ~ file: index.tsx:27 ~ homeService.getHotTour ~ res', res);
            setHotTour(res.data);
        });
    }, []);

    // render
    return (
        <Screen scroll unsafe style={{ backgroundColor: '#f2f2f2', paddingBottom: 140 }}>
            {/* header */}
            <ImageBackground style={styles.header_image_bg} source={images.header_home_bg}>
                <Block direction="row" style={{ marginTop: 10 + insets.top }}>
                    <View style={[styles.search_tour]}>
                        <TextField
                            unActiveTintLabelColor="#0C656A"
                            unActiveTintBorderColor="#0C656A"
                            typeInput="flat"
                            label={'Bạn muốn đi đâu?'}
                        />
                        <Block direction="row" alignItems="center" style={styles.calendar_home}>
                            <Image style={styles.noti_icon} source={images.calendar_home} />
                            <Text color="#0C656A" style={{ paddingLeft: 8 }} text="Từ ngày đến ngày" />
                        </Block>
                    </View>

                    <TouchableOpacity style={[styles.notifi_tour]}>
                        <Image style={styles.noti_icon} source={images.noti} />
                    </TouchableOpacity>
                </Block>
            </ImageBackground>
            <View style={styles.wrapper_tour_special}>
                <Image style={styles.header_gradient_bg} source={images.header_gradient_bg} />
                {/* <LinearGradient
                    colors={['rgba(242, 242, 242, .01)', '#F2F2F2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.linear_header}
                /> */}

                <Text style={styles.text_tour_special}>Tour nổi bật</Text>
                <TouchableOpacity onPress={() => navigate(APP_SCREEN.SEARCH_RESULT)}>
                    <Text style={styles.text_more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ paddingHorizontal: 20, flexGrow: 0 }}
                data={hotTour}
                keyExtractor={(record: any) => record?.id}
                renderItem={({ item }: any) => (
                    <ImageBackground style={styles.tour_image} source={{ uri: item?.ImageUrl }}>
                        <LinearGradient
                            colors={['rgba(0,0,0,.01)', 'rgba(0,0,0,.55)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.wrapper_time_tour}
                        >
                            <Text style={styles.title_tour}>{item?.Title}</Text>
                            <View style={styles.time_tour}>
                                <Text style={styles.text_time}>4 ngày 3 đêm</Text>
                                <Text style={styles.text_calendar}>
                                    {moment(item?.CreatedDate).format('DD/MM/YYYY')}
                                </Text>
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
            <View style={[styles.wrapper_tour_special, { marginTop: 40 }]}>
                <Text style={styles.text_tour_special}>Các tour du lịch đã xem</Text>
                <TouchableOpacity>
                    <Text style={styles.text_more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            <CardTour title="demo" start_tour="12/12/2022" price="99.999" />
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
    // linear_header: {
    //     position: 'absolute',
    //     top: -80,
    //     right: 0,
    //     left: 0,
    //     height: 140,
    // },
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
    header_gradient_bg: {
        bottom: -100,
        position: 'absolute',
    },
    search_tour: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 16,
        flex: 1,
        marginHorizontal: 30,
        borderRadius: 12,
    },
    notifi_tour: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignSelf: 'flex-start',
        padding: 15,
        paddingLeft: 25,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        zIndex: 999,
    },
    noti_icon: {
        width: 19,
        height: 20,
    },
    calendar_home: {
        paddingTop: 15,
    },
});

export const Home = memo(HomeComponent, isEqual);
