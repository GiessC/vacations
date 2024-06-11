export default interface GetUploadImageUrlResponse {
    presignedUrl: string;
    method: string;
    signedHeader: string;
}
