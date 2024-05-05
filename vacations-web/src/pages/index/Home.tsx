import { useContext } from 'react';
import HomeView from './HomeView';
import { useAlbums } from '@/hooks/useAlbum';
import AuthContext from '@/context/AuthContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {
        data: albums,
        error: albumsError,
        isLoading: areAlbumsLoading,
    } = useAlbums(authContext);

    return (
        <div>
            <HomeView
                albums={albums ?? []}
                error={albumsError}
                isLoading={areAlbumsLoading}
            />
        </div>
    );
};

export default Home;
