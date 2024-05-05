export default interface IAlbum {
    albumId: string;
    albumSlug: string;
    name: string;
    description?: string;
    location: string;
    attendeeNames: string[];
    coverFileExtension?: string;
}
