import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';
import { APP_SCREEN } from './screen-types';
import { Home } from '@features/authentication/home';
import { createStackNavigator } from '@react-navigation/stack';
import TourScreen from '@features/authentication/tour';
import { WIDTH_SCREEN } from '@theme';
import { icons } from '@assets/icon';
import { images } from '@assets/image';
import FavoriteScreen from '@features/authentication/favorite';
import UserScreen from '@features/authentication/user';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabs: TabsConfigsType = {
    [APP_SCREEN.HOME]: {
        icon: ({ progress, focused }) => (
            <Image style={{ tintColor: focused ? '#21A8B0' : '#C2C2C2', height: 30, width: 30 }} source={images.home} />
        ),
        renderTitle: () => (
            <View>
                <Text>Trang chủ</Text>
            </View>
        ),
    },
    [APP_SCREEN.TOUR]: {
        icon: ({ progress, focused }) => (
            <Image style={{ tintColor: focused ? '#21A8B0' : '#C2C2C2', height: 30, width: 30 }} source={images.tour} />
        ),
        renderTitle: () => (
            <View>
                <Text>Lộ trình</Text>
            </View>
        ),
    },
    [APP_SCREEN.FAVORITE]: {
        icon: ({ progress, focused }) => (
            <Image
                style={{ tintColor: focused ? '#21A8B0' : '#C2C2C2', height: 30, width: 30 }}
                source={images.favorite}
            />
        ),
        renderTitle: () => (
            <View>
                <Text>Yêu thích</Text>
            </View>
        ),
    },
    [APP_SCREEN.USER]: {
        icon: ({ progress, focused }) => (
            <Image style={{ tintColor: focused ? '#21A8B0' : '#C2C2C2', height: 30, width: 30 }} source={images.user} />
        ),
        renderTitle: () => (
            <View>
                <Text>Tài khoản</Text>
            </View>
        ),
    },
};

const MainBottomTab = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
        }}
        tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} titleShown={true} barWidth={WIDTH_SCREEN} />}
    >
        <Tab.Screen name={APP_SCREEN.HOME} component={Home} />
        <Tab.Screen name={APP_SCREEN.TOUR} component={TourScreen} />
        <Tab.Screen name={APP_SCREEN.FAVORITE} component={FavoriteScreen} />
        <Tab.Screen name={APP_SCREEN.USER} component={UserScreen} />
    </Tab.Navigator>
);

const BottomTab = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
            children={<Stack.Screen name="Tab" component={MainBottomTab} />}
        />
    );
};

export default BottomTab;

const styles = StyleSheet.create({});
