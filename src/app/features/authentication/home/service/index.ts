import { NetWorkService } from '@networking';
import AxiosClient from '@apis/AxiosClient';

export const homeService = {
    getHotTour: () => {
        return AxiosClient.get('/tours');
    },
    getNews: () => {
        return AxiosClient.get('/news');
    },
    getFavouries: (user_id: any) => {
        console.log('user_id', user_id);
        return NetWorkService.Get({
            url: '/favourites',
            params: {
                user_id,
            },
        });
    },
};
