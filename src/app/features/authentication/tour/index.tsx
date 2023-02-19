import { images } from '@assets/image';
import CardTour from '@com/CardTour';
import MyCardTour from '@com/CardTour/MyTour';
import { currencyFormat } from '@common';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { StackActions } from '@react-navigation/native';
import { selectAppFavouries } from '@redux-selector/app';
import { WIDTH_SCREEN } from '@theme';
import { ColorDefault } from '@theme/color';
import moment from 'moment';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

function Tab1Screen() {
    const favouries: any = useSelector(selectAppFavouries);

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={favouries.slice(1)}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                    <CardTour
                        tour_image={item?.tour?.ImageUrl}
                        title={item?.tour?.Title}
                        range_tour={item?.tour?.RangeTour}
                        rating={
                            item?.tour?.feedbacks?.length > 0
                                ? (
                                      item?.tour?.feedbacks?.reduce((prev: any, curr: any) => {
                                          return prev + curr.Rate;
                                      }, 0) / item?.tour?.feedbacks?.length
                                  ).toFixed(1)
                                : 0
                        }
                        start_tour={moment(item?.tour?.DateStartTour).format('DD/MM/YYYY')}
                        price={currencyFormat(item?.tour?.TourPrice)}
                    />
                )}
            />
        </View>
    );
}

function Tab2Screen() {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => <MyCardTour title="Demo tour cá nhân" index={index} />}
                ListEmptyComponent={
                    <Block flex={1} height={600} alignItems="center" justifyContent="center">
                        <Text color="#fff" fontSize={18} fontWeight="500">
                            Chưa có lịch sử đặt tour!
                        </Text>
                        <Image source={images.empty} style={{ height: 250, width: 250, marginTop: 20 }} />
                    </Block>
                }
            />
        </View>
    );
}

const TourScreen = () => {
    const [selectedTab, setSelectedTab] = React.useState('Tab1');

    return (
        <Screen statusBarStyle="dark-content" unsafe>
            <LinearGradient colors={['#2F94A6', '#fff']} style={{ flex: 1 }} start={{ x: 0, y: 0 }}>
                <Header
                    iconLeft="black"
                    style={{ borderBottomWidth: 0, backgroundColor: '#fff', width: WIDTH_SCREEN }}
                    leftIcon
                    iconLeftSize={30}
                    onBack={() => StackActions.pop(1)}
                    titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#073F42' }}
                    headerText="Tour của tôi"
                />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Block color="white" direction="row" justifyContent="center">
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    selectedTab === 'Tab1' ? styles.selectedTab : null,
                                    { marginRight: 10 },
                                ]}
                                onPress={() => setSelectedTab('Tab1')}
                            >
                                <Text color={selectedTab === 'Tab1' ? '#309A94' : 'black'} style={styles.tabText}>
                                    Mới đặt
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tab, selectedTab === 'Tab2' ? styles.selectedTab : null]}
                                onPress={() => setSelectedTab('Tab2')}
                            >
                                <Text color={selectedTab === 'Tab2' ? '#309A94' : 'black'} style={styles.tabText}>
                                    Lịch sử
                                </Text>
                            </TouchableOpacity>
                        </Block>
                        {selectedTab === 'Tab1' ? <Tab1Screen /> : <Tab2Screen />}
                    </View>
                    {/* <Text fontSize={14}>Lộ trình bao gồm những điểm mà bạn đã chọn</Text>
                <Block
                    marginTop={16}
                    marginBottom={16}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Block direction="row" alignItems="center">
                        <Image style={{ height: 26, width: 26, marginRight: 6 }} source={images.point_tour} />
                        <Text color="#6B6B6B">Đã chọn 6 điểm</Text>
                    </Block>
                    <Text color="#6B6B6B">Tour gốc: 8 điểm</Text>
                </Block>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[1, 2, 3, 4]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item, index }) => <CardTour index={index} />}
                /> */}
                </View>
            </LinearGradient>
        </Screen>
    );
};

export default TourScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    header: {
        flex: 1,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: ColorDefault.button,
    },
    tabText: {
        textAlign: 'center',
        fontWeight: '500',
    },
    container: {
        flex: 1,
        padding: 20,
    },
});
