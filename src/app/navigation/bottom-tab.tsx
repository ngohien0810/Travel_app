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
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabs: TabsConfigsType = {
    [APP_SCREEN.HOME]: {
        icon: ({ progress, focused }) => (
            <Image style={{ tintColor: focused ? 'red' : 'green' }} source={icons.bullet} />
        ),
    },
    [APP_SCREEN.TOUR]: {
        icon: ({ progress, focused }) => (
            <Image style={{ tintColor: focused ? 'red' : 'green' }} source={icons.bullet} />
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
