import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ActionSheet, Block, LocalImage, Screen, Text, Wallpaper } from '@components';
import { images } from '@assets/image';
import { Rating } from 'react-native-ratings';
import Header from '../../../layouts/Header';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';

const ResultSearchScreen = () => {
    const _refAction = React.useRef<ActionSheet>();

    const _onShowAction = async () => {
        _refAction.current?.show();
    };
    return (
        <Screen unsafe style={{ backgroundColor: '#eeee', flex: 1 }}>
            <Wallpaper backgroundImage="bg_result_search" />
            {/* <ImageBackground source={images.header_home_bg} style={{ height: Dimensions.get('screen').height / 2 }}> */}
            <Header
                style={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    borderBottomColor: '#fff',
                }}
                children={
                    <View>
                        <Text fontSize={16} color="#fff" center>
                            Hạ Long
                        </Text>
                        <Text fontSize={16} color="#fff" center>
                            10/12/2022 - 15/12/2022
                        </Text>
                    </View>
                }
                leftIcon
                rightIcon="filter"
                onRightPress={_onShowAction}
            />
            <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                keyExtractor={(item) => item.toString()}
                renderItem={() => (
                    <TouchableOpacity
                        onPress={() => navigate(APP_SCREEN.TOUR_DETAIL)}
                        style={styles.wrapper_history_tour}
                    >
                        <View style={styles.card_shadow}>
                            <View style={styles.card_history_tour}>
                                <View>
                                    <Image style={styles.image_history_tour} source={images.tour_image} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text numberOfLines={2} color={'#21A8B0'} fontWeight="500" fontSize={16}>
                                        Tour du lịch ABC XYZ gì đó sẽ hiển thị 2 dòng ở đây
                                    </Text>
                                    <View style={styles.wrapper_clock_style}>
                                        <Image style={styles.clock_style} source={images.clock} />
                                        <Text>4 ngày 3 đêm</Text>
                                    </View>
                                    <View style={styles.wrapper_calendar_style}>
                                        <Image style={styles.calendar_style} source={images.calendar} />
                                        <Text>22/12/2022</Text>
                                    </View>
                                    <Block direction="row" justifyContent="flex-start">
                                        <Rating startingValue={5} imageSize={16} style={{ paddingVertical: 10 }} />
                                    </Block>

                                    <Text colorTheme="button" fontWeight="600" fontSize={18}>
                                        25.000.000 VNĐ
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {/* </ImageBackground> */}
            <ActionSheet ref={_refAction} title={'Select'} option={[{ text: 'Option1' }, { text: 'Option2' }]} />
        </Screen>
    );
};

export default ResultSearchScreen;

const styles = StyleSheet.create({
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
    search_tour: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 16,
        flex: 1,
        marginHorizontal: 30,
        borderRadius: 12,
    },
    notifi_tour: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignSelf: 'flex-start',
        padding: 15,
        paddingLeft: 25,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        zIndex: 999,
    },
    noti_icon: {
        width: 19,
        height: 20,
    },
    calendar_home: {
        paddingTop: 15,
    },
    wrapper_history_tour: {
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
});
