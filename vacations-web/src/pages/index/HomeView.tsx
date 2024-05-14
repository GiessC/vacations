import Albums, { AlbumsProps } from '../../features/albums/Albums';

export interface HomeViewProps extends AlbumsProps {}

const HomeView = (props: HomeViewProps) => {
    return (
        <div className='m-auto px-2 xs:px-12 sm:px-48 xl:px-96 h-full'>
            <Albums {...props} />
        </div>
    );
};

export default HomeView;
