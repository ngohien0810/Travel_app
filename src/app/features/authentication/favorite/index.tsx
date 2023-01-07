import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Screen } from '@components';
import Header from '@layouts/Header';
import LinearGradient from 'react-native-linear-gradient';
import CardTour from '@com/CardTour';

const FavoriteScreen = () => {
    return (
        <Screen unsafe>
            <LinearGradient colors={['#2F94A6', '#fff']} style={{ flex: 1 }} start={{ x: 0, y: 0 }}>
                <Header
                    style={{ backgroundColor: 'transparent' }}
                    titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff' }}
                    headerText="Tour yêu thích"
                />

                <View style={styles.body}>
                    <FlatList
                        style={{ paddingTop: 6 }}
                        showsVerticalScrollIndicator={false}
                        data={[1, 2, 3, 4, 5, 6]}
                        keyExtractor={(item) => item.toString()}
                        renderItem={() => {
                            return <CardTour title="demo" start_tour="12/12/2022" price="99.999" />;
                        }}
                    />
                </View>
            </LinearGradient>
        </Screen>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    body: {
        marginTop: 2,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        paddingHorizontal: 10,
        paddingBottom: 100,
        paddingTop: 6,
    },
});
