import { NetWorkService } from '@networking';

export const orderService = {
    createOrder: (payload: any) => {
        return NetWorkService.Post({
            url: '/orders',
            body: payload,
        });
    },
    createContact: (payload: any) => {
        return NetWorkService.Post({
            url: '/contact',
            body: payload,
        });
    },
};
