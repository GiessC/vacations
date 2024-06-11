import axios, { AxiosResponse } from 'axios';
import Api from '@/helpers/api/Api';
import UploadImageRequest from './requests/UploadImageRequest';
import BulkUploadImageRequest from './requests/BulkUploadImageRequest';

export default class ImageService {
    public async uploadImage({
        presignedUrl,
        file,
        setUploadProgress,
    }: UploadImageRequest): Promise<
        AxiosResponse<unknown, unknown> | undefined
    > {
        console.log(presignedUrl);
        return await axios.put(presignedUrl, file, {
            headers: Api.GetDefaultHeaders(),
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent?.total ?? 1),
                );
                setUploadProgress?.(percentCompleted);
            },
        });
    }

    public async bulkUploadImages({
        presignedUrl,
        images,
        setUploadProgress,
        mutateImageUpload,
    }: BulkUploadImageRequest): Promise<BulkUploadImageResponse> {
        const bulkResponse: BulkUploadImageResponse = {};
        const imageArray = Array.from(images);
        for (const image of imageArray) {
            const response = await mutateImageUpload({
                presignedUrl,
                file: image,
                setUploadProgress,
            });
            bulkResponse[image.name] = response;
        }
        return bulkResponse;
    }
}

export type BulkUploadImageResponse = Record<
    string,
    AxiosResponse<unknown, unknown> | undefined
>;
