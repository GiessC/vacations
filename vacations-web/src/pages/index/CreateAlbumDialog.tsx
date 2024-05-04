import IconButton from '@/components/common/iconButton/IconButton';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { Plus as AddIcon } from 'lucide-react';
import { useState } from 'react';
import CreateAlbumForm from './CreateAlbumForm';

const FORM_ID = 'create-album-form';

// TODO: Change to more descriptive function name
const submit = () => {};

const CreateAlbumDialog = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                    formId={FORM_ID}
                    onSubmit={submit}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type='button'
                            variant='secondary'
                        >
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        form={FORM_ID}
                        type='submit'
                    >
                        Create Album
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAlbumDialog;
