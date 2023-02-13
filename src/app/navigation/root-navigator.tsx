import React, { useEffect } from 'react';

import NewsDetailScreen from '@features/authentication/news/News.Detail';
import OrderScreen from '@features/authentication/order';
import ContactScreen from '@features/authentication/order/Contact';
import ResultSearchScreen from '@features/authentication/result_search';
import TourDetailScreen from '@features/authentication/tour/Tour.Detail';
import UserContact from '@features/authentication/user/User.Contact';
import { Login } from '@features/un-authentication/login';
import { AppModule } from '@native-module';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { createStackNavigator } from '@react-navigation/stack';
import { selectAppProfile, selectAppToken } from '@redux-selector/app';
import BootSplash from 'react-native-bootsplash';
import { useSelector } from 'react-redux';
import BottomTab from './bottom-tab';
import TourScreen from '@features/authentication/tour';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
    // state
    const token = useSelector(selectAppProfile);

    // effect
    useEffect(() => {
        const id = setTimeout(() => {
            BootSplash.hide({ fade: true });
        }, 1000);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (!token) {
            // clean cache when logout
            AppModule.clearCache();
        }
    }, [token]);

    // render
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {token === undefined ? (
                <RootStack.Group
                    screenOptions={{
                        animationTypeForReplace: 'pop',
                    }}
                >
                    <RootStack.Screen name={APP_SCREEN.LOGIN} component={Login} />
                </RootStack.Group>
            ) : (
                <RootStack.Group>
                    <RootStack.Screen name={APP_SCREEN.AUTHORIZE} component={BottomTab} />
                    <RootStack.Screen name={APP_SCREEN.SEARCH_RESULT} component={ResultSearchScreen} />
                    <RootStack.Screen name={APP_SCREEN.TOUR} component={TourScreen} />
                    <RootStack.Screen name={APP_SCREEN.TOUR_DETAIL} component={TourDetailScreen} />
                    <RootStack.Screen name={APP_SCREEN.NEWS_DETAIL} component={NewsDetailScreen} />
                    <RootStack.Screen name={APP_SCREEN.ORDER} component={OrderScreen} />
                    <RootStack.Screen name={APP_SCREEN.CONTACT} component={ContactScreen} />
                    <RootStack.Screen name={APP_SCREEN.USER_CONTACT} component={UserContact} />
                </RootStack.Group>
            )}
        </RootStack.Navigator>
    );
};
