import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ActionSheet, Block, LocalImage, Screen, Text, Wallpaper } from '@components';
import { images } from '@assets/image';
import { Rating } from 'react-native-ratings';
import Header from '../../../layouts/Header';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import CardTour from '@com/CardTour';

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
                    <TouchableOpacity onPress={() => navigate(APP_SCREEN.TOUR_DETAIL)}>
                        <CardTour title="demo" start_tour="12/12/2022" price="99.999" />
                    </TouchableOpacity>
                )}
            />
            {/* </ImageBackground> */}
            <ActionSheet ref={_refAction} title={'Select'} option={[{ text: 'Option1' }, { text: 'Option2' }]} />
        </Screen>
    );
};

export default ResultSearchScreen;

const styles = StyleSheet.create({});
