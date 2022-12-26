import { NetWorkService } from '@networking';

export const homeService = {
    getHotTour: () => {
        return NetWorkService.Get({
            url: '/tours',
        });
    },
};
