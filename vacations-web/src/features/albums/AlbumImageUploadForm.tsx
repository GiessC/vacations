import { useForm } from 'react-hook-form';
import AlbumImageUploadFormView from './AlbumImageUploadFormView';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { useImageUpload } from '@/hooks/useImage';
import { AxiosResponse } from 'axios';
import { UploadImageRequest } from '@/api/images/images';

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

    get images(): FileList | undefined {
        return this._images;
    }
}

const submit = async (
    formValues: IAlbumImageUploadValues,
    mutateAsync: UseMutateAsyncFunction<
        AxiosResponse<unknown, unknown>,
        Error,
        UploadImageRequest,
        unknown
    >,
) => {
    try {
        await mutateAsync(formData);
    } catch (error: unknown) {
        console.error(error);
    }
};

const AlbumImageUploadForm = () => {
    const form = useForm<AlbumImageUploadValues>({
        defaultValues: {},
    });
    const { handleSubmit } = form;
    const { mutateAsync } = useImageUpload();

    return (
        <form
            onSubmit={handleSubmit((formValues) =>
                submit(formValues, mutateAsync),
            )}
        >
            <AlbumImageUploadFormView form={form} />
        </form>
    );
};

export default AlbumImageUploadForm;
