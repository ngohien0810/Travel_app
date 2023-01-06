import { images } from '@assets/image';
import { Text } from '@components';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
const myPlace: any = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [64.165329, 48.844287],
            },
        },
    ],
};
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = () => {
    const mapRef = React.useRef();
    const markerRef = React.useRef();
    const [state, setState] = React.useState({
        curLoc: {
            latitude: 30.7046,
            longitude: 77.1025,
        },
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: 30.7046,
            longitude: 77.1025,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),
        time: 0,
        distance: 0,
        heading: 0,
    });

    const { curLoc, time, distance, destinationCords, isLoading, coordinate, heading } = state;
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
