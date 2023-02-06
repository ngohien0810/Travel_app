import { images } from '@assets/image';
import { Block, Icon, Text } from '@components';
import { goBack, navigate } from '@navigation/navigation-service';
import MapboxGL, { MarkerView } from '@rnmapbox/maps';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '@theme';
import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getAppleMapKitDirections, MapKitTransit } from 'react-native-apple-mapkit-directions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { tourService } from '../tour/service';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDYYVsxVI2SU0NZhUkMEpiBw0UY_GbWwMo';
const MapScreen = ({ route }: any) => {
    const tour_id = route?.params;

    const [destinations, setDestionations] = React.useState<any>([]);
    console.log('🚀 ~ file: index.tsx:18 ~ MapScreen ~ destinations', destinations);

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
                zIndex={1}
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
                        onPress={() => {
                            goBack();
                        }}
                    >
                        <Icon icon="arrow_down" size={36} rotate color={'black'} />
                    </TouchableOpacity>

                    {/* <Text>Header</Text> */}
                </View>
            </Block>
            <View style={styles.container}>
                <MapView
                    // followsUserLocation
                    // showsUserLocation
                    // mapType="hybrid"
                    style={{ ...styles.map }}
                    region={{ latitude: 21.028511, longitude: 105.804817, latitudeDelta: 0.06, longitudeDelta: 0.0134 }}
                >
                    <MapViewDirections
                        origin={{
                            latitude: destinations[0]?.Latitude,
                            longitude: destinations[0]?.Longtitude,
                        }}
                        destination={{
                            latitude: destinations[1]?.Latitude,
                            longitude: destinations[1]?.Longtitude,
                        }}
                        apikey={GOOGLE_MAPS_APIKEY}
                        // language="vi"
                        timePrecision="now"
                        mode="DRIVING"
                        strokeWidth={5}
                        strokeColors={['black', 'black', 'green']}
                    />

                    <MapViewDirections
                        origin={{
                            latitude: destinations[1]?.Latitude,
                            longitude: destinations[1]?.Longtitude,
                        }}
                        destination={{
                            latitude: destinations[2]?.Latitude,
                            longitude: destinations[2]?.Longtitude,
                        }}
                        apikey={GOOGLE_MAPS_APIKEY}
                        // language="vi"
                        timePrecision="now"
                        mode="DRIVING"
                        strokeWidth={5}
                        strokeColors={['black', 'black', 'red']}
                    />

                    <MapViewDirections
                        origin={{
                            latitude: destinations[2]?.Latitude,
                            longitude: destinations[2]?.Longtitude,
                        }}
                        destination={{
                            latitude: destinations[3]?.Latitude,
                            longitude: destinations[3]?.Longtitude,
                        }}
                        apikey={GOOGLE_MAPS_APIKEY}
                        // language="vi"
                        timePrecision="now"
                        mode="DRIVING"
                        strokeWidth={5}
                        strokeColors={['black', 'black', 'yellow']}
                    />

                    {destinations?.map((item: any, index: number) => {
                        return (
                            <>
                                <Marker
                                    coordinate={{
                                        latitude: item?.Latitude,
                                        longitude: item?.Longtitude,
                                    }}
                                    title="Nhà Hiền"
                                >
                                    <Image source={images.location} style={styles.myLocation} />
                                </Marker>
                            </>
                        );
                    })}

                    {/* <Polyline coordinates={state} strokeWidth={2} strokeColor="red" /> */}
                </MapView>
                {/* <MapboxGL.MapView
               styleURL="https://tiles.goong.io/assets/goong_map_web.json?api_key=eBa57AZT6VYUwTlwtgqk0YGmUPN5As9X319FCf72"
               style={styles.map}
               zoomEnabled
               logoEnabled={false}
           >
               <MapboxGL.Camera ref={camera} zoomLevel={12} />
           </MapboxGL.MapView> */}
            </View>
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
        height: 60,
        backgroundColor: 'rgba(255,255,255,0.7)',
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
});
