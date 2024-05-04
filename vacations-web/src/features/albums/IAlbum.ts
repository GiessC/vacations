export default interface IAlbum {
    id: number;
    name: string;
    description?: string;
    attendees: string[];
    coverUrl?: string;
}
