import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Block, Text } from '@components';
import { Rating } from 'react-native-ratings';
import { images } from '@assets/image';

const MyCardTour = ({
    title,
    start_tour,
    price,
    range_tour,
    rating,
    tour_image,
    AdultTicket,
    ChildTicket,
    StatusOrder,
}: {
    title: string;
    start_tour: string;
    price?: string;
    range_tour?: any;
    rating?: any;
    tour_image?: any;
    AdultTicket?: any;
    ChildTicket?: any;
    StatusOrder?: any;
}) => {
    return (
        <View style={styles.wrapper_history_tour}>
            <View style={styles.card_shadow}>
                <View style={styles.card_history_tour}>
                    <View>
                        <Image style={styles.image_history_tour} source={{ uri: tour_image }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={2} color={'#21A8B0'} fontWeight="500" fontSize={16}>
                            {title}
                        </Text>
                        <View style={styles.wrapper_clock_style}>
                            <Image style={styles.clock_style} source={images.clock} />
                            <Text color="#5B5B5B">{range_tour}</Text>
                        </View>
                        <View style={styles.wrapper_calendar_style}>
                            <Image style={styles.calendar_style} source={images.calendar} />
                            <Text color="#5B5B5B">{start_tour}</Text>
                        </View>
                        {AdultTicket && (
                            <Block paddingVertical={3}>
                                <Text color="#5B5B5B">Vé người lớn: {AdultTicket}</Text>
                            </Block>
                        )}
                        {ChildTicket && (
                            <Block>
                                <Text color="#5B5B5B">Vé trẻ em: {ChildTicket}</Text>
                            </Block>
                        )}

                        <Block
                            marginTop={8}
                            marginBottom={10}
                            borderWidth={1}
                            alignSelf="flex-start"
                            paddingVertical={4}
                            paddingHorizontal={15}
                            borderRadius={6}
                            borderColor={StatusOrder ? '#21A8B0' : '#FF0000'}
                        >
                            <Text color={StatusOrder ? '#21A8B0' : '#FF0000'}>
                                {StatusOrder ? 'Đã xác nhận' : 'Chờ xác nhận'}
                            </Text>
                        </Block>

                        <Text colorTheme="button" fontWeight="600" fontSize={17}>
                            {price} vnđ
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MyCardTour;

const styles = StyleSheet.create({
    wrapper_history_tour: {
        paddingHorizontal: 10,
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
        padding: 6,
        backgroundColor: '#fff',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    image_history_tour: {
        height: 150,
        width: 120,
        borderRadius: 12,
        marginRight: 16,
    },
    wrapper_clock_style: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 6,
        marginTop: 10,
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
        marginRight: 8,
    },
});
