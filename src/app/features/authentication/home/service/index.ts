import AxiosClient from '@apis/AxiosClient';

export const homeService = {
    getHotTour: () => {
        return AxiosClient.get('/tours');
    },
};
