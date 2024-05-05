import { getDefaultHeaders } from '@/helpers/api/apiMethods';
import axios, { AxiosResponse } from 'axios';

export interface UploadImageRequest {
    presignedUrl: string;
    file: File;
    setUploadProgress?: (_progress: number) => void;
}

export const uploadImage = async ({
    presignedUrl,
    file,
    setUploadProgress,
}: UploadImageRequest): Promise<AxiosResponse<unknown, unknown>> => {
    console.log(presignedUrl);
    return await axios.put(presignedUrl, file, {
        headers: getDefaultHeaders(),
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent?.total ?? 1),
            );
            setUploadProgress?.(percentCompleted);
        },
    });
};
