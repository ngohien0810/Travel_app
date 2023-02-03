import { NetWorkService } from '@networking';
export const authService = {
    login: (payload: { Phone: string; Password: string }) => {
        return NetWorkService.Post({
            url: '/login_app',
            body: payload,
        });
    },
    getUserInfo: (id: any) =>
        NetWorkService.Get({
            url: `/users/${id}`,
        }),
    register: (payload: { Username: string; Email: string; Phone: string; Password: string }) => {
        return NetWorkService.Post({
            url: '/register',
            body: payload,
        });
    },
};
