export default interface GetUploadCoverUrlResponse {
    presignedUrl: string;
    method: string;
    signedHeader: string;
}
