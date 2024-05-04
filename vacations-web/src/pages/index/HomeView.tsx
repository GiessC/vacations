import IAlbum from '@/features/albums/IAlbum';
import Albums from './Albums';

export interface HomeViewProps {
    albums: IAlbum[];
}

const HomeView = ({ albums }: HomeViewProps) => {
    return (
        <div className='m-auto w-1/2'>
            <Albums albums={albums} />
        </div>
    );
};

export default HomeView;
