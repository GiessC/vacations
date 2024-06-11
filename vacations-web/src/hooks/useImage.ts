import ImageService from '@/api/images/ImageService';
import BulkUploadImageRequest from '@/api/images/requests/BulkUploadImageRequest';
import UploadImageRequest from '@/api/images/requests/UploadImageRequest';
import { useMutation } from '@tanstack/react-query';

export const useImageUpload = () => {
    return useMutation({
        mutationKey: ['uploadImage'],
        mutationFn: async (request: UploadImageRequest) => {
            const service = new ImageService();
            return await service.uploadImage(request);
        },
    });
};

export const useBulkImageUpload = () => {
    return useMutation({
        mutationKey: ['uploadImage'],
        mutationFn: async (request: BulkUploadImageRequest) => {
            const service = new ImageService();
            return await service.bulkUploadImages(request);
        },
    });
};
