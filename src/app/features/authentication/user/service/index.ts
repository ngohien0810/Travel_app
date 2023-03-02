import { NetWorkService } from '@networking';

export const userService = {
    updateProfile: (payload: any) => {
        return NetWorkService.Post({
            url: '/profile',
            body: payload,
        });
    },
    changePassword: (payload: any) => {
        return NetWorkService.Post({
            url: '/change_password',
            body: payload,
        });
    },
};
