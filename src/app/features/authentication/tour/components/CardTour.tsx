import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Block, Text } from '@components';
import { images } from '@assets/image';

const CardTour = ({ index }: { index: any }) => {
    return (
        <TouchableOpacity>
            <Block colorTheme="background" borderRadius={8} direction="row" flex={1} marginBottom={14}>
                <Block flex={0.55}>
                    <Block height="100%" paddingHorizontal={20} paddingVertical={15}>
                        <Text fontSize={20} fontWeight="bold" lineHeight={32} colorTheme="button">
                            {index?.length > 1 ? index + '.' : '0' + index?.toString() + '.'}
                        </Text>
                        <Text lineHeight={22} color="#6B6B6B">
                            Trang trại dê Huy Hùng hihi
                        </Text>
                        <Block marginTop={8} direction="row" justifyContent="space-between">
                            <Block direction="row" alignItems="center">
                                <Image source={images.arrow_hori} style={styles.icon} />
                                <Text fontSize={10} color="#6B6B6B">
                                    15km
                                </Text>
                            </Block>
                            <Block direction="row" alignItems="center">
                                <Image source={images.location} style={styles.icon} />
                                <Text fontSize={10} color="#6B6B6B">
                                    Xem vị trí
                                </Text>
                            </Block>
                        </Block>
                    </Block>
                </Block>

                <Block flex={0.45}>
                    <Image source={images.tour_image} style={styles.image_card} />
                </Block>
            </Block>
        </TouchableOpacity>
    );
};

export default CardTour;

const styles = StyleSheet.create({
    image_card: {
        height: '100%',
        width: '100%',
        borderRadius: 8,
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 6,
    },
});
