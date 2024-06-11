import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { AlbumImageUploadValues } from './AlbumImageUploadForm';
import UploadButton from '@/components/common/uploadButton/UploadButton';
import Typography from '@/components/common/typography/Typography';
import { Button } from '@/components/ui/button';
import ImageGrid from '@/components/common/imageGrid/ImageGrid';

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

    return (
        <div className='flex flex-col'>
            <Typography variant='h4'>Upload Image(s)</Typography>
            <div className='grid grid-cols-4'>
                <ImageGrid images={images} />
            </div>
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
