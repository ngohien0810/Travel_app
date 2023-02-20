import { images } from '@assets/image';
import CardTour from '@com/CardTour';
import MyCardTour from '@com/CardTour/MyTour';
import { currencyFormat } from '@common';
import { Block, Divider, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { StackActions } from '@react-navigation/native';
import { selectAppFavouries } from '@redux-selector/app';
import { WIDTH_SCREEN } from '@theme';
import { ColorDefault } from '@theme/color';
import moment from 'moment';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { DetailOrder } from './components/DetailOrder';
import { tourService } from './service';

function Tab1Screen() {
    const [tours, setTours] = React.useState<any>([]);
    const [tourSelect, setTourSelect] = React.useState<any>(null);
    console.log('🚀 ~ file: index.tsx:22 ~ Tab1Screen ~ tourSelect:', tourSelect);
    const state: any = useSelector((state: any) => {
        return state;
    });
    React.useEffect(() => {
        tourService
            .getTourOrder({
                search: '',
                CustomerID: state?.app?.profile?.id,
            })
            .then((res: any) => {
                setTours(res?.data?.data);
            });
    }, []);

    const _refAction = React.useRef<ActionSheet>();

    const _onShowAction = async () => {
        _refAction.current?.show();
    };

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tours}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setTourSelect(item);
                            _refAction.current?.show();
                        }}
                    >
                        <MyCardTour
                            StatusOrder={item?.StatusOrder}
                            tour_image={item?.tour?.ImageUrl}
                            title={item?.tour?.Title}
                            range_tour={item?.tour?.RangeTour}
                            rating={
                                item?.tour?.feedbacks?.length > 0
                                    ? (
                                          item?.tour?.feedbacks?.reduce((prev: any, curr: any) => {
                                              return prev + curr.Rate;
                                          }, 0) / item?.tour?.feedbacks?.length
                                      ).toFixed(1)
                                    : 0
                            }
                            start_tour={moment(item?.tour?.DateStartTour).format('DD/MM/YYYY')}
                            price={currencyFormat(item?.TotalPrice)}
                            ChildTicket={item?.ChildTicket}
                            AdultTicket={item?.AdultTicket}
                        />
                    </TouchableOpacity>
                )}
            />
            <DetailOrder ref={_refAction}>
                <Block padding={20}>
                    <Block paddingHorizontal={20} marginBottom={20}>
                        <Text colorTheme="button" fontWeight="bold" fontSize={18} textAlign="center">
                            {tourSelect?.tour?.Title}
                        </Text>
                    </Block>
                    <Block direction="row">
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Ngày khởi hành</Text>
                            </Block>
                            <Text fontWeight="500">{moment(tourSelect?.tour?.DateStartTour).format('DD/MM/YYYY')}</Text>
                        </Block>
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Thời gian đặt</Text>
                            </Block>
                            <Text fontWeight="500">
                                {moment(tourSelect?.tour?.CreatedDate).format('HH:mm DD/MM/YYYY')}
                            </Text>
                        </Block>
                    </Block>
                    <Block direction="row" marginTop={20}>
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Trạng thái</Text>
                            </Block>
                            <Text fontWeight="500">{tourSelect?.StatusOrder ? 'Đã xác nhận' : 'Chờ xác nhận'}</Text>
                        </Block>
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Thời gian</Text>
                            </Block>
                            <Text fontWeight="500">{tourSelect?.tour?.RangeTour}</Text>
                        </Block>
                    </Block>
                    <Block direction="row" marginTop={20}>
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Số lượng khách</Text>
                            </Block>
                            <Text fontWeight="500">
                                {(tourSelect?.AdultTicket ? `${tourSelect?.AdultTicket} người lớn` : '') +
                                    (tourSelect?.ChildTicket ? ` - ${tourSelect?.ChildTicket} trẻ nhỏ` : '')}
                            </Text>
                        </Block>
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Thời gian</Text>
                            </Block>
                            <Text fontWeight="500">{tourSelect?.tour?.RangeTour}</Text>
                        </Block>
                    </Block>
                    <Block paddingVertical={20}>
                        <Divider />
                    </Block>
                    <Block direction="row">
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Giá tour</Text>
                            </Block>
                            <Text fontWeight="500">{currencyFormat(tourSelect?.tour?.TourPrice)} VNĐ</Text>
                        </Block>
                        <Block flex={1}>
                            <Block paddingVertical={4}>
                                <Text color="#5B5B5B">Tổng giá</Text>
                            </Block>
                            <Text fontWeight="500">{currencyFormat(tourSelect?.TotalPrice)} VNĐ</Text>
                        </Block>
                    </Block>
                </Block>
                <Block direction="row" paddingVertical={20} paddingHorizontal={20}>
                    <TouchableOpacity
                        onPress={() => {
                            _refAction.current.hide();
                            setTourSelect(null);
                        }}
                        style={{ flex: 1 }}
                    >
                        <Block paddingVertical={14} borderRadius={10} justifyContent="center" alignItems="center">
                            <Text color="crison">Huỷ đặt</Text>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            _refAction.current.hide();

                            navigate(APP_SCREEN.TOUR_DETAIL, tourSelect.tour);
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
                                Xem chi tiết tour
                            </Text>
                        </Block>
                    </TouchableOpacity>
                </Block>
            </DetailOrder>
        </View>
    );
}

