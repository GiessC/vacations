export interface ImageGridProps {
    images?: FileList;
}

const ImageGrid = ({ images }: ImageGridProps) => {
    return Array.from(images ?? []).map((image) => (
        <img
            className='rounded-md object-cover'
            key={image.name}
            src={URL.createObjectURL(image)}
            alt={image.name}
        />
        // TODO: Add a delete button to remove the image from the grid
        // TODO: Put these in a view component that flows well - a grid with the images resized to fit would work, or MUI's masonry component (preferred)
    ));
};

export default ImageGrid;
