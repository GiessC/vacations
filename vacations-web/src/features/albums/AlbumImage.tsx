export interface AlbumImageProps {
    albumSlug: string;
    albumId: string;
    imageId: string;
}

const AlbumImage = ({ albumSlug, albumId, imageId }: AlbumImageProps) => {
    const image = {}; // TODO: Implement API to get image from DDB
    const url = ''; // TODO: Implement API to get presigned URL

    console.log(image, albumSlug, albumId, imageId);

    return (
        <img
            src={url}
            alt={'Temporary'}
            className='w-full h-auto'
        />
    );
};

export default AlbumImage;
