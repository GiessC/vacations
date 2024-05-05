import IconButton from '@/components/common/iconButton/IconButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 as DeleteIcon } from 'lucide-react';
import { ChangeEvent } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { CreateAlbumValues } from './CreateAlbumForm';

export interface AttendeesInputProps
    extends ControllerRenderProps<CreateAlbumValues, 'attendees'> {
    index: number;
}

const AttendeeNameInput = ({ index, ...field }: AttendeesInputProps) => {
    const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const { value: attendeeNames, onChange } = field;
        onChange(
            attendeeNames.map((name, i) => (i === index ? inputValue : name)),
        );
    };

    const handleDeleteAttendee = () => {
        const { value: attendeeNames, onChange } = field;
        onChange(attendeeNames.filter((_, i) => i !== index));
    };

    return (
        <div className='flex space-x-2'>
            <Input
                placeholder='Attendee Name'
                onChange={handleInputNameChange}
            />
            <IconButton
                onClick={handleDeleteAttendee}
                className='text-red-500'
                variant='outline'
            >
                <DeleteIcon className='w-5 h-5' />
            </IconButton>
        </div>
    );
};

const AttendeesInput = (
    field: ControllerRenderProps<CreateAlbumValues, 'attendees'>,
) => {
    const { value, onChange } = field;

    const addAttendee = () => {
        onChange([...value, '']);
    };

    return (
        <div className='flex flex-col space-y-2'>
            {value.map((_: string, index: number) => (
                <AttendeeNameInput
                    key={index}
                    index={index}
                    {...field}
                />
            ))}
            <Button
                onClick={addAttendee}
                variant='secondary'
            >
                Add Attendee
            </Button>
        </div>
    );
};

export default AttendeesInput;
