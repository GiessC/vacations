import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { defaultFormConfig } from '@/helpers/forms/defaultFormConfig';
import FormErrorMessage from '@/helpers/forms/form-views/FormErrorMessage';
import { ControllerRenderProps } from '@/helpers/react-hook-form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import AttendeesInput from './AttendeesInput';

export interface CreateAlbumValues extends FieldValues {
    name: string;
    description?: string;
    attendees: string[];
    cover: File | null; // This should be an image from file upload
}

export interface CreateAlbumFormProps {
    formId: string;
    onSubmit: SubmitHandler<CreateAlbumValues>;
}

const schema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().optional(),
    attendees: z
        .array(z.string())
        .min(1, { message: 'At least one attendee is required.' })
        .refine(
            (attendees: string[]) => {
                return attendees.every(
                    (attendee) => attendee.trim().length > 0,
                );
            },
            { message: 'Attendee names cannot be empty.' },
        ),
    cover: z.instanceof(File).nullable(),
});

const DEFAULT_VALUES: CreateAlbumValues = {
    name: '',
    description: '',
    attendees: [''],
    cover: null,
};

const CreateAlbumForm = ({ formId, onSubmit }: CreateAlbumFormProps) => {
    const form = useForm<CreateAlbumValues>(
        defaultFormConfig<CreateAlbumValues>(schema, DEFAULT_VALUES),
    );
    const { handleSubmit, control, formState } = form;
    const { errors } = formState;

    return (
        <Form {...form}>
            <form
                id={formId}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    name='name'
                    control={control}
                    defaultValue={DEFAULT_VALUES.name}
                    render={({
                        field,
                    }: ControllerRenderProps<CreateAlbumValues, 'name'>) => {
                        return (
                            <FormItem>
                                <FormLabel>Album Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Album Name'
                                        {...field}
                                    />
                                </FormControl>
                                <FormErrorMessage error={errors.name} />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    name='description'
                    control={control}
                    defaultValue={DEFAULT_VALUES.description}
                    render={({
                        field,
                    }: ControllerRenderProps<
                        CreateAlbumValues,
                        'description'
                    >) => {
                        return (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Description (optional)'
                                        {...field}
                                    />
                                </FormControl>
                                <FormErrorMessage error={errors.description} />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    name='attendees'
                    control={control}
                    defaultValue={DEFAULT_VALUES.attendees}
                    render={({
                        field,
                    }: ControllerRenderProps<
                        CreateAlbumValues,
                        'attendees'
                    >) => {
                        return (
                            <FormItem>
                                <FormLabel>Attendees</FormLabel>
                                <FormControl>
                                    <AttendeesInput {...field} />
                                </FormControl>
                                <FormErrorMessage error={errors.attendees} />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    name='cover'
                    control={control}
                    defaultValue={DEFAULT_VALUES.cover}
                    render={({
                        field,
                    }: ControllerRenderProps<CreateAlbumValues, 'cover'>) => {
                        const { value: _, onChange, ...rest } = field;
                        return (
                            <FormItem>
                                <FormLabel htmlFor='cover'>Cover</FormLabel>
                                <FormControl>
                                    <Input
                                        {...rest}
                                        id='cover'
                                        type='file'
                                        onChange={(event) => {
                                            onChange(event.target.files?.[0]);
                                        }}
                                    />
                                </FormControl>
                                <FormErrorMessage error={errors.cover} />
                            </FormItem>
                        );
                    }}
                />
            </form>
        </Form>
    );
};

export default CreateAlbumForm;
