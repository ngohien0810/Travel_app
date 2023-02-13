import CardTour from '@com/CardTour';
import { currencyFormat } from '@common';
import { Screen } from '@components';
import Header from '@layouts/Header';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { selectAppFavouries } from '@redux-selector/app';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const FavoriteScreen = () => {
    const favouries: any = useSelector(selectAppFavouries);
    console.log('🚀 ~ file: index.tsx:16 ~ FavoriteScreen ~ favouries', favouries);

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
                        data={favouries}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={({ item }: any) => (
                            <TouchableOpacity onPress={() => navigate(APP_SCREEN.TOUR_DETAIL, item?.tour)}>
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
                                    start_tour={moment(item?.tour?.DateStartTour).format('HH:mm DD/MM/YYYY')}
                                    price={currencyFormat(item?.tour?.TourPrice)}
                                />
                            </TouchableOpacity>
                        )}
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
