import AlbumCard from '@/components/albums/AlbumCard';
import Typography from '@/components/common/typography/Typography';
import IAlbum from '@/features/albums/IAlbum';
import CreateAlbumDialog from './CreateAlbumDialog';
import { useContext, useEffect } from 'react';
import AlertContext from '@/context/AlertContext';
import Loading from '@/components/common/loadingIndicator/Loading';

export interface AlbumsProps {
    className?: string;
    albums: IAlbum[];
    error?: Error | null;
    isLoading?: boolean;
}

const Albums = ({
    className = '',
    albums,
    error,
    isLoading = false,
}: AlbumsProps) => {
    const { showAlert } = useContext(AlertContext);

    useEffect(() => {
        if (error) {
            console.error(error);
            showAlert(
                "Couldn't load albums.",
                'An error occurred while loading albums.',
                'error',
            );
        }
    }, [error, showAlert]);

    console.log(albums);

    return (
        <div className={`flex flex-col ${className} min-h-full`}>
            <div className='flex space-x-4'>
                <Typography variant='h2'>Albums</Typography>
                <CreateAlbumDialog />
            </div>
            {isLoading && (
                <Loading
                    isLoading={isLoading && !error}
                    ariaLabel='Loading albums'
                >
                    {albums.length === 0 && (
                        <Typography variant='p'>No albums found.</Typography>
                    )}
                </Loading>
            )}
            <div className='flex flex-col pt-2 space-x-4'></div>
            <div>
                {albums.map((album: IAlbum) => (
                    <AlbumCard
                        key={album.albumId}
                        album={album}
                    />
                ))}
            </div>
            {error && (
                <Typography variant='p'>
                    An error occurred while loading albums.
                </Typography>
            )}
        </div>
    );
};

export default Albums;
