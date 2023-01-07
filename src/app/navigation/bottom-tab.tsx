import { images } from '@assets/image';
import { Home } from '@features/authentication/home';
import TourScreen from '@features/authentication/tour';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { APP_SCREEN } from './screen-types';

import * as Animatable from 'react-native-animatable';
import FavoriteScreen from '@features/authentication/favorite';
import UserScreen from '@features/authentication/user';
import MapScreen from '@features/authentication/maps';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const animate1 = {
    0: { scale: 0.5, translateY: 20 },
    0.92: { translateY: -24 },
    1: { scale: 1.2, translateY: -10 },
};
const animate2 = { 0: { scale: 1.2, translateY: -10 }, 1: { scale: 1, translateY: 20 } };

const circle1 = {
    0: { scale: 0 },
    0.3: { scale: 0.3 },
    0.5: { scale: 0.5 },
    0.8: { scale: 0.7 },
    1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props: any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef: any = React.useRef(null);
    const circleRef: any = React.useRef(null);
    const textRef: any = React.useRef(null);

    React.useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
        }
    }, [focused]);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
            <Animatable.View ref={viewRef} duration={500} style={styles.container}>
                <View
                    style={[
                        styles.btn,
                        {
                            width: item?.label === 'Maps' ? 54 : 44,
                            height: item?.label === 'Maps' ? 54 : 44,
                        },
                    ]}
                >
                    <Animatable.View ref={circleRef} style={styles.circle} />
                    {/* <IconSvg
                        type={item.type}
                        name={item.inActiveIcon}
                        color={focused ? Colors.white : Colors.primary}
                    /> */}
                    <Image
                        style={{
                            tintColor: focused ? '#fff' : '#C2C2C2',
                            height: item?.label === 'Maps' ? 30 : 25,
                            width: item?.label === 'Maps' ? 30 : 25,
                        }}
                        source={item?.icon}
                    />
                </View>
                <Animatable.Text ref={textRef} style={styles.text}>
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    );
};
const BottomTabArr = [
    {
        route: APP_SCREEN.HOME,
        label: 'Trang chủ',
        icon: images.home,
        component: Home,
    },
    {
        route: APP_SCREEN.TOUR,
        label: 'Lịch trình',
        icon: images.tour,
        component: TourScreen,
    },
    {
        route: APP_SCREEN.MAPS,
        label: 'Maps',
        icon: images.maps,
        component: MapScreen,
    },
    {
        route: APP_SCREEN.FAVORITE,
        label: 'Yêu thích',
        icon: images.favorite,
        component: FavoriteScreen,
    },
    {
        route: APP_SCREEN.USER,
        label: 'Thông tin',
        icon: images.user,
        component: UserScreen,
    },
];

const MainBottomTab = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
        }}
    >
        {BottomTabArr.map((item, index) => {
            return (
                <Tab.Screen
                    key={index}
                    name={item.route}
                    component={item.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <TabButton {...props} item={item} />,
                    }}
                />
            );
        })}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        height: 70,
        position: 'absolute',
        bottom: 25,
        right: 16,
        left: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
    btn: {
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#fff',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#21A8B0',
        borderRadius: 25,
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: '#21A8B0',
    },
});
