import AlbumCard from '@/components/albums/AlbumCard';
import Typography from '@/components/common/typography/Typography';
import IAlbum from '@/features/albums/IAlbum';
import CreateAlbumDialog from './CreateAlbumDialog';

export interface AlbumsProps {
    className?: string;
    albums: IAlbum[];
}

const Albums = ({ className = '', albums }: AlbumsProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className='flex space-x-4'>
                <Typography variant='h2'>Albums</Typography>
                <CreateAlbumDialog />
            </div>
            {albums.length === 0 && (
                <Typography variant='p'>No albums found.</Typography>
            )}
            {albums.map((album: IAlbum) => (
                <AlbumCard
                    key={album.id}
                    album={album}
                />
            ))}
        </div>
    );
};

export default Albums;
