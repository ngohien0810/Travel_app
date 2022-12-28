import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Block, Text } from '@components';
import { Rating } from 'react-native-ratings';
import { images } from '@assets/image';

const CardTour = ({ title, start_tour, price }: { title: string; start_tour: string; price?: string }) => {
    return (
        <View style={styles.wrapper_history_tour}>
            <View style={styles.card_shadow}>
                <View style={styles.card_history_tour}>
                    <View>
                        <Image style={styles.image_history_tour} source={images.tour_image} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={2} color={'#21A8B0'} fontWeight="500" fontSize={16}>
                            {title}
                        </Text>
                        <View style={styles.wrapper_clock_style}>
                            <Image style={styles.clock_style} source={images.clock} />
                            <Text>4 ngày 3 đêm</Text>
                        </View>
                        <View style={styles.wrapper_calendar_style}>
                            <Image style={styles.calendar_style} source={images.calendar} />
                            <Text>{start_tour}</Text>
                        </View>
                        <Block direction="row" justifyContent="flex-start">
                            <Rating startingValue={5} imageSize={16} style={{ paddingVertical: 10 }} />
                        </Block>

                        <Text colorTheme="button" fontWeight="600" fontSize={18}>
                            {price} VNĐ
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CardTour;

const styles = StyleSheet.create({
    wrapper_history_tour: {
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    card_shadow: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 1,
    },
    card_history_tour: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    image_history_tour: {
        height: 160,
        width: 130,
        borderRadius: 12,
        marginRight: 10,
    },
    wrapper_clock_style: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 6,
        marginTop: 15,
    },
    clock_style: {
        height: 17,
        width: 17,
        marginRight: 10,
    },
    wrapper_calendar_style: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    calendar_style: {
        height: 18,
        width: 18,
        marginRight: 10,
    },
});
