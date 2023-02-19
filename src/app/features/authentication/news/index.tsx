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
import { newService } from './service';
import moment from 'moment';
import { useDebounce } from '@hooks';
import { ColorDefault } from '@theme/color';

const wait = (timeout: number) => {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

const Item = ({ item }: any) => (
    <Block direction="row" marginBottom={16}>
        <FastImage source={{ uri: item?.ImageUrl }} style={{ height: 120, width: 120, borderRadius: 8 }} />
        <Block padding={16} justifyContent="space-between" flex={1}>
            <Text numberOfLines={2} color="black" fontWeight="600">
                {item?.Title}
            </Text>
            <Text fontSize={13} color="#6B6B6B">
                {moment(item?.CreatedDate).utc().format('DD/MM/YYYY HH:mm')}
            </Text>
        </Block>
    </Block>
);

const NewsScreen = () => {
    const [categories, setCategories] = React.useState([]);
    const [news, setNews] = React.useState([]);
    const [search, setSeach] = React.useState('');
    const debounce = useDebounce(search, 500);

    const [category, setCategory] = React.useState<any>('');
    const [callback, setCallback] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        newService.getCategories().then((res: any) => {
            setCategories(res.data?.data);
        });
    }, []);

    React.useEffect(() => {
        setLoading(true);
        newService
            .getNews({ search: debounce, category, limit: 99 })
            .then((res: any) => {
                setNews(res.data?.data);
            })
            .finally(() => setLoading(false));
    }, [debounce, callback, category]);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setCallback(!callback);
        wait(1000).then(() => setRefreshing(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback]);

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
                            onChangeText={(text) => setSeach(text)}
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
                    {categories.map((story: any, index: number) => (
                        <TouchableOpacity
                            key={99 * index}
                            onPress={() => {
                                if (category === story.id) {
                                    setCategory('');
                                } else {
                                    setCategory(story.id);
                                }
                            }}
                            style={[
                                {
                                    shadowColor: 'red',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 1.22,

                                    elevation: 2,
                                },
                            ]}
                        >
                            <ImageBackground
                                loadingIndicatorSource={images.spin}
                                source={{
                                    uri: story?.ImageUrl,
                                }}
                                style={[
                                    {
                                        width: 120,
                                        height: 170,
                                        marginRight: 16,
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        justifyContent: 'flex-end',
                                        padding: 10,
                                        position: 'relative',
                                    },
                                    category === story.id && {
                                        borderWidth: 2,
                                        borderColor: ColorDefault.primary,
                                    },
                                ]}
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
                                    {story.Name}
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Block padding={14} flex={1} paddingBottom={100}>
                    {loading ? (
                        <Block flex={1} justifyContent="center" alignItems="center">
                            <Image style={{ height: 100, width: 100 }} source={images.spin} />
                        </Block>
                    ) : (
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            showsVerticalScrollIndicator={false}
                            data={news}
                            renderItem={({ item }: any) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigate(APP_SCREEN.NEWS_DETAIL, item);
                                    }}
                                >
                                    <Item item={item} />
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index: number) => (88 + index).toString()}
                            initialNumToRender={5}
                            maxToRenderPerBatch={1}
                            windowSize={5}
                            ListEmptyComponent={() => (
                                <Block justifyContent="center" alignItems="center">
                                    <Image source={images.empty} style={{ width: 250, height: 250 }} />
                                </Block>
                            )}
                        />
                    )}
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
