import { IAuthContext } from '@/context/AuthContext';
import IAlbum from '@/features/albums/IAlbum';
import { getApi, postApi, putApi } from '@/helpers/api/apiMethods';

const path = '/albums';

export const getAlbum = async (
    context: IAuthContext,
    albumId: string,
    albumSlug: string,
): Promise<IAlbum | null> => {
    const response = await getApi<IAlbum>(
        context,
        `${path}/${albumSlug}/${albumId}`,
    );
    return response?.data?.item ?? null;
};

export const getAlbums = async (context: IAuthContext): Promise<IAlbum[]> => {
    const response = await getApi<IAlbum>(context, path);
    return response?.data?.items ?? [];
};

export interface GetAlbumCoverUrlResponse {
    presignedUrl: string;
    method: string;
    signedHeader: string;
}

export const getAlbumCoverUrl = async (
    context: IAuthContext,
    album: IAlbum,
): Promise<GetAlbumCoverUrlResponse | null> => {
    const response = await getApi<GetAlbumCoverUrlResponse>(
        context,
        `${path}/${album.albumSlug}/${album.albumId}/cover`,
        {
            fileExtension: album.coverFileExtension,
        },
    );
    return response?.data?.item ?? null;
};

export interface CreateAlbumRequest {
    name: string;
    description?: string;
    location: string;
    attendees: string[];
    coverFileExtension?: string;
}

export const createAlbum = async (
    context: IAuthContext,
    request: CreateAlbumRequest,
): Promise<IAlbum | null> => {
    const response = await postApi<IAlbum>(context, path, request);
    return response?.data?.item ?? null;
};

export interface PutUploadCoverUrlRequest {
    albumId: string;
    fileExtension: string;
}

export interface PutUploadCoverUrlResponse {
    presignedUrl: string;
    method: string;
    signedHeader: string;
}

export const putUploadCoverUrl = async (
    context: IAuthContext,
    { albumId, ...request }: PutUploadCoverUrlRequest,
): Promise<PutUploadCoverUrlResponse | null> => {
    const response = await putApi<PutUploadCoverUrlResponse>(
        context,
        `${path}/${albumId}/cover`,
        request,
    );
    return response?.data?.item ?? null;
};
