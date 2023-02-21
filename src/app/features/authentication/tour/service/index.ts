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
    deleteFavourites: (tour_id: any) => {
        return NetWorkService.Delete({
            url: `/favourites/${tour_id}`,
        });
    },
    deleteOrder: (id: any) => {
        return NetWorkService.Delete({
            url: `/orders/${id}`,
        });
    },

    getTourOrder: (params: any) => {
        return NetWorkService.Get({
            url: '/orders',
            params,
        });
    },
    changeStatusTour: (id: any) => {
        return NetWorkService.Put({
            url: `/ordersStatus/${id}`,
            body: {
                tourStatus: 1,
            },
        });
    },
};