function Tab2Screen() {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => <MyCardTour title="Demo tour cá nhân" index={index} />}
                ListEmptyComponent={
                    <Block flex={1} height={600} alignItems="center" justifyContent="center">
                        <Text color="#fff" fontSize={18} fontWeight="500">
                            Chưa có lịch sử đặt tour!
                        </Text>
                        <Image source={images.empty} style={{ height: 250, width: 250, marginTop: 20 }} />
                    </Block>
                }
            />
        </View>
    );
}

const TourScreen = () => {
    const [selectedTab, setSelectedTab] = React.useState('Tab1');

    return (
        <Screen statusBarStyle="dark-content" unsafe>
            <LinearGradient colors={['#2F94A6', '#fff']} style={{ flex: 1 }} start={{ x: 0, y: 0 }}>
                <Header
                    iconLeft="black"
                    style={{ borderBottomWidth: 0, backgroundColor: '#fff', width: WIDTH_SCREEN }}
                    leftIcon
                    iconLeftSize={30}
                    onBack={() => StackActions.pop(1)}
                    titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#073F42' }}
                    headerText="Tour của tôi"
                />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Block color="white" direction="row" justifyContent="center">
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    selectedTab === 'Tab1' ? styles.selectedTab : null,
                                    { marginRight: 10 },
                                ]}
                                onPress={() => setSelectedTab('Tab1')}
                            >
                                <Text color={selectedTab === 'Tab1' ? '#309A94' : 'black'} style={styles.tabText}>
                                    Mới đặt
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tab, selectedTab === 'Tab2' ? styles.selectedTab : null]}
                                onPress={() => setSelectedTab('Tab2')}
                            >
                                <Text color={selectedTab === 'Tab2' ? '#309A94' : 'black'} style={styles.tabText}>
                                    Lịch sử
                                </Text>
                            </TouchableOpacity>
                        </Block>
                        {selectedTab === 'Tab1' ? <Tab1Screen /> : <Tab2Screen />}
                    </View>
                    {/* <Text fontSize={14}>Lộ trình bao gồm những điểm mà bạn đã chọn</Text>
                <Block
                    marginTop={16}
                    marginBottom={16}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Block direction="row" alignItems="center">
                        <Image style={{ height: 26, width: 26, marginRight: 6 }} source={images.point_tour} />
                        <Text color="#6B6B6B">Đã chọn 6 điểm</Text>
                    </Block>
                    <Text color="#6B6B6B">Tour gốc: 8 điểm</Text>
                </Block>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[1, 2, 3, 4]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item, index }) => <CardTour index={index} />}
                /> */}
                </View>
            </LinearGradient>
        </Screen>
    );
};

export default TourScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    header: {
        flex: 1,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: ColorDefault.button,
    },
    tabText: {
        textAlign: 'center',
        fontWeight: '500',
    },
    container: {
        flex: 1,
        padding: 20,
    },
});
