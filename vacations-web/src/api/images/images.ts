import config from '@/config/config';
import { getApi, getDefaultHeaders } from '@/helpers/api/apiMethods';
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

export interface GetUploadImagePresignedUrlRequest {
    albumId: string;
    albumSlug: string;
}

export const getUploadImagePresignedUrl = async ({
    albumId,
    albumSlug,
}: GetUploadImagePresignedUrlRequest): Promise<string> => {
    return await getApi();
};
