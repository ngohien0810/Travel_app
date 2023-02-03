import { NetWorkService } from '@networking';

export const tourService = {
    getTourDetail: (id: any) =>
        NetWorkService.Get({
            url: `/tours/${id}`,
        }),
    updateViewTour: (id: any) =>
        NetWorkService.Get({
            url: `/update_view_tours/${id}`,
        }),
    createFeedback: (data: any) =>
        NetWorkService.Post({
            url: '/feedback',
            body: data,
        }),
};
