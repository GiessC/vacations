export default interface UploadImageRequest {
    presignedUrl: string;
    file: File;
    setUploadProgress?: (_progress: number) => void;
}
