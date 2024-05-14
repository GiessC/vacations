import AlbumCard from '@/components/albums/AlbumCard';
import Typography from '@/components/common/typography/Typography';
import IAlbum from '@/features/albums/IAlbum';
import CreateAlbumDialog from '../../pages/index/CreateAlbumDialog';
import { useContext, useEffect } from 'react';
import AlertContext from '@/context/AlertContext';
import Loading from '@/components/common/loadingIndicator/Loading';
import Grid from '@mui/material/Unstable_Grid2';

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
            <Grid
                className='pt-4'
                container
                spacing={2}
            >
                {albums.map((album: IAlbum) => (
                    <Grid
                        xs={12}
                        sm={6}
                        lg={4}
                        xl={3}
                        key={album.albumId}
                    >
                        <AlbumCard
                            key={album.albumId}
                            className='w-full h-full'
                            album={album}
                        />
                    </Grid>
                ))}
            </Grid>
            {error && (
                <Typography variant='p'>
                    An error occurred while loading albums.
                </Typography>
            )}
        </div>
    );
};

export default Albums;
