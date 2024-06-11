import { UseMutateAsyncFunction } from '@tanstack/react-query';
import UploadImageRequest from './UploadImageRequest';
import { AxiosResponse } from 'axios';

export default interface BulkUploadImageRequest {
    presignedUrl: string;
    images: FileList;
    setUploadProgress?: (_progress: number) => void;
    mutateImageUpload: UseMutateAsyncFunction<
        AxiosResponse<unknown, unknown> | undefined,
        Error,
        UploadImageRequest,
        unknown
    >;
}
