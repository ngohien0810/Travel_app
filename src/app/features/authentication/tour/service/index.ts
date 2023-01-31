import { NetWorkService } from '@networking';

export const tourService = {
    getTourDetail: (id: any) =>
        NetWorkService.Get({
            url: `/tours/${id}`,
        }),
};
