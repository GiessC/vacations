import IAlbum from '@/features/albums/IAlbum';
import Typography from '../common/typography/Typography';
import { Card, CardContent } from '../ui/card';
import { useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import { useAlbumCoverUrl } from '@/hooks/useAlbum';
import AlertContext from '@/context/AlertContext';
import { Badge } from '../ui/badge';

export interface AlbumCardProps {
    className?: string;
    album: IAlbum;
}

// class CaptionBuilder {
//     private _caption: string;

//     public constructor() {
//         this._caption = '';
//     }

//     public withDescription(description?: string): CaptionBuilder {
//         if (!description) return this;
//         this._caption += `Description: ${description}.`;
//         return this;
//     }

//     public withAttendeeNames(attendeeNames?: string[]): CaptionBuilder {
//         if (!attendeeNames) return this;
//         this._caption += `Attendees: ${attendeeNames.join(', ')}.`;
//         return this;
//     }

//     public build(): string {
//         return this._caption;
//     }
// }

const getAlbumPath = (album: IAlbum) => {
    return `/albums/${album.albumSlug}/${album.albumId}`;
};

const AlbumCard = ({ className = '', album }: AlbumCardProps) => {
    const authContext = useContext(AuthContext);

    const { data: albumCoverUrlResponse, error: albumCoverError } =
        useAlbumCoverUrl(authContext, album);
    const { showAlert } = useContext(AlertContext);

    useEffect(() => {
        if (albumCoverError) {
            console.error('Error loading album cover:', albumCoverError);
            showAlert(
                'Failed to load album cover',
                albumCoverError.message,
                'error',
            );
        }
    }, [albumCoverError, showAlert]);

    return (
        <Card
            className={`w-1/3 bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl ${className}`}
        >
            <a
                className='text-inherit no-underline'
                href={getAlbumPath(album)}
                rel='noopener noreferrer'
                target='_blank'
            >
                <CardContent className='flex flex-col items-center gap-4 p-6'>
                    <div className='flex flex-row space-x-2'>
                        <Typography
                            className='text-lg font-semibold'
                            variant='h2'
                        >
                            {album.name}
                        </Typography>
                        <Badge
                            className='max-h-8 text-xs'
                            variant='secondary'
                        >
                            {album.location}
                        </Badge>
                    </div>
                    <div>
                        {albumCoverUrlResponse && (
                            <img
                                alt={`${album.name} album cover`}
                                src={albumCoverUrlResponse.presignedUrl}
                                className='w-40 h-40 rounded-md object-cover'
                            />
                        )}
                    </div>
                </CardContent>
            </a>
        </Card>
    );
};

export default AlbumCard;
