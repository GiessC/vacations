import IAlbum from '@/features/albums/IAlbum';
import Typography from '../common/typography/Typography';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import { useAlbumCoverUrl } from '@/hooks/useAlbum';
import AlertContext from '@/context/AlertContext';

export interface AlbumCardProps {
    album: IAlbum;
}

class CaptionBuilder {
    private _caption: string;

    public constructor() {
        this._caption = '';
    }

    public withDescription(description?: string): CaptionBuilder {
        if (!description) return this;
        this._caption += `Description: ${description}.`;
        return this;
    }

    public withAttendeeNames(attendeeNames?: string[]): CaptionBuilder {
        if (!attendeeNames) return this;
        this._caption += `Attendees: ${attendeeNames.join(', ')}.`;
        return this;
    }

    public build(): string {
        return this._caption;
    }
}

const AlbumCard = ({ album }: AlbumCardProps) => {
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
        <Card>
            <CardHeader>
                <CardTitle>
                    <Typography variant='h3'>{album.name}</Typography>
                </CardTitle>
                <CardDescription>
                    <Typography variant='p'>
                        {new CaptionBuilder()
                            .withDescription(album.description)
                            .withAttendeeNames(album.attendeeNames)
                            .build()}
                    </Typography>
                </CardDescription>
                <CardContent>
                    {albumCoverUrlResponse && (
                        <img
                            alt={`${album.name} album cover`}
                            src={albumCoverUrlResponse.presignedUrl}
                        />
                    )}
                </CardContent>
            </CardHeader>
        </Card>
    );
};

export default AlbumCard;
