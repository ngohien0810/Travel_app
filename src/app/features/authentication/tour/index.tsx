import { images } from '@assets/image';
import CardTour from '@com/CardTour';
import MyCardTour from '@com/CardTour/MyTour';
import { currencyFormat } from '@common';
import { Block, Divider, Modal, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { StackActions } from '@react-navigation/native';
import { selectAppFavouries, selectAppProfile } from '@redux-selector/app';
import { WIDTH_SCREEN } from '@theme';
import { ColorDefault } from '@theme/color';
import moment from 'moment';
import React from 'react';
import { Alert, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import { wait } from '../home';
import { DetailOrder } from './components/DetailOrder';
import { tourService } from './service';

function Tab1Screen({ setSelectedTab }: any) {
    const [tours, setTours] = React.useState<any>([]);
    const [tourSelect, setTourSelect] = React.useState<any>(null);
    const userInfo: any = useSelector(selectAppProfile);
    const [rate, setRate] = React.useState(0);
    const [note, setNote] = React.useState('');
    const [modalFeedback, setModalFeedback] = React.useState(false);

    const state: any = useSelector((state: any) => {
        return state;
    });

    const _refAction = React.useRef<any>();

    const _onShowAction = async () => {
        _refAction.current?.show();
    };

    const [callback, setCallback] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            setCallback(!callback);
            setRefreshing(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback]);

    React.useEffect(() => {
        tourService
            .getTourOrder({
                search: '',
                CustomerID: state?.app?.profile?.id,
                tourStatus: 0,
            })
            .then((res: any) => {
                setTours(res?.data?.data);
            });
    }, [callback]);

    return (
        <View style={styles.container}>
            <FlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
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
                                <Text color="#5B5B5B">Mã tour</Text>
                            </Block>
                            <Text fontWeight="500">{tourSelect?.tour?.Code}</Text>
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
                            Alert.alert('Thông báo', 'Bạn có chắc chắn muốn huỷ đặt tour này không?', [
                                {
                                    text: 'Huỷ',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                        tourService.deleteOrder(tourSelect?.id).then(() => {
                                            _refAction.current.hide();
                                            setTourSelect(null);
                                            setCallback(!callback);
                                        });
                                    },
                                },
                            ]);
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
                {tourSelect?.StatusOrder ? (
                    <Block>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert('Thông báo', 'Bạn xác nhận đã hoàn thành tour này?', [
                                    {
                                        text: 'Huỷ',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Đồng ý',
                                        onPress: () => {
                                            setModalFeedback(true);
                                        },
                                    },
                                ]);
                            }}
                            style={{ flex: 1 }}
                        >
                            <Block paddingVertical={14} color="#28a745" justifyContent="center" alignItems="center">
                                <Text color="#fff" fontWeight="bold">
                                    Hoàn thành
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                ) : null}
            </DetailOrder>
            <Modal hasGesture={false} swipingDirection="down" isVisible={modalFeedback}>
                <Block height="100%" justifyContent="flex-end">
                    <Block height="55%" borderTopLeftRadius={32} padding={20} borderTopRightRadius={32} color="#fff">
                        <Block direction="row" justifyContent="flex-end">
                            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => setModalFeedback(false)}>
                                <Text fontWeight="bold" fontSize={16}>
                                    X
                                </Text>
                            </TouchableOpacity>
                        </Block>
                        <Text fontSize={19} textAlign="center" fontWeight="bold">
                            Đánh giá
                        </Text>
                        <Block paddingBottom={30} marginTop={40}>
                            <Text textAlign="center">Bạn đánh giá tour này như thế nào?</Text>
                        </Block>
                        <Rating startingValue={0} onFinishRating={(rating: any) => setRate(rating)} imageSize={50} />
                        <Block paddingBottom={20} marginTop={30}>
                            <Text textAlign="center">Cho chúng tôi biết thêm chi tiết nhé?</Text>
                        </Block>
                        <TextInput
                            style={{
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingTop: 14,
                                paddingBottom: 14,
                                paddingHorizontal: 14,
                                borderRadius: 16,
                                height: 100,
                            }}
                            placeholder="Điểm nào bạn thích, chưa thích ở tour này. Hay bất cứ điều gì bạn muốn chia sẻ"
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(text) => setNote(text)}
                            // value={this.state.text}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                tourService
                                    .createFeedback({
                                        Name: userInfo?.Name,
                                        Phone: userInfo?.Phone,
                                        Email: userInfo?.Email,
                                        Rate: rate,
                                        Note: note,
                                        TourId: tourSelect?.tour?.id,
                                    })
                                    .then(() => {
                                        tourService.changeStatusTour(tourSelect?.id).then(() => {
                                            setModalFeedback(false);
                                            showMessage({
                                                message: 'Đánh giá thành công',
                                                titleStyle: { textAlign: 'center' },
                                                type: 'success',
                                            });
                                            _refAction.current.hide();
                                            setTourSelect(null);
                                            setCallback(!callback);
                                            setSelectedTab('Tab2');
                                        });
                                    });
                            }}
                            style={[styles.button, { backgroundColor: ColorDefault.button, marginTop: 20 }]}
                        >
                            <Text color="#fff">Gửi đánh giá</Text>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </Modal>
        </View>
    );
}

function Tab2Screen() {
    const [tours, setTours] = React.useState<any>([]);
    const [tourSelect, setTourSelect] = React.useState<any>(null);

    const state: any = useSelector((state: any) => {
        return state;
    });

    const _refAction = React.useRef<any>();

    const _onShowAction = async () => {
        _refAction.current?.show();
    };

    const [callback, setCallback] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            setCallback(!callback);
            setRefreshing(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback]);

    React.useEffect(() => {
        tourService
            .getTourOrder({
                search: '',
                CustomerID: state?.app?.profile?.id,
                tourStatus: 1,
            })
            .then((res: any) => {
                setTours(res?.data?.data);
            });
    }, [callback]);

    return (
        <View style={styles.container}>
            <FlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
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
                            success
                            StatusOrder={item?.StatusOrder}
                            tour_image={item?.tour?.ImageUrl}
                            title={item?.tour?.Title}
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
                            <Text fontWeight="500" color="green">
                                Hoàn thành
                            </Text>
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
                                <Text color="#5B5B5B">Mã tour</Text>
                            </Block>
                            <Text fontWeight="500">{tourSelect?.tour?.Code}</Text>
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
                            Alert.alert('Thông báo', 'Bạn có chắc chắn muốn huỷ đặt tour này không?', [
                                {
                                    text: 'Huỷ',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                        tourService.deleteOrder(tourSelect?.id).then(() => {
                                            _refAction.current.hide();
                                            setTourSelect(null);
                                            setCallback(!callback);
                                        });
                                    },
                                },
                            ]);
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
                        {selectedTab === 'Tab1' ? <Tab1Screen setSelectedTab={setSelectedTab} /> : <Tab2Screen />}
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
        paddingTop: 15,
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
});
