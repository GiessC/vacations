import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormErrorMessage from '@/helpers/forms/form-views/FormErrorMessage';
import { ControllerRenderProps } from '@/helpers/react-hook-form';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import AttendeesInput from './AttendeesInput';
import { Progress } from '@/components/ui/progress';
import { CreateAlbumValues } from './CreateAlbumDialog';

export interface CreateAlbumFormProps {
    form: UseFormReturn<CreateAlbumValues>;
    formId: string;
    onSubmit: SubmitHandler<CreateAlbumValues>;
    progress: number;
}

const CreateAlbumForm = ({
    form,
    formId,
    onSubmit,
    progress,
}: CreateAlbumFormProps) => {
    const { handleSubmit, control, formState } = form;
    const { defaultValues, errors } = formState;

    return (
        <Form {...form}>
            <form
                id={formId}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    name='name'
                    control={control}
                    defaultValue={defaultValues?.name}
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
                    defaultValue={defaultValues?.description}
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
                    defaultValue={defaultValues?.cover}
                    render={({
                        field,
                    }: ControllerRenderProps<CreateAlbumValues, 'cover'>) => {
                        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                        const { value, onChange, ...rest } = field;
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
                                <Progress value={progress} />
                            </FormItem>
                        );
                    }}
                />
            </form>
        </Form>
    );
};

export default CreateAlbumForm;
