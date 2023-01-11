import { NetWorkService } from '@networking';
export const authService = {
    login: (payload: { Phone: string; Password: string }) => {
        return NetWorkService.Post({
            url: '/login_app',
            body: payload,
        });
    },
    register: (payload: { Username: string; Email: string; Phone: string; Password: string }) => {
        return NetWorkService.Post({
            url: '/register',
            body: payload,
        });
    },
};
