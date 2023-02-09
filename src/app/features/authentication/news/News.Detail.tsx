import { images } from '@assets/image';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import { WIDTH_SCREEN } from '@theme';
import moment from 'moment';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';
import { wait } from '../home';

const Item = ({ title }: any) => (
    <Block direction="row" marginBottom={16}>
        <FastImage source={images.bg_wallpaper} style={{ height: 120, width: 120, borderRadius: 8 }} />
        <Block padding={16} justifyContent="space-between" flex={1}>
            <Text numberOfLines={2} color="black" fontWeight="600">
                Đại diện tỉnh Đắk Nông tham gia chương trình “Mentorship And Knowledge Exchange” tại Bồ Đào Nha
            </Text>
            <Text fontSize={13} color="#6B6B6B">
                12/11/2019 09:15
            </Text>
        </Block>
    </Block>
);
const NewsDetailScreen = ({ route }: any) => {
    const [loading, setLoading] = React.useState(false);

    const data = route.params;
    console.log('🚀 ~ file: News.Detail.tsx:29 ~ NewsDetailScreen ~ data', data);
    React.useEffect(() => {
        setLoading(true);
        wait(1000).then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Screen dialogLoading={loading} unsafe scroll style={{ backgroundColor: '#fff' }}>
            <ImageBackground
                loadingIndicatorSource={images.spin}
                style={styles.header_tour_detail}
                resizeMode="cover"
                source={data?.ImageUrl ? { uri: data?.ImageUrl } : images.spin}
            >
                <Header
                    style={{
                        backgroundColor: 'transparent',
                        marginBottom: 10,
                        borderBottomColor: '#fff',
                    }}
                    leftIconStyled={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 999,
                    }}
                    iconLeft="#222"
                    leftIcon
                />
                <Block padding={24} color="rgba(0,0,0,.2)">
                    <Text fontSize={16} fontWeight="bold" color="white">
                        {data?.Title}
                    </Text>
                    <Block marginTop={10}>
                        <Text fontSize={13} fontWeight="500" color="white">
                            {moment(data?.CreatedDate).format('YYYY-MM-DD HH:mm')}
                        </Text>
                    </Block>
                </Block>
            </ImageBackground>
            <Block
                padding={20}
                flex={1}
                color="white"
                marginTop={-10}
                borderTopRightRadius={18}
                borderTopLeftRadius={18}
            >
                <RenderHTML
                    contentWidth={WIDTH_SCREEN}
                    source={{
                        html: data?.Description,
                    }}
                />

                <Block colorTheme="button" marginTop={10} marginBottom={10} height={0.5} />
                <Block paddingVertical={12} marginBottom={16}>
                    <Text fontWeight="600" fontSize={16} colorTheme="button">
                        Những tin tức liên quan
                    </Text>
                </Block>
                {/* {data?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // navigate(APP_SCREEN.NEWS_DETAIL);
                            }}
                            key={index}
                        >
                            <Item title={item} />
                        </TouchableOpacity>
                    );
                })} */}
            </Block>
        </Screen>
    );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
    header_tour_detail: {
        minHeight: 400,
        maxHeight: 400,
        width: WIDTH_SCREEN,
        justifyContent: 'space-between',
    },
});
