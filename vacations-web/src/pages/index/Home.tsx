import IAlbum from '@/features/albums/IAlbum';
import { useState } from 'react';
import HomeView from './HomeView';

const Home = () => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);

    return (
        <div>
            <HomeView albums={albums} />
        </div>
    );
};

export default Home;
