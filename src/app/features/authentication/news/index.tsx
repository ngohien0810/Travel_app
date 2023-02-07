import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Block, Icon, Screen, Text } from '@components';
import Header from '@layouts/Header';

const storyList = [
    {
        id: 1,
        name: 'Story 1',
        image: require('../../../assets/image/source/avatar.png'),
    },
    {
        id: 2,
        name: 'Story 2',
        image: require('../../../assets/image/source/avatar.png'),
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
                <Block padding={22}>
                    <View style={styles.container_search}>
                        <Icon color="rgba(107, 107, 107, 1)" icon="search" size={24} />
                        <TextInput
                            style={styles.input}
                            placeholder="Tìm kiếm tin tức"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </Block>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {storyList.map((story) => (
                        <TouchableOpacity key={story.id}>
                            <View style={{ width: 80, height: 80, marginRight: 16 }}>
                                <Image
                                    source={story.image}
                                    style={{ width: '100%', height: '100%', borderRadius: 999 }}
                                />
                                <Text style={{ fontSize: 12, marginTop: 8 }}>{story.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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
