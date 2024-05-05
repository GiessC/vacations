import { IAuthContext } from '@/context/AuthContext';
import IAlbum from '@/features/albums/IAlbum';
import { getApi, postApi, putApi } from '@/helpers/api/apiMethods';

const path = '/albums';

export const getAlbums = async (
    context: IAuthContext,
): Promise<IAlbum[] | undefined> => {
    const response = await getApi<IAlbum>(context, path);
    return response?.data?.items;
};

export interface GetAlbumCoverUrlResponse {
    presignedUrl: string;
}

export const getAlbumCoverUrl = async (
    context: IAuthContext,
    album: IAlbum,
): Promise<GetAlbumCoverUrlResponse | undefined> => {
    const response = await getApi<GetAlbumCoverUrlResponse>(
        context,
        `${path}/${album.albumId}/cover`,
        {
            fileExtension: album.coverFileExtension,
        },
    );
    return response?.data?.item;
};

export interface CreateAlbumRequest {
    name: string;
    description?: string;
    attendees: string[];
    coverFileExtension?: string;
}

export const createAlbum = async (
    context: IAuthContext,
    request: CreateAlbumRequest,
): Promise<IAlbum | undefined> => {
    const response = await postApi<IAlbum>(context, path, request);
    return response?.data?.item;
};

export interface PutUploadCoverUrlRequest {
    albumId: string;
    fileExtension: string;
}

export interface PutUploadCoverUrlResponse {
    presignedUrl: string;
}

export const putUploadCoverUrl = async (
    context: IAuthContext,
    { albumId, ...request }: PutUploadCoverUrlRequest,
): Promise<PutUploadCoverUrlResponse | undefined> => {
    const response = await putApi<PutUploadCoverUrlResponse>(
        context,
        `${path}/${albumId}/cover`,
        request,
    );
    return response?.data?.item;
};
