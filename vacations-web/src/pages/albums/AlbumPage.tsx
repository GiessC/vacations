import { Card, CardContent } from '@/components/ui/card';
import AuthContext from '@/context/AuthContext';
import AlbumImageUploadForm from '@/features/albums/AlbumImageUploadForm';
import AlbumInfo from '@/features/albums/AlbumInfo';
import { useAlbum } from '@/hooks/useAlbum';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

export interface AlbumPageProps {
    className?: string;
}

const AlbumPage = ({ className = '' }: AlbumPageProps) => {
    const { albumId, albumSlug } = useParams();
    const authContext = useContext(AuthContext);
    const {
        data: album,
        error,
        isLoading,
    } = useAlbum(authContext, albumId!, albumSlug!);

    return (
        <div className='flex justify-center h-full'>
            <Card
                className={`m-auto w-3/4 bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl ${className}`}
            >
                <CardContent className='flex flex-col gap-4 p-6'>
                    <AlbumInfo
                        album={album}
                        error={error}
                        isLoading={isLoading}
                    />
                    <AlbumImageUploadForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default AlbumPage;
