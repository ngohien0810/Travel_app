import { images } from '@assets/image';
import { currencyFormat } from '@common';
import { Block, Icon, Text, TextField } from '@components';
import { useDebounce } from '@hooks';
import { goBack } from '@navigation/navigation-service';
import { useIsFocused } from '@react-navigation/native';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '@theme';
import { ColorDefault } from '@theme/color';
import moment from 'moment';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import { homeService } from '../home/service';
import { tourService } from '../tour/service';
import { findShortestPath } from './fc';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCJkKq1RRBvTzamDHadr1e1wU3JpZeNoP4';

const Card = React.memo(({ item, infoDirection, index, selectIndex }: any) => (
    <View style={[styles.cardContainer, selectIndex == index && styles.cardSelect]}>
        <Block>
            <Image source={{ uri: item[0].ImageUrl }} style={[styles.image, { marginBottom: 6 }]} />
            <Image source={{ uri: item[1].ImageUrl }} style={styles.image} />
        </Block>
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{`${item[0]?.Name} - ${item[1]?.Name}`}</Text>
            <Block direction="row" paddingVertical={8}>
                <Text>Khoảng cách: </Text>
                <Text fontWeight="bold">
                    {infoDirection.find((item: any) => item.key === index)?.location?.distance}
                </Text>
                <Text> Km</Text>
            </Block>
            <Block direction="row">
                <Text>Thời gian: </Text>
                <Text fontWeight="bold">
                    {infoDirection.find((item: any) => item.key === index)?.location?.duration?.toFixed(0)}
                </Text>
                <Text> Phút</Text>
            </Block>
        </View>
    </View>
));

