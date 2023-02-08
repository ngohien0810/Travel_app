import { images } from '@assets/image';
import { Block, Screen, Text } from '@components';
import Header from '@layouts/Header';
import React from 'react';
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
const data = [
    { key: 'A' },
    { key: 'B' },
    { key: 'C' },
    { key: 'C' },
    { key: 'C' },
    { key: 'C' },
    { key: 'C' },
    { key: 'C' },
    // Add more items here
];

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
const NewsDetailScreen = () => {
    return (
        <Screen unsafe scroll style={{ backgroundColor: '#fff' }}>
            <ImageBackground
                loadingIndicatorSource={images.spin}
                style={styles.header_tour_detail}
                resizeMode="center"
                source={images.bg_wallpaper}
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
                <Block padding={20}>
                    <Text fontSize={16} fontWeight="600" color="white">
                        Đại diện tỉnh Đắk Nông tham gia chương trình “Mentorship And Knowledge Exchange” tại Bồ Đào Nha
                    </Text>
                    <Block marginTop={10}>
                        <Text fontSize={12} color="white">
                            12/11/2019 09:15
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
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Text>Đây là box phía dưới</Text>
                <Block colorTheme="button" marginTop={10} marginBottom={10} height={0.5} />
                <Block paddingVertical={12}>
                    <Text fontWeight="600" fontSize={16} colorTheme="button">
                        Những tin tức liên quan
                    </Text>
                </Block>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }: any) => (
                        <TouchableOpacity
                            onPress={() => {
                                // navigate(APP_SCREEN.NEWS_DETAIL);
                            }}
                            key={index}
                        >
                            <Item title={item} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.key}
                    initialNumToRender={5}
                    maxToRenderPerBatch={1}
                    windowSize={5}
                />
            </Block>
        </Screen>
    );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
    header_tour_detail: {
        minHeight: 400,
        maxHeight: 400,
        width: '100%',
        justifyContent: 'space-between',
    },
});
