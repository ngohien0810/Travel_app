import CardTour from '@com/CardTour';
import { currencyFormat } from '@common';
import { ActionSheet, Screen, Text, Wallpaper } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Header from '../../../layouts/Header';
import { homeService } from '../home/service';

const ResultSearchScreen = ({ route }: any) => {
    const data = route.params;
    const [tours, setTours] = React.useState<any>([]);

    const _refAction = React.useRef<ActionSheet>();

    const _onShowAction = async () => {
        _refAction.current?.show();
    };

    React.useEffect(() => {
        homeService.getHotTour().then((res: any) => {
            setTours(res.data);
        });
    }, []);

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
                    data?.type === 'all_tour' ? (
                        <Text fontSize={16} color="#fff" center>
                            Danh sách tour
                        </Text>
                    ) : (
                        <View>
                            <Text fontSize={16} color="#fff" center>
                                Hạ Long
                            </Text>
                            <Text fontSize={16} color="#fff" center>
                                10/12/2022 - 15/12/2022
                            </Text>
                        </View>
                    )
                }
                leftIcon
                rightIcon="filter"
                onRightPress={_onShowAction}
            />
            <FlatList
                data={tours}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }: any) => (
                    <TouchableOpacity onPress={() => navigate(APP_SCREEN.TOUR_DETAIL, item)}>
                        <CardTour
                            tour_image={item?.ImageUrl}
                            title={item?.Title}
                            range_tour={item?.RangeTour}
                            rating={
                                item?.feedbacks?.length > 0
                                    ? (
                                          item?.feedbacks?.reduce((prev: any, curr: any) => {
                                              return prev + curr.Rate;
                                          }, 0) / item?.feedbacks?.length
                                      ).toFixed(1)
                                    : 0
                            }
                            start_tour={moment(item?.DateStartTour).format('HH:mm DD/MM/YYYY')}
                            price={currencyFormat(item?.TourPrice)}
                        />
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
