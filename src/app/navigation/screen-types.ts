import { StackScreenProps as RNStackScreenProps } from '@react-navigation/stack';

export enum APP_SCREEN {
    UN_AUTHORIZE = 'UN_AUTHORIZE',
    SPLASH = 'SPLASH',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',

    AUTHORIZE = 'AUTHORIZE',
    HOME = 'HOME',
    TOUR = 'TOUR',
    MAPS = 'MAPS',
    FAVORITE = 'FAVORITE',
    USER = 'USER',
    USER_CONTACT = 'USER_CONTACT',
    NEWS = 'NEWS',
    NEWS_DETAIL = 'NEWS_DETAIL',

    // screen not bottom tab
    SEARCH_RESULT = 'SEARCH_RESULT',
    TOUR_DETAIL = 'TOUR_DETAIL',
    ORDER = 'ORDER',
    CONTACT = 'CONTACT',
}

export type UnAuthorizeParamsList = {
    [APP_SCREEN.LOGIN]: undefined;
    [APP_SCREEN.REGISTER]: undefined;
    [APP_SCREEN.SPLASH]: undefined;
};

export type AuthorizeParamsList = {
    [APP_SCREEN.HOME]: undefined;
    [APP_SCREEN.TOUR]: undefined;
    [APP_SCREEN.SEARCH_RESULT]: undefined;
    [APP_SCREEN.TOUR_DETAIL]: undefined;
    [APP_SCREEN.ORDER]: undefined;
    [APP_SCREEN.CONTACT]: undefined;
    [APP_SCREEN.USER_CONTACT]: undefined;
};

export type RootStackParamList = {
    [APP_SCREEN.UN_AUTHORIZE]: undefined;
    [APP_SCREEN.AUTHORIZE]: undefined;
    [APP_SCREEN.TOUR_DETAIL]: any;
    [APP_SCREEN.NEWS_DETAIL]: any;
    [APP_SCREEN.MAPS]: any;
    [APP_SCREEN.SEARCH_RESULT]: any;
} & UnAuthorizeParamsList &
    AuthorizeParamsList;

export type StackScreenProps<T extends keyof RootStackParamList> = RNStackScreenProps<RootStackParamList, T>;
