import { NetWorkService } from '@networking';

export const newService = {
    getCategories: () =>
        NetWorkService.Get({
            url: '/categories',
            params: {
                Status: 1,
            },
        }),
    getNews: (params: any) =>
        NetWorkService.Get({
            url: '/news',
            params: {
                ...params,
                Status: 1,
            },
        }),
};
