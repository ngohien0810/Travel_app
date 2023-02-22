import { images } from '@assets/image';
import CardTour from '@com/CardTour';
import { currencyFormat } from '@common';
import { ActionSheet, Block, Screen, Text, Wallpaper } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';
import { ColorDefault } from '@theme/color';
import moment from 'moment';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../../../layouts/Header';
import { homeService } from '../home/service';
import { FilterTour } from './Filter';

const ResultSearchScreen = ({ route }: any) => {
    const data = route.params;
    const [filterPrice, setFilterPrice] = React.useState<any>();
    const [filterRating, setFilterRating] = React.useState<any>();
    const [tours, setTours] = React.useState<any>([]);

    const tourCurrent: any = React.useRef();
    const dispatch = useDispatch();

    const _refAction = React.useRef<ActionSheet>();

    const _onShowAction = async () => {
        _refAction.current?.show();
    };

    React.useEffect(() => {
        homeService.getHotTour().then((res: any) => {
            setTours(res.data);
            tourCurrent.current = res.data;
        });
    }, []);

    return (
        <Screen unsafe style={{ backgroundColor: '#eeee', flex: 1 }}>
            <Wallpaper backgroundImage="bg_result_search" />
            {/* <ImageBackground source={images.header_home_bg} style={{ height: Dimensions.get('screen').height / 2 }}> */}
            <Header
                style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    borderBottomColor: '#fff',
                }}
                children={
                    data?.type === 'all_tour' ? (
                        <Text fontSize={18} fontWeight="600" color="#fff" center>
                            Danh sách tour
                        </Text>
                    ) : (
                        <View>
                            <Text fontSize={16} color="#fff" center>
                                Hạ Long
                            </Text>
                            <Text fontSize={16} color="#fff" center>
                                10/12/2022 - 15/12/2022
                            </Text>
                        </View>
                    )
                }
                leftIcon
                rightIcon="filter"
                onRightPress={_onShowAction}
            />
            <FlatList
                data={tours}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }: any) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigate(APP_SCREEN.TOUR_DETAIL, item);

                            dispatch(appActions.setTourView(item));
                        }}
                    >
                        <CardTour
                            tour_image={item?.ImageUrl}
                            title={item?.Title}
                            range_tour={item?.RangeTour}
                            rating={
                                item?.feedbacks?.length > 0
                                    ? (
                                          item?.feedbacks?.reduce((prev: any, curr: any) => {
                                              return prev + curr.Rate;
                                          }, 0) / item?.feedbacks?.length
                                      ).toFixed(1)
                                    : 0
                            }
                            start_tour={moment(item?.DateStartTour).format('HH:mm DD/MM/YYYY')}
                            price={currencyFormat(item?.TourPrice)}
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Block flex={1} height={600} alignItems="center" justifyContent="center">
                        <Text color="#fff" fontSize={18} fontWeight="500">
                            Danh sách trống!
                        </Text>
                        <Image source={images.empty} style={{ height: 250, width: 250, marginTop: 20 }} />
                    </Block>
                }
            />
            {/* </ImageBackground> */}
            <FilterTour ref={_refAction} title="Bộ lọc">
                <Block padding={20}>
                    <Block direction="row" alignItems="center" justifyContent="space-between">
                        <Text fontWeight="600" fontSize={16}>
                            Khoảng giá
                        </Text>
                        <Text colorTheme="button" fontWeight="500">
                            1 triệu - 10 triệu
                        </Text>
                    </Block>
                    <Block direction="row" paddingVertical={20}>
                        <TouchableOpacity
                            onPress={() => setFilterPrice((prev: any) => (prev === 1 ? '' : 1))}
                            style={{ flex: 1 }}
                        >
                            <Block
                                color={filterPrice === 1 ? ColorDefault.button : '#F2F2F2'}
                                paddingVertical={10}
                                marginLeft={6}
                                marginRight={6}
                                borderRadius={8}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontWeight="500" color={filterPrice === 1 ? '#fff' : 'black'}>
                                    0 - 5 triệu
                                </Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setFilterPrice((prev: any) => (prev === 2 ? '' : 2))}
                            style={{ flex: 1 }}
                        >
                            <Block
                                color={filterPrice === 2 ? ColorDefault.button : '#F2F2F2'}
                                paddingVertical={10}
                                marginLeft={6}
                                marginRight={6}
                                borderRadius={8}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontWeight="500" color={filterPrice === 2 ? '#fff' : 'black'}>
                                    5 - 10 triệu
                                </Text>
                            </Block>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setFilterPrice((prev: any) => (prev === 3 ? '' : 3))}
                            style={{ flex: 1 }}
                        >
                            <Block
                                color={filterPrice === 3 ? ColorDefault.button : '#F2F2F2'}
                                paddingVertical={10}
                                marginLeft={6}
                                marginRight={6}
                                borderRadius={8}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontWeight="500" color={filterPrice === 3 ? '#fff' : 'black'}>
                                    10 - 30 triệu
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block>
                        <Text fontWeight="600">Đánh gíá</Text>
                    </Block>
                    <Block direction="row" paddingVertical={20} paddingBottom={10}>
                        <TouchableOpacity
                            onPress={() => setFilterRating((prev: any) => (prev === 1 ? '' : 1))}
                            style={{ flex: 1 }}
                        >
                            <Block
                                color={filterRating === 1 ? ColorDefault.button : '#F2F2F2'}
                                paddingVertical={10}
                                marginLeft={6}
                                marginRight={6}
                                borderRadius={8}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontWeight="500" color={filterRating === 1 ? '#fff' : 'black'}>
                                    5 sao
                                </Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setFilterRating((prev: any) => (prev === 2 ? '' : 2))}
                            style={{ flex: 1 }}
                        >
                            <Block
                                color={filterRating === 2 ? ColorDefault.button : '#F2F2F2'}
                                paddingVertical={10}
                                marginLeft={6}
                                marginRight={6}
                                borderRadius={8}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontWeight="500" color={filterRating === 2 ? '#fff' : 'black'}>
                                    Từ 4 sao
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block direction="row">
                        <TouchableOpacity
                            onPress={() => setFilterRating((prev: any) => (prev === 3 ? '' : 3))}
                            style={{ flex: 1 }}
                        >
                            <Block
                                color={filterRating === 3 ? ColorDefault.button : '#F2F2F2'}
                                paddingVertical={10}
                                marginLeft={6}
                                marginRight={6}
                                borderRadius={8}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontWeight="500" color={filterRating === 3 ? '#fff' : 'black'}>
                                    Từ 3 sao
                                </Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setFilterRating((prev: any) => (prev === 4 ? '' : 4))}
                            style={{ flex: 1 }}
                        >
                            <Block
                                color={filterRating === 4 ? ColorDefault.button : '#F2F2F2'}
                                paddingVertical={10}
                                marginLeft={6}
                                marginRight={6}
                                borderRadius={8}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text fontWeight="500" color={filterRating === 4 ? '#fff' : 'black'}>
                                    Từ 2 sao
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block direction="row" marginTop={20}>
                        <TouchableOpacity
                            onPress={() => {
                                setFilterPrice('');
                                setFilterRating('');
                            }}
                            style={{ flex: 1 }}
                        >
                            <Block paddingVertical={14} borderRadius={10} justifyContent="center" alignItems="center">
                                <Text>Thiết lập lại</Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                _refAction.current?.hide();
                                // filter tour by price and rating
                                const filterPriceTour = tourCurrent?.current.filter((item: any) => {
                                    if (filterPrice === 1) {
                                        return +item.TourPrice < 5000000;
                                    }
                                    if (filterPrice === 2) {
                                        return +item.TourPrice >= 5000000 && +item.TourPrice < 10000000;
                                    }
                                    if (filterPrice === 3) {
                                        return +item.TourPrice >= 10000000 && +item.TourPrice < 30000000;
                                    }
                                    return item;
                                });
                                const filterRatingTour = filterPriceTour.filter((item: any) => {
                                    const caculateRate =
                                        item?.feedbacks?.length > 0
                                            ? (
                                                  item?.feedbacks?.reduce((prev: any, curr: any) => {
                                                      return prev + curr.Rate;
                                                  }, 0) / item?.feedbacks?.length
                                              ).toFixed(1)
                                            : 0;
                                    if (filterRating === 1) {
                                        return +caculateRate === 5;
                                    }
                                    if (filterRating === 2) {
                                        return +caculateRate >= 4;
                                    }
                                    if (filterRating === 3) {
                                        return +caculateRate >= 3;
                                    }
                                    if (filterRating === 4) {
                                        return +caculateRate >= 2;
                                    }
                                    return item;
                                });

                                setTours(filterRatingTour);
                            }}
                            style={{ flex: 1 }}
                        >
                            <Block
                                paddingVertical={14}
                                borderRadius={10}
                                colorTheme="button"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text color="#fff" fontWeight="600">
                                    Áp dụng
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </FilterTour>
        </Screen>
    );
};

export default ResultSearchScreen;
