import { Block, Icon, Text, TextField } from '@components';
import { navigationRef } from '@navigation/navigation-service';
import { StackActions } from '@react-navigation/native';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '@theme';
import { ColorDefault } from '@theme/color';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { tourService } from '../tour/service';
import { findShortestPath } from './fc';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCKp54Z8i9afLSm2yaFTUruXQ6Q_70nav8';

const Card = React.memo(({ item, infoDirection, index }: any) => (
    <View style={styles.cardContainer}>
        <Block>
            <Image source={{ uri: item[0].ImageUrl }} style={[styles.image, { marginBottom: 6 }]} />
            <Image source={{ uri: item[1].ImageUrl }} style={styles.image} />
        </Block>
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{`${item[0]?.Name} - ${item[1]?.Name}`}</Text>
            <Block direction="row" paddingVertical={8}>
                <Text>Khoảng cách: </Text>
                <Text fontWeight="bold">{infoDirection[index]?.distance}</Text>
            </Block>
            <Block direction="row">
                <Text>Thời gian: </Text>
                <Text fontWeight="bold"> {infoDirection[index]?.duration?.toFixed(0)}</Text>
            </Block>
        </View>
    </View>
));

const MapScreen = ({ route }: any) => {
    const tour_id = route?.params;

    const [infoDirection, setInfoDirection] = React.useState<any>([]);
    const [selectIndex, setSelectIndex] = React.useState<any>('');

    const [destinations, setDestionations] = React.useState<any>([]);

    const findDestinations = destinations && destinations.length > 0 && findShortestPath(destinations);

    const DEFAULT_REGION =
        destinations && destinations.length > 0
            ? {
                  latitude: destinations[0]?.Latitude,
                  longitude: destinations[0]?.Longtitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.0134,
              }
            : { latitude: 21.028511, longitude: 105.804817, latitudeDelta: 0.06, longitudeDelta: 0.0134 };

    React.useEffect(() => {
        if (!tour_id) return;
        (async () => {
            tourService
                .getDestination({
                    tour_id,
                })
                .then((res: any) => {
                    setDestionations(res?.data?.data);
                });
        })();
    }, [tour_id]);

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
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ paddingRight: 20 }}
                        onPress={() => {
                            const popAction = StackActions.pop(1);

                            navigationRef.current?.dispatch(popAction);
                        }}
                    >
                        <Icon icon="arrow_down" size={36} rotate color={'black'} />
                    </TouchableOpacity>
                    <Block direction="row" paddingBottom={10} flex={1} alignItems="center">
                        <TextField
                            containerStyle={{ zIndex: 10, width: '100%' }}
                            unActiveTintLabelColor="#0C656A"
                            unActiveTintBorderColor="#0C656A"
                            activeTintLabelColor="#0C656A"
                            activeTintBorderColor="#0C656A"
                            typeInput="flat"
                            label="Tìm kiếm tour?"
                        />
                    </Block>
                    {/* <Text>Header</Text> */}
                </View>
            </Block>
            <View style={styles.container}>
                <MapView
                    // followsUserLocation
                    // showsUserLocation
                    // mapType="hybrid"
                    style={{ ...styles.map }}
                    region={DEFAULT_REGION}
                >
                    {findDestinations &&
                        findDestinations.length > 0 &&
                        destinations &&
                        destinations.length > 0 &&
                        findDestinations?.map((destination: any, index: number) => {
                            return (
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
                                    mode="DRIVING"
                                    strokeWidth={5}
                                    strokeColors={[
                                        'black',
                                        'black',
                                        '#' + Math.floor(Math.random() * 16777215).toString(16),
                                    ]}
                                    onReady={(result: any) => {
                                        setInfoDirection((prev: any) => [
                                            ...prev,
                                            { distance: result.distance, duration: result.duration },
                                        ]);
                                    }}
                                />
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
            {destinations && destinations.length > 0 && (
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
                            keyExtractor={(item) => Math.random().toString()}
                            renderItem={({ item, index }: any) => (
                                <TouchableOpacity
                                    onPress={() => setSelectIndex(index)}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: 'red',
                                    }}
                                >
                                    <Card infoDirection={infoDirection} index={index} item={item} />
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
    header: {
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: '92%',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
    description: {
        marginTop: 5,
        fontSize: 14,
    },
});
