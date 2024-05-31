import Typography from '@/components/common/typography/Typography';
import IAlbum from './IAlbum';
import AlbumImage from './AlbumImage';
import LoadingIndicator from '@/components/common/loadingIndicator/LoadingIndicator';

export interface AlbumInfoProps {
    album?: IAlbum | null;
    error?: Error | null;
    isLoading?: boolean;
}

const AlbumInfo = ({ album, error, isLoading = false }: AlbumInfoProps) => {
    if (isLoading) {
        return <LoadingIndicator className='w-12 h-12' />;
    }

    if (error) {
        return <Typography variant='h3'>{error.message}</Typography>;
    }

    return (
        <div className='flex flex-row'>
            <Typography variant='h3'>{album?.name}</Typography>
            {album?.description && (
                <Typography variant='h4'>{album.description}</Typography>
            )}
            <Typography
                className='!m-0'
                variant='p'
            >
                {`Attendees: ${
                    album?.attendeeNames.join(', ') ?? 'Something went wrong.'
                }`}
            </Typography>
            {album?.location && (
                <Typography
                    className='!m-0'
                    variant='p'
                >{`Location: ${album.location}`}</Typography>
            )}
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-3 gap-4'>
                    {album?.imageIds.map((imageId) => (
                        <div
                            key={imageId}
                            className='w-full h-auto'
                        >
                            <AlbumImage
                                albumSlug={album.albumSlug!}
                                albumId={album.albumId!}
                                imageId={imageId}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlbumInfo;
