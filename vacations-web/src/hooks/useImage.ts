import { uploadImage } from '@/api/images/images';
import { useMutation } from '@tanstack/react-query';

export const useImageUpload = () => {
    return useMutation({
        mutationKey: ['uploadImage'],
        mutationFn: uploadImage,
    });
};
