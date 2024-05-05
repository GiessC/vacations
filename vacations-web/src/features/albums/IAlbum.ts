export default interface IAlbum {
    albumId: string;
    albumSlug: string;
    name: string;
    description?: string;
    attendeeNames: string[];
    coverFileExtension?: string;
}
