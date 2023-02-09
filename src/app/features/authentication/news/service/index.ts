import { NetWorkService } from '@networking';

export const newService = {
    getCategories: () =>
        NetWorkService.Get({
            url: '/categories',
        }),
    getNews: (params: any) =>
        NetWorkService.Get({
            url: '/news',
            params,
        }),
};
