import { images } from '@assets/image';
import MapboxGL, { MarkerView } from '@rnmapbox/maps';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '@theme';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { getAppleMapKitDirections, MapKitTransit } from 'react-native-apple-mapkit-directions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCEi57ifK06u6Tn2d6lfg9dvz6Z13EplGU';
const MapScreen = () => {
    const origin = {
        latitude: 21.03624,
        longitude: 105.7912,
    };
    const destination = {
        latitude: 21,
        longitude: 105.790583,
    };
    const transitType = MapKitTransit.AUTOMOBILE;
    const [state, setState] = React.useState<any>();
    React.useEffect(() => {
        const getPoints = async () => {
            if (Platform.OS === 'ios') {
                try {
                    const points = await getAppleMapKitDirections(origin, destination, transitType);
                    setState(points.coordinates);
                } catch (error) {
                    console.log('error', error);
                }
            }
        };
        getPoints();
    }, []);

    const camera = React.useRef<any>(null);

    React.useEffect(() => {
        camera.current?.setCamera({
            centerCoordinate: [105.790583, 21.036237],
        });
    }, []);

    return (
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
                        latitude: 21.026118060798776,
                        longitude: 105.81151992196499,
                    }}
                    destination={{
                        latitude: 21.02973635330122,
                        longitude: 105.81318291391094,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    language="vi"
                    timePrecision="now"
                    mode="DRIVING"
                    strokeWidth={5}
                    strokeColors={['black', 'black', 'green']}
                />

                <Marker
                    coordinate={{
                        latitude: 21.02973635330122,
                        longitude: 105.81318291391094,
                    }}
                    title="Nhà Hiền"
                >
                    <Image source={images.location} style={styles.myLocation} />
                </Marker>
                <Marker
                    coordinate={{
                        latitude: 21.026118060798776,
                        longitude: 105.81151992196499,
                    }}
                    title="Nhà Ý"
                >
                    <Image source={images.location} style={styles.myLocation} />
                </Marker>
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
