import { images } from '@assets/image';
import { VectorIcon } from '@assets/vector-icon/vector-icon';
import CardTour from '@com/CardTour';
import { currencyFormat } from '@common';
import { Block, Modal, Screen, Skeleton, Text } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { selectAppFavouries, selectAppProfile, selectAppToken, selectAppTourView } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { ColorDefault } from '@theme/color';
import moment from 'moment';
import React from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';
import RenderHtml from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../layouts/Header';
import { tourService } from './service';

const TourDetailScreen = ({ route }: any) => {
    const { id } = route.params;
    const userInfo: any = useSelector(selectAppProfile);
    const favouries: any = useSelector(selectAppFavouries);
    const tourViews: any = useSelector(selectAppTourView);

    const dispatch = useDispatch();

    const [detailTour, setDetailTour] = React.useState<any>(null);
    console.log('🚀 ~ file: Tour.Detail.tsx:40 ~ TourDetailScreen ~ detailTour:', detailTour);
    const { width } = useWindowDimensions();
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [recordFeedback, setRecordFeedback] = React.useState(3);
    const [modalFeedback, setModalFeedback] = React.useState(false);

    const [callback, setCallback] = React.useState(false);
    const [rate, setRate] = React.useState(0);
    const [note, setNote] = React.useState('');

    const caculateRate =
        detailTour?.feedbacks?.length > 0
            ? (
                  detailTour?.feedbacks?.reduce((prev: any, curr: any) => {
                      return prev + curr.Rate;
                  }, 0) / detailTour?.feedbacks?.length
              ).toFixed(1)
            : 0;

    React.useEffect(() => {
        if (!id) return;
        setLoading(true);
        tourService.getTourDetail(id).then((res: any) => {
            setDetailTour({
                ...res.data,
                feedbacks: res?.data?.feedbacks?.reverse() || [],
            });
            setLoading(false);
        });
    }, [id, callback]);

    const hanldePressFavouries = () => {
        const someFavourite = favouries.some((item: any) => {
            return item?.tour?.id === id;
        });
        if (!someFavourite) {
            tourService.createFavouries(id, userInfo?.id).then((res: any) => {
                dispatch(appActions.setFavouries([...favouries, { tour: detailTour }]));
            });
        } else {
            tourService.deleteFavourites(id).then((res: any) => {
                const newFavouries = favouries.filter((item: any) => {
                    return item?.tour?.id !== id;
                });
                dispatch(appActions.setFavouries(newFavouries));
            });
        }
    };

    return (
        <>
            <Screen unsafe scroll style={{ backgroundColor: '#fff' }}>
                <ImageBackground
                    loadingIndicatorSource={images.spin}
                    style={styles.header_tour_detail}
                    resizeMode="cover"
                    source={detailTour?.ImageUrl ? { uri: detailTour?.ImageUrl } : images.spin}
                >
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
                            tintColor: 'red',
                        }}
                        iconLeft="#222"
                        leftIcon
                        rightIcon={
                            userInfo &&
                            (favouries?.some((item: any) => {
                                return item?.tour?.id === id;
                            })
                                ? 'ic_heart_bold'
                                : 'heart')
                        }
                        onRightPress={hanldePressFavouries}
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
                            <Block paddingLeft={6}>
                                <Text colorTheme="button">{detailTour?.Views || 0}</Text>
                            </Block>
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
                            <Block paddingRight={6}>
                                <Text colorTheme="button">{caculateRate}/5</Text>
                            </Block>
                            <Rating startingValue={caculateRate} imageSize={16} style={{ paddingVertical: 10 }} />
                        </Block>
                    </Block>
                </ImageBackground>
                <Block paddingHorizontal={20} paddingVertical={20}>
                    <Text fontSize={20} color="#15898F">
                        {detailTour?.Title}
                    </Text>
                </Block>
                <Block direction="row" alignItems="center" paddingHorizontal={20}>
                    <View style={{ height: 1, backgroundColor: '#D9D9D9', flex: 1 }} />
                    <Text fontSize={16} fontWeight="600" style={{ paddingHorizontal: 20 }}>
                        Chi tiết tour
                    </Text>
                    <View style={{ height: 1, backgroundColor: '#D9D9D9', flex: 1 }} />
                </Block>
                <Block paddingHorizontal={20} paddingTop={10}>
                    {detailTour?.Description ? (
                        <RenderHtml
                            contentWidth={width}
                            source={{
                                html:
                                    detailTour?.Description.slice(0, page * 380) +
                                    (page * 380 < detailTour?.Description?.length ? '...' : ''),
                            }}
                        />
                    ) : (
                        <Skeleton />
                    )}
                    {page * 380 < detailTour?.Description?.length && (
                        <TouchableOpacity
                            onPress={() => {
                                setPage((prev) => prev + 1);
                            }}
                        >
                            <Block direction="row" alignItems="center" paddingVertical={10} justifyContent="center">
                                <Text style={{ marginRight: 10 }}>Xem thêm</Text>
                                <VectorIcon icon="arrow_down_1" />
                            </Block>
                        </TouchableOpacity>
                    )}
                </Block>
                <Block direction="row" marginTop={10} marginBottom={20} alignItems="center" paddingHorizontal={20}>
                    <View style={{ height: 1, backgroundColor: '#D9D9D9', flex: 1 }} />
                </Block>

                <Block paddingHorizontal={20}>
                    <TouchableOpacity
                        onPress={() => {
                            if (userInfo) {
                                navigate(APP_SCREEN.MAPS, { tour_id: detailTour?.id, ...detailTour });
                            } else {
                                navigate(APP_SCREEN.LOGIN);
                            }
                        }}
                        style={styles.button}
                    >
                        <Text color="#333" fontWeight="bold">
                            {userInfo ? 'Lộ trình gợi ý' : 'Đăng nhập'}
                        </Text>
                    </TouchableOpacity>
                </Block>

                <LinearGradient
                    colors={['#309A94', '#53B7B1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        marginTop: 30,
                        padding: 20,
                        paddingTop: 30,
                    }}
                >
                    <Text fontSize={18} fontWeight="600" color="#fff">
                        Đánh giá
                    </Text>

                    <Block
                        alignItems="center"
                        marginTop={20}
                        marginBottom={10}
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Block direction="row" alignItems="center">
                            <Text fontSize={40} color="#fff">
                                {caculateRate}
                            </Text>
                            <View style={{ marginLeft: 10 }}>
                                <Rating
                                    readonly
                                    startingValue={caculateRate}
                                    imageSize={18}
                                    style={{
                                        paddingVertical: 6,
                                        paddingHorizontal: 10,
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                    }}
                                />

                                <Block paddingHorizontal={10} paddingTop={3}>
                                    <Text color="#e5d5d5">( {detailTour?.feedbacks?.length} đánh giá )</Text>
                                </Block>
                            </View>
                        </Block>

                        <TouchableOpacity onPress={() => userInfo && setModalFeedback(true)}>
                            <Block
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    backgroundColor: userInfo ? 'transparent' : '#ccc',
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
                        </TouchableOpacity>
                    </Block>
                    {detailTour?.feedbacks?.slice(0, recordFeedback)?.map((item: any, index: number) => {
                        return (
                            <Block key={Math.random().toString()} marginTop={16}>
                                <Block
                                    style={{
                                        backgroundColor: '#fff',
                                    }}
                                    padding={20}
                                    borderRadius={20}
                                >
                                    <Block direction="row" alignItems="center" justifyContent="space-between">
                                        <Block direction="row" alignItems="center">
                                            <Image
                                                source={item?.Avatar ? { uri: item?.Avatar } : images.avatar}
                                                style={{ width: 50, height: 50, borderRadius: 999 }}
                                            />
                                            <Block marginLeft={10} alignItems="center">
                                                <Text>{item.Name}</Text>
                                                <View style={styles.wrapper_clock_style}>
                                                    <Image style={styles.clock_style} source={images.clock} />
                                                    <Text style={{ marginLeft: 6 }}>
                                                        {moment(item?.CreatedDate).format('DD/MM/YYYY')}
                                                    </Text>
                                                </View>
                                            </Block>
                                        </Block>
                                        <Rating
                                            readonly
                                            startingValue={item?.Rate}
                                            imageSize={18}
                                            style={{ paddingVertical: 6 }}
                                        />
                                    </Block>
                                    <Block paddingTop={20}>
                                        <Text>{item?.Note}</Text>
                                    </Block>
                                </Block>
                            </Block>
                        );
                    })}

                    {detailTour?.feedbacks?.length > 3 && recordFeedback < detailTour?.feedbacks?.length && (
                        <Block direction="row" marginTop={20} justifyContent="center">
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 40,
                                    borderRadius: 14,
                                    borderColor: '#fff',
                                }}
                                onPress={() => setRecordFeedback(detailTour.feedbacks.length)}
                            >
                                <Text color="#fff" fontWeight="700">
                                    Xem tất cả
                                </Text>
                            </TouchableOpacity>
                        </Block>
                    )}
                </LinearGradient>

                <Block>
                    <Block padding={20} direction="row" alignItems="center" justifyContent="space-between">
                        <Text fontWeight="bold" fontSize={17} colorTheme="button">
                            Các tour du lịch đã xem
                        </Text>
                    </Block>

                    <Block>
                        {tourViews &&
                            tourViews?.length > 0 &&
                            tourViews?.slice(0, 5)?.map((item: any) => (
                                <TouchableOpacity
                                    key={Math.random().toString()}
                                    onPress={() => {
                                        navigate(APP_SCREEN.TOUR_DETAIL, item);
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
                                        start_tour={moment(item?.DateStartTour).format('DD/MM/YYYY')}
                                        price={currencyFormat(item?.TourPrice)}
                                    />
                                </TouchableOpacity>
                            ))}
                    </Block>
                </Block>
                <Modal hasGesture={false} swipingDirection="down" isVisible={modalFeedback}>
                    <Block height="100%" justifyContent="flex-end">
                        <Block
                            height="55%"
                            borderTopLeftRadius={32}
                            padding={20}
                            borderTopRightRadius={32}
                            color="#fff"
                        >
                            <Block direction="row" justifyContent="flex-end">
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => setModalFeedback(false)}
                                >
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
                            <Rating
                                startingValue={0}
                                onFinishRating={(rating: any) => setRate(rating)}
                                imageSize={50}
                            />
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
                                            Avatar: userInfo?.Avatar,
                                            Rate: rate,
                                            Note: note,
                                            TourId: detailTour?.id,
                                        })
                                        .then(() => {
                                            setCallback(!callback);
                                            setModalFeedback(false);
                                            showMessage({
                                                message: 'Đánh giá thành công',
                                                titleStyle: { textAlign: 'center' },
                                                type: 'success',
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
            </Screen>

            <Block paddingHorizontal={20} paddingBottom={25} marginTop={10}>
                <TouchableOpacity
                    onPress={() => {
                        if (userInfo) {
                            navigate(APP_SCREEN.ORDER, detailTour);
                        } else {
                            navigate(APP_SCREEN.LOGIN);
                        }
                    }}
                    style={[styles.button, { backgroundColor: ColorDefault.button }]}
                >
                    <Text fontWeight="bold" color="#fff">
                        {userInfo ? 'Đặt tour' : 'Đăng nhập'}
                    </Text>
                </TouchableOpacity>
            </Block>
        </>
    );
};

export default TourDetailScreen;

const styles = StyleSheet.create({
    header_tour_detail: {
        minHeight: 320,
        maxHeight: 400,
        justifyContent: 'space-between',
    },
    button: {
        height: 44,
        backgroundColor: '#FFC656',
        width: '100%',
        borderRadius: 10,
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
