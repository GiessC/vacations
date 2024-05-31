import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { AlbumImageUploadValues } from './AlbumImageUploadForm';
import UploadButton from '@/components/common/uploadButton/UploadButton';
import Typography from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';

export interface AlbumImageUploadFormViewProps<
    TTransformedValues extends FieldValues | undefined = undefined,
    TContext = unknown,
> {
    form: UseFormReturn<AlbumImageUploadValues, TContext, TTransformedValues>;
}

const AlbumImageUploadFormView = <
    TTransformedValues extends FieldValues | undefined,
    TContext = unknown,
>({
    form,
}: AlbumImageUploadFormViewProps<TTransformedValues, TContext>) => {
    const { watch, control } = form;
    const images = watch('images');

    const createImageElements = () => {
        const imageElements = [];
        for (let i = 0; i < (images?.length ?? 0); i++) {
            const url = URL.createObjectURL(images![i]);
            imageElements.push(
                <img
                    className='rounded-md object-cover'
                    key={images![i].name}
                    src={url}
                    alt={images![i].name}
                />,
            );
        }
        return imageElements;
    };

    return (
        <div className='flex flex-col'>
            <Typography variant='h4'>Upload Image(s)</Typography>
            <div className='grid grid-cols-4'>{createImageElements()}</div>
            <div className='flex space-x-2'>
                <Controller
                    name='images'
                    control={control}
                    render={({ field }) => {
                        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                        const { ref, value, ...rest } = field;
                        return (
                            <UploadButton
                                {...rest}
                                multiple
                            />
                        );
                    }}
                />
                <Button type='submit'>Submit</Button>
            </div>
        </div>
    );
};

export default AlbumImageUploadFormView;
