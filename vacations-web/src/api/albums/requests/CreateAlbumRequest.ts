export default interface CreateAlbumRequest {
    name: string;
    description?: string;
    location: string;
    attendees: string[];
    coverFileExtension?: string;
}
