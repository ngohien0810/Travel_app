import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    FlatList,
} from 'react-native';
import React from 'react';
import { Block, Icon, Screen, Text } from '@components';
import Header from '@layouts/Header';
import FastImage from 'react-native-fast-image';
import { images } from '@assets/image';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
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
const storyList = [
    {
        id: 1,
        name: 'Di sản đá, khoáng vật, khoáng sản',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    {
        id: 2,
        name: 'Story 2',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    {
        id: 3,
        name: 'Story 1',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    {
        id: 4,
        name: 'Story 2',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    {
        id: 5,
        name: 'Story 1',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    {
        id: 6,
        name: 'Story 2',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    {
        id: 7,
        name: 'Story 1',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    {
        id: 8,
        name: 'Story 2',
        image: require('../../../assets/image/source/bg_result_search.png'),
    },
    // ...
];

const NewsScreen = () => {
    return (
        <Screen statusBarStyle="dark-content" unsafe>
            <Header
                style={{ borderBottomWidth: 0 }}
                titleStyle={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#073F42' }}
                headerText="Tin tức"
            />
            <View style={styles.body}>
                <Block paddingVertical={16} paddingHorizontal={22}>
                    <View style={styles.container_search}>
                        <Icon color="rgba(107, 107, 107, 1)" icon="search" size={24} />
                        <TextInput
                            style={styles.input}
                            placeholder="Tìm kiếm tin tức"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </Block>
                <ScrollView
                    style={{ flexGrow: 0, paddingHorizontal: 14, paddingBottom: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {storyList.map((story) => (
                        <TouchableOpacity
                            key={story.id}
                            style={{
                                shadowColor: 'red',
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 1.22,

                                elevation: 2,
                            }}
                        >
                            <ImageBackground
                                source={story.image}
                                style={{
                                    width: 120,
                                    height: 170,
                                    marginRight: 16,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    justifyContent: 'flex-end',
                                    padding: 10,
                                    position: 'relative',
                                }}
                            >
                                <Block
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    bottom={0}
                                    color="rgba(0,0,0,.1)"
                                />
                                <Text color="white" fontWeight="600" style={{ zIndex: 10 }}>
                                    {story.name}
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Block padding={14} flex={1} paddingBottom={100}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }: any) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigate(APP_SCREEN.NEWS_DETAIL);
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
            </View>
        </Screen>
    );
};

export default NewsScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: 2,
        backgroundColor: '#fff',
    },
    container_search: {
        flexDirection: 'row',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(226, 226, 226, 1)',
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
});
