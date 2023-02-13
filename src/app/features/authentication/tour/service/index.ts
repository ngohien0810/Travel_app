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
    getDestination: (params: any) => {
        return NetWorkService.Get({
            url: '/destination',
            params,
        });
    },
    createFavouries: (tour_id: any, user_id: any) => {
        console.log(tour_id, user_id);
        return NetWorkService.Post({
            url: '/favourites',
            body: {
                Tour_Id: tour_id,
                User_Id: user_id,
            },
        });
    },
};
