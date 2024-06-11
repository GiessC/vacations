import { useForm } from 'react-hook-form';
import AlbumImageUploadFormView from './AlbumImageUploadFormView';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { useBulkImageUpload, useImageUpload } from '@/hooks/useImage';
import { AxiosResponse } from 'axios';
import { useAlbumUploadUrl } from '@/hooks/useAlbum';
import IAlbum from './IAlbum';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import BulkUploadImageRequest from '@/api/images/requests/BulkUploadImageRequest';
import UploadImageRequest from '@/api/images/requests/UploadImageRequest';
import { BulkUploadImageResponse } from '@/api/images/ImageService';
import LoadingIndicator from '@/components/common/loadingIndicator/LoadingIndicator';

export interface IAlbumImageUploadValues {
    images?: FileList;
}

export class AlbumImageUploadValues implements IAlbumImageUploadValues {
    private readonly _images?: FileList;

    private constructor(images?: FileList) {
        this._images = images;
    }

    public static FromInterface(
        values: IAlbumImageUploadValues,
    ): AlbumImageUploadValues {
        return new AlbumImageUploadValues(values.images);
    }

    public ToRequest(
        presignedUrl: string,
        mutateImageUpload: UseMutateAsyncFunction<
            AxiosResponse<unknown, unknown> | undefined,
            Error,
            UploadImageRequest,
            unknown
        >,
        setUploadProgress?: (_progress: number) => void,
    ): BulkUploadImageRequest {
        if (!this._images) {
            throw new Error('No images were provided for upload.');
        }
        return {
            presignedUrl,
            images: this._images,
            setUploadProgress,
            mutateImageUpload,
        };
    }

    get images(): FileList | undefined {
        return this._images;
    }
}

const submit = async (
    presignedUrl: string,
    formValues: AlbumImageUploadValues,
    bulkUploadImage: UseMutateAsyncFunction<
        BulkUploadImageResponse,
        Error,
        BulkUploadImageRequest,
        unknown
    >,
    uploadImage: UseMutateAsyncFunction<
        AxiosResponse<unknown, unknown> | undefined,
        Error,
        UploadImageRequest,
        unknown
    >,
    setUploadProgress?: (_progress: number) => void,
) => {
    try {
        await bulkUploadImage(
            formValues.ToRequest(presignedUrl, uploadImage, setUploadProgress),
        );
    } catch (error: unknown) {
        console.error(error);
    }
};

export interface AlbumImageUploadFormProps {
    album: IAlbum;
}

const AlbumImageUploadForm = ({ album }: AlbumImageUploadFormProps) => {
    const form = useForm<AlbumImageUploadValues>({
        defaultValues: {},
    });
    const authContext = useContext(AuthContext);
    const { handleSubmit, watch } = form;
    const test = watch('images');
    const { data, isLoading, error } = useAlbumUploadUrl(authContext, album);
    const { mutateAsync: bulkUploadImages } = useBulkImageUpload();
    const { mutateAsync: uploadImage } = useImageUpload();

    const presignedUrl = data?.data?.item?.presignedUrl;

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!presignedUrl) {
        return <div>Failed to load presigned URL.</div>;
    }

    return (
        <form
            onSubmit={handleSubmit((formValues) =>
                submit(presignedUrl, formValues, bulkUploadImages, uploadImage),
            )}
        >
            <AlbumImageUploadFormView form={form} />
        </form>
    );
};

export default AlbumImageUploadForm;
