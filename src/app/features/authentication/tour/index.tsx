import CardTour from '@com/CardTour';
import MyCardTour from '@com/CardTour/MyTour';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { ColorDefault } from '@theme/color';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Tab1Screen() {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => <MyCardTour title="Demo tour cá nhân" index={index} />}
            />
        </View>
    );
}

function Tab2Screen() {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => <MyCardTour title="Demo tour cá nhân" index={index} />}
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
                    style={{ borderBottomWidth: 0 }}
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
