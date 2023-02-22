import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectAppConfig = createDeepEqualSelector(
    (state: RootState) => state.app,
    (app) => ({
        loadingApp: app.loadingApp,
        showDialog: app.showDialog,
        theme: app.theme,
        callbackFavouries: app.callbackFavouries,
    })
);

export const selectAppToken = createDeepEqualSelector(
    (state: RootState) => state.app,
    (app) => app.token
);

export const selectAppProfile = createDeepEqualSelector(
    (state: RootState) => state.app,
    (app) => app.profile
);

export const selectAppFavouries = createDeepEqualSelector(
    (state: RootState) => state.app,
    (app) => app.favouries
);

export const selectAppTourView = createDeepEqualSelector(
    (state: RootState) => state.app,
    (app) => app.tourView
);
