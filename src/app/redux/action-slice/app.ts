import { SLICE_NAME } from '@config/type';
import { AppState } from '@model/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@theme';

const initialAppState: AppState = {
    internetState: true,
    profile: undefined,
    token: undefined,
    /**
     * default true to load app
     */
    loadingApp: false,
    showDialog: false,
    theme: 'default',
    favouries: [],
    callbackFavouries: false,
    tourView: [],
};
const appSlice = createSlice({
    name: SLICE_NAME.APP,
    initialState: initialAppState,
    reducers: {
        setInternetState: (state, { payload }: PayloadAction<boolean>) => {
            state.internetState = payload;
        },
        setToken: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
        },
        setAppProfile: (state, { payload }: PayloadAction<unknown>) => {
            state.profile = payload;
        },
        setAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
            state.theme = payload;
        },
        startLoadApp: (state) => {
            state.loadingApp = true;
        },
        endLoadApp: (state) => {
            state.loadingApp = false;
        },
        startProcess: (state) => {
            state.showDialog = true;
        },
        endProcess: (state) => {
            state.showDialog = false;
        },
        logout: (state) => {
            state.token = undefined;
            state.profile = undefined;
        },
        setFavouries: (state, { payload }) => {
            state.favouries = payload;
        },
        setCallbackFavouries: (state) => {
            state.callbackFavouries = !state?.callbackFavouries;
        },
        setTourView: (state, { payload }) => {
            // check if tourView not exist in payload
            const exitsTourview = state.tourView?.some((item: any) => item.id === payload.id);
            if (exitsTourview) {
                return;
            } else {
                state.tourView = [...state?.tourView, payload];
            }
        },
    },
});
export const { reducer: appReducer, actions: appActions } = appSlice;
