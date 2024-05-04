import IAlbum from '@/features/albums/IAlbum';
import Typography from '../common/typography/Typography';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';

export interface AlbumCardProps {
    album: IAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Typography variant='h4'>{album.name}</Typography>
                </CardTitle>
                <CardDescription>
                    <Typography variant='p'>
                        {`${
                            album.description
                        }. Attendees: ${album.attendees.join(', ')}.`}
                    </Typography>
                </CardDescription>
                <CardContent>
                    <img
                        alt={`${album.name} album cover`}
                        src={album.coverUrl}
                    />
                </CardContent>
            </CardHeader>
        </Card>
    );
};

export default AlbumCard;
