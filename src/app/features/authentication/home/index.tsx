import React, { memo } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';

import { images } from '@assets/image';
import { Block, Icon, Screen, Text, TextField } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { selectAppFavouries, selectAppProfile } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { WIDTH_SCREEN } from '@theme';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import CardTour from '../../../components/CardTour';
import { tourService } from '../tour/service';
import { homeService } from './service';
import { ColorDefault } from '@theme/color';
import { useDebounce } from '@hooks';
import { currencyFormat } from '@common';
import { ScrollView } from 'react-native-gesture-handler';
export const wait = (timeout: number) => {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
};
const HomeComponent = () => {
    const userInfo: any = useSelector(selectAppProfile);
    const favouries: any = useSelector(selectAppFavouries);
    const dispatch = useDispatch();

    const [hotTour, setHotTour] = React.useState([]);
    const [news, setNews] = React.useState([]);
    const [tours, setTours] = React.useState([]);
    const [searchTour, setSearchTour] = React.useState('');
    const debounceSearchTour = useDebounce(searchTour, 500);

    const insets = useSafeAreaInsets();
    const [callback, setCallback] = React.useState(false);

    React.useEffect(() => {
        homeService.getHotTour().then((res: any) => {
            setHotTour(res.data);
        });

        homeService.getNews().then((res: any) => {
            setNews(res?.data);
        });
    }, [callback]);

    React.useEffect(() => {
        if (!userInfo?.id) return;
        homeService.getFavouries(userInfo?.id).then((res: any) => {
            dispatch(appActions.setFavouries(res?.data?.data));
        });
    }, [userInfo?.id]);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setCallback(!callback);
        wait(1000).then(() => setRefreshing(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback]);

    React.useEffect(() => {
        if (!debounceSearchTour) return setTours([]);

        homeService.getHotTour({ search: debounceSearchTour }).then((res: any) => {
            setTours(res.data);
        });
    }, [debounceSearchTour]);

    // render
    return (
        <Screen
            scroll
            refreshing={refreshing}
            onRefresh={onRefresh}
            unsafe
            style={{ backgroundColor: '#f2f2f2', paddingBottom: 140 }}
        >
            {/* header */}
            <ImageBackground
                style={[styles.header_image_bg, tours?.length > 0 && { height: 'auto', paddingBottom: 20 }]}
                source={images.header_home_bg}
            >
                <Block direction="row" style={{ marginTop: 10 + insets.top }}>
                    <View style={[styles.search_tour]}>
                        <Block direction="row" alignItems="flex-end">
                            <Block
                                direction="row"
                                justifyContent="center"
                                style={{
                                    paddingHorizontal: 10,
                                    paddingLeft: 18,
                                    paddingVertical: 4.91,
                                    borderColor: ColorDefault.button,
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Icon icon="search" size={17} rotate colorTheme="button" />
                            </Block>
                            <Block flex={1}>
                                <TextField
                                    containerStyle={{ zIndex: 10, width: '100%' }}
                                    unActiveTintLabelColor="#0C656A"
                                    unActiveTintBorderColor="#0C656A"
                                    activeTintLabelColor="#0C656A"
                                    activeTintBorderColor="#0C656A"
                                    typeInput="flat"
                                    label="Nhập để tìm kiếm tour?"
                                    value={searchTour}
                                    onChangeText={(text: any) => setSearchTour(text)}
                                />
                            </Block>
                        </Block>
                        {tours && tours?.length > 0 && (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ maxHeight: 500, paddingVertical: 10 }}
                            >
                                {tours.map((tour: any, index: number) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigate(APP_SCREEN.TOUR_DETAIL, tour);
                                            }}
                                            key={index}
                                        >
                                            <Block paddingBottom={20} direction="row">
                                                <Block justifyContent="center">
                                                    <Image
                                                        style={{ width: 70, height: 70, borderRadius: 8 }}
                                                        source={{
                                                            uri: tour?.ImageUrl,
                                                        }}
                                                    />
                                                </Block>
                                                <Block paddingHorizontal={20} flex={1}>
                                                    <Text colorTheme="button" fontWeight="600" fontSize={15}>
                                                        {tour?.Title}
                                                    </Text>
                                                    <Block direction="row" alignItems="center" paddingTop={6}>
                                                        <Text fontSize={11} color="#6B6B6B">
                                                            Giá tour: {currencyFormat(tour?.TourPrice)}đ
                                                        </Text>
                                                    </Block>
                                                    <Block direction="row" alignItems="center" paddingTop={6}>
                                                        <Text fontSize={11} color="#6B6B6B">
                                                            Ngày khởi hành:{' '}
                                                            {moment(tour.DateStartTour).format('DD/MM/YYYY')}
                                                        </Text>
                                                    </Block>
                                                </Block>
                                            </Block>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </View>

                    {/* <TouchableOpacity style={[styles.notifi_tour]}>
                        <Image style={styles.noti_icon} source={images.noti} />
                    </TouchableOpacity> */}
                </Block>
            </ImageBackground>
            <View style={styles.wrapper_tour_special}>
                <Image style={styles.header_gradient_bg} source={images.header_gradient_bg} />

                <Text style={styles.text_tour_special}>Tour nổi bật</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigate(APP_SCREEN.SEARCH_RESULT, {
                            type: 'all_tour',
                        })
                    }
                >
                    <Text style={styles.text_more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ paddingHorizontal: 20, flexGrow: 0 }}
                data={hotTour.filter((item: any) => item?.IsHome)}
                keyExtractor={(record: any) => record?.id}
                renderItem={({ item }: any) => (
                    <TouchableOpacity
                        onPress={() => {
                            tourService.updateViewTour(item?.id).then(() => {
                                navigate(APP_SCREEN.TOUR_DETAIL, { id: item?.id });
                            });
                        }}
                    >
                        <ImageBackground style={styles.tour_image} source={{ uri: item?.ImageUrl }}>
                            <LinearGradient
                                colors={['rgba(0,0,0,.01)', 'rgba(0,0,0,.55)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.wrapper_time_tour}
                            >
                                <Text style={styles.title_tour}>{item?.Title}</Text>
                                <View style={styles.time_tour}>
                                    <Text style={styles.text_time}>{item?.feedbacks?.length} đánh giá</Text>
                                    <Text style={styles.text_calendar}>
                                        {item?.DateStartTour && moment(item?.DateStartTour).format('DD/MM/YYYY')}
                                    </Text>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.wrapper_tour_special}>
                <Text style={styles.text_tour_special}>Tin tức du lịch</Text>
                <TouchableOpacity onPress={() => navigate(APP_SCREEN.NEWS)}>
                    <Text style={styles.text_more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
                {news && (
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
                        {news
                            .filter((newFill: any) => newFill?.IsHome)
                            .map((item: any, index: number) => {
                                return (
                                    <Pressable
                                        onPress={() => navigate(APP_SCREEN.NEWS_DETAIL, item)}
                                        style={styles.slide}
                                        key={index}
                                    >
                                        <ImageBackground
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            source={{
                                                uri: item.ImageUrl,
                                            }}
                                        />
                                    </Pressable>
                                );
                            })}
                    </Swiper>
                )}
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
        bottom: -240,
        position: 'absolute',
    },
    search_tour: {
        backgroundColor: '#fff',
        padding: 16,
        paddingHorizontal: 20,
        flex: 1,
        marginHorizontal: 30,
        borderRadius: 12,
        zIndex: 99999,
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
