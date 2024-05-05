import IconButton from '@/components/common/iconButton/IconButton';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { Plus as AddIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import CreateAlbumForm from './CreateAlbumForm';
import { CreateAlbumRequest } from '@/api/albums/albums';
import AuthContext from '@/context/AuthContext';
import { useCreateAlbum, useUploadCoverUrl } from '@/hooks/useAlbum';
import AlertContext from '@/context/AlertContext';
import { uploadImage } from '@/api/images/images';
import Button from '@/components/common/button/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { defaultFormConfig } from '@/helpers/forms/defaultFormConfig';

const FORM_ID = 'create-album-form';

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

export type CreateAlbumValues = z.infer<typeof schema>;

const DEFAULT_VALUES: CreateAlbumValues = {
    name: '',
    description: '',
    attendees: [''],
    cover: null,
};

const convertToRequest = (values: CreateAlbumValues): CreateAlbumRequest => ({
    name: values.name,
    description: values.description,
    attendees: values.attendees,
    coverFileExtension: values.cover?.name.split('.').pop() ?? undefined,
});

const CreateAlbumDialog = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const authContext = useContext(AuthContext);
    const { mutateAsync: getUploadCoverUrl } = useUploadCoverUrl(authContext);
    const { mutateAsync: createAlbum } = useCreateAlbum(authContext);
    const { showAlert } = useContext(AlertContext);
    const form = useForm<CreateAlbumValues>(
        defaultFormConfig<CreateAlbumValues>(schema, DEFAULT_VALUES),
    );
    const { formState, reset } = form;
    const { isSubmitting, isValid, isDirty } = formState;

    const onSubmit = async (values: CreateAlbumValues) => {
        try {
            const album = await createAlbum(convertToRequest(values));
            if (!album) {
                showAlert(
                    'Creation Failure',
                    'An unknown error occurred. Please try again.',
                    'error',
                );
                return;
            }
            if (!values.cover) {
                return;
            }
            const urlResponse = await getUploadCoverUrl({
                albumId: album.albumId,
                fileExtension: values.cover?.name.split('.').pop() ?? '',
            });
            if (!urlResponse) {
                showAlert(
                    'Upload Failure',
                    'Your album was created but the cover image failed to upload. You can try again by editing the album.',
                    'error',
                );
                return;
            }
            const { presignedUrl } = urlResponse;
            await uploadImage({
                presignedUrl,
                file: values.cover,
                setUploadProgress,
            });
        } catch (error: unknown) {
            // TODO: Handle errors
            console.error(String(error));
            showAlert(
                'Failed to create album',
                'An unknown error occurred. Please try again.',
                'error',
            );
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setUploadProgress(0);
            reset();
        }
    }, [isOpen, reset]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <IconButton
                onClick={() => setIsOpen(true)}
                variant='outline'
            >
                <AddIcon />
            </IconButton>
            <DialogContent>
                <DialogHeader>Create Album</DialogHeader>
                <CreateAlbumForm
                    form={form}
                    formId={FORM_ID}
                    onSubmit={onSubmit}
                    progress={uploadProgress}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type='button'
                            variant='secondary'
                            disabled={isSubmitting}
                        >
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        form={FORM_ID}
                        type='submit'
                        isLoading={isSubmitting}
                        disabled={!isValid || !isDirty || isSubmitting}
                    >
                        Create Album
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAlbumDialog;
