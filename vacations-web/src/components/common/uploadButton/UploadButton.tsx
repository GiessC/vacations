import { Input } from '@/components/ui/input';
import Button from '../button/Button';
import { ArrowUpFromLine as UploadIcon } from 'lucide-react';
import { useRef } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

export interface UploadButtonProps<
    TFormValues extends FieldValues,
    TName extends FieldPath<TFormValues>,
> extends Partial<ControllerRenderProps<TFormValues, TName>> {
    acceptedMimeTypes?: string;
    multiple?: boolean;
}

const UploadButton = <
    TFormValues extends FieldValues,
    TName extends FieldPath<TFormValues>,
>({
    acceptedMimeTypes,
    multiple = false,
    ...props
}: UploadButtonProps<TFormValues, TName>) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    return (
        <Button
            onClick={() => {
                if (inputFileRef.current) {
                    inputFileRef.current.click();
                }
            }}
            role={undefined}
            tabIndex={-1}
        >
            <Input
                {...props}
                onChange={(event) => {
                    if (props.onChange) {
                        props.onChange(event.target.files);
                    }
                }}
                className='hidden'
                ref={inputFileRef}
                type='file'
                accept={acceptedMimeTypes}
                multiple={multiple}
            />
            <UploadIcon />
            Upload
        </Button>
    );
};

export default UploadButton;
