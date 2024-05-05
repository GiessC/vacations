import Albums, { AlbumsProps } from './Albums';

export interface HomeViewProps extends AlbumsProps {}

const HomeView = (props: HomeViewProps) => {
    return (
        <div className='m-auto w-1/2 min-h-full'>
            <Albums {...props} />
        </div>
    );
};

export default HomeView;