const MapScreen = ({ route }: any) => {
    const state: any = useSelector((state: any) => {
        return state;
    });

    const isFocused = useIsFocused();
    const [viewDetail, setViewDetail] = React.useState(false);
    const [tours, setTours] = React.useState([]);
    const [searchTour, setSearchTour] = React.useState('');
    const debounceSearchTour = useDebounce(searchTour, 500);
    const [infoDirection, setInfoDirection] = React.useState<any>([]);
    const [selectIndex, setSelectIndex] = React.useState<any>(null);

    const [destinations, setDestionations] = React.useState<any>([]);
    const findDestinations = destinations && destinations.length > 0 && findShortestPath(destinations);

    const [tourId, setTourId] = React.useState('');
    const [detailTour, setDetailTour] = React.useState<any>(null);
    const [region, setRegion] = React.useState<any>();

    React.useEffect(() => {
        setTourId(route?.params?.tour_id);
        setDetailTour(route?.params);
    }, [route?.params]);

    React.useEffect(() => {
        if (destinations && destinations.length > 0) {
            setRegion({
                latitude: destinations[0]?.Latitude,
                longitude: destinations[0]?.Longtitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.0134,
            });
        } else {
            setRegion({ latitude: 21.028511, longitude: 105.804817, latitudeDelta: 0.06, longitudeDelta: 0.0134 });
        }
    }, [destinations]);

    React.useEffect(() => {
        if (!tourId) {
            setDestionations([]);
            setSelectIndex(null);
            setInfoDirection([]);
            return;
        }
        (async () => {
            tourService
                .getDestination({
                    tour_id: tourId,
                })
                .then((res: any) => {
                    setDestionations(res?.data?.data);
                });
        })();
    }, [tourId, isFocused]);

    React.useEffect(() => {
        if (!debounceSearchTour) return setTours([]);

        homeService.getHotTour({ search: debounceSearchTour }).then((res: any) => {
            setTours(res.data);
        });
    }, [debounceSearchTour]);

    return (
        <View style={{ flex: 1 }}>
            <Block
                direction="row"
                justifyContent="center"
                zIndex={10}
                position="absolute"
                margin={0}
                padding={0}
                top={60}
                left={2}
                width="100%"
                flex={1}
            >
                <Block width="100%" direction="row" justifyContent="center">
                    <View style={styles.container_header}>
                        {state?.app?.profile && viewDetail && (
                            <View style={styles.header}>
                                <Block
                                    direction="row"
                                    justifyContent="center"
                                    style={{
                                        paddingHorizontal: 13,
                                        paddingVertical: 4.91,
                                        borderColor: ColorDefault.button,
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    <Icon icon="search" size={17} rotate colorTheme="button" />
                                </Block>
                                <Block direction="row" paddingBottom={10} flex={1} alignItems="center">
                                    <TextField
                                        containerStyle={{ zIndex: 10, width: '100%' }}
                                        unActiveTintLabelColor="#0C656A"
                                        unActiveTintBorderColor="#0C656A"
                                        activeTintLabelColor="#0C656A"
                                        activeTintBorderColor="#0C656A"
                                        typeInput="flat"
                                        label="Tìm kiếm tour?"
                                        value={searchTour}
                                        onChangeText={(text: any) => setSearchTour(text)}
                                    />
                                </Block>
                                {/* <Text>Header</Text> */}
                            </View>
                        )}
                        {state?.app?.profile && tours && viewDetail && tours?.length > 0 && (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ maxHeight: 500, paddingVertical: 10 }}
                            >
                                {tours.map((tour: any, index: number) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setTourId(tour?.id);
                                                setDetailTour(tour);
                                                setTours([]);
                                                setSearchTour('');
                                                setInfoDirection([]);
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

                        {!(tours?.length > 0) && viewDetail && (
                            <Block paddingBottom={6} direction="row">
                                <Block justifyContent="center">
                                    <Image
                                        style={{ width: 80, height: 80, borderRadius: 16 }}
                                        source={{
                                            uri: detailTour?.ImageUrl,
                                        }}
                                    />
                                </Block>
                                <Block paddingHorizontal={20} flex={1}>
                                    <Text colorTheme="button" fontWeight="600" fontSize={15}>
                                        {detailTour?.Title}
                                    </Text>
                                    <Block direction="row" alignItems="center" paddingTop={6}>
                                        <Image source={images.location} style={{ width: 20, height: 20 }} />
                                        <Text fontSize={11} style={{ paddingHorizontal: 6 }} color="#6B6B6B">
                                            {findDestinations?.length || 'Chưa có'} lộ trình
                                        </Text>
                                    </Block>
                                    <Block direction="row" alignItems="center" paddingTop={6}>
                                        <Image source={images.point_tour} style={{ width: 18, height: 18 }} />
                                        <Text fontSize={11} style={{ paddingHorizontal: 6 }} color="#6B6B6B">
                                            Quãng đường{' '}
                                            {infoDirection
                                                .reduce((a: any, b: any) => a + b?.location?.distance, 0)
                                                ?.toFixed(2)}{' '}
                                            km
                                        </Text>
                                    </Block>
                                    <Block direction="row" alignItems="center" paddingTop={6}>
                                        <Image
                                            source={images.clock}
                                            style={{ width: 18, height: 18, tintColor: ColorDefault.button }}
                                        />
                                        <Text fontSize={11} style={{ paddingHorizontal: 6 }} color="#6B6B6B">
                                            Thời gian{' '}
                                            {infoDirection
                                                .reduce((a: any, b: any) => a + b?.location?.duration, 0)
                                                ?.toFixed(2)}{' '}
                                            phút
                                        </Text>
                                    </Block>
                                </Block>
                            </Block>
                        )}
                        <Block direction="row" justifyContent="center">
                            <TouchableOpacity onPress={() => setViewDetail((prev) => !prev)}>
                                <Icon size={34} rotate={viewDetail ? '360' : false} icon="arrow_down" />
                            </TouchableOpacity>
                        </Block>
                    </View>
                </Block>
            </Block>
            <View style={styles.container}>
                <MapView
                    // followsUserLocation
                    // showsUserLocation
                    // mapType="hybrid"
                    style={{ ...styles.map }}
                    region={region}
                >
                    {findDestinations &&
                        findDestinations.length > 0 &&
                        destinations &&
                        destinations.length > 0 &&
                        findDestinations.map((destination: any, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <MapViewDirections
                                        origin={{
                                            latitude: destination[0]?.Latitude,
                                            longitude: destination[0]?.Longtitude,
                                        }}
                                        destination={{
                                            latitude: destination[1]?.Latitude,
                                            longitude: destination[1]?.Longtitude,
                                        }}
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        // language="vi"
                                        timePrecision="now"
                                        strokeWidth={5}
                                        strokeColors={
                                            selectIndex == index ? ['red', 'red', 'red', '#0C656A'] : ['transparent']
                                        }
                                        onReady={(result: any) => {
                                            setInfoDirection((prev: any) => [
                                                ...prev,
                                                {
                                                    key: index,
                                                    location: { distance: result.distance, duration: result.duration },
                                                },
                                            ]);
                                        }}
                                    />
                                </React.Fragment>
                            );
                        })}

                    {destinations &&
                        destinations.length > 0 &&
                        destinations?.map((item: any, index: number) => {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: item?.Latitude,
                                        longitude: item?.Longtitude,
                                    }}
                                    title={item?.Name}
                                    // icon={item?.ImageUrl}
                                >
                                    <Block justifyContent="center" alignItems="center">
                                        <Text fontSize={18} fontWeight="500" colorTheme="button">
                                            {item?.Name}
                                        </Text>
                                        <Image
                                            source={{
                                                uri: item?.ImageUrl,
                                            }}
                                            style={styles.myLocation}
                                        />
                                    </Block>
                                </Marker>
                            );
                        })}
                </MapView>
            </View>
            {state?.app?.profile && destinations && destinations.length > 0 && (
                <Block
                    direction="row"
                    justifyContent="center"
                    zIndex={10}
                    position="absolute"
                    margin={0}
                    padding={0}
                    bottom={125}
                    left={2}
                    width="100%"
                    flex={1}
                >
                    <Block paddingLeft={5}>
                        <FlatList
                            data={findDestinations}
                            keyExtractor={() => Math.random().toString()}
                            renderItem={({ item, index }: any) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setRegion({
                                            latitude: destinations[index]?.Latitude,
                                            longitude: destinations[index]?.Longtitude,
                                            latitudeDelta: 0.1,
                                            longitudeDelta: 0.0134,
                                        });
                                        setSelectIndex(index);
                                    }}
                                >
                                    <Card
                                        selectIndex={selectIndex}
                                        infoDirection={infoDirection}
                                        index={index}
                                        item={item}
                                    />
                                </TouchableOpacity>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </Block>
                </Block>
            )}
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container_header: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 12,
        elevation: 5,
        width: '92%',
        paddingHorizontal: 20,
    },
    header: {
        paddingTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: HEIGHT_SCREEN,
        width: WIDTH_SCREEN,
    },
    myLocation: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    cardContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 6,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    infoContainer: {
        marginLeft: 10,
        width: 220,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardSelect: {
        borderWidth: 2,
        borderColor: '#0C656A',
    },
    description: {
        marginTop: 5,
        fontSize: 14,
    },
});
