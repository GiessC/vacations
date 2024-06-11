export default interface GetAlbumCoverUrlResponse {
    presignedUrl: string;
    method: string;
    signedHeader: string;
}
