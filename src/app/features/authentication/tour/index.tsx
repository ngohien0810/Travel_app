import { FlatList, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { images } from '@assets/image';
import CardTour from './components/CardTour';

const TourScreen = () => {
    return (
        <Screen statusBarStyle="dark-content" unsafe>
            <Header
                titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#073F42' }}
                headerText="Lộ trình tour"
            />
            <View style={styles.body}>
                <Text fontSize={14}>Lộ trình bao gồm những điểm mà bạn đã chọn</Text>
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
                />
            </View>
        </Screen>
    );
};

export default TourScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 2,
        padding: 20,
    },
});
