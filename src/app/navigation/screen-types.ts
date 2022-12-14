import { StackScreenProps as RNStackScreenProps } from '@react-navigation/stack';

export enum APP_SCREEN {
    UN_AUTHORIZE = 'UN_AUTHORIZE',
    SPLASH = 'SPLASH',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',

    AUTHORIZE = 'AUTHORIZE',
    HOME = 'HOME',
    TOUR = 'TOUR',
    FAVORITE = 'FAVORITE',
    USER = 'USER',

    // screen not bottom tab
    SEARCH_RESULT = 'SEARCH_RESULT',
    TOUR_DETAIL = 'TOUR_DETAIL',
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
};

export type RootStackParamList = {
    [APP_SCREEN.UN_AUTHORIZE]: undefined;
    [APP_SCREEN.AUTHORIZE]: undefined;
} & UnAuthorizeParamsList &
    AuthorizeParamsList;

export type StackScreenProps<T extends keyof RootStackParamList> = RNStackScreenProps<RootStackParamList, T>;
