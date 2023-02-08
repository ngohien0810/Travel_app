import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Block, Screen } from '@components';
import Header from '@layouts/Header';
import { images } from '@assets/image';
import { VectorIcon } from '@assets/vector-icon/vector-icon';

const NewsDetailScreen = () => {
    return (
        <Screen unsafe scroll style={{ backgroundColor: '#fff' }}>
            <ImageBackground
                loadingIndicatorSource={images.spin}
                style={styles.header_tour_detail}
                resizeMode="center"
                source={images.bg_wallpaper}
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
                    iconLeft="#222"
                    leftIcon
                />
            </ImageBackground>
        </Screen>
    );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
    header_tour_detail: {
        minHeight: 400,
        maxHeight: 400,
        width: '100%',
        justifyContent: 'space-between',
    },
});
