import {
    CreateAlbumRequest,
    GetUploadCoverUrlRequest,
    createAlbum,
    getAlbum,
    getAlbumCoverUrl,
    getAlbums,
    getUploadCoverUrl,
} from '@/api/albums/albums';
import { IAuthContext } from '@/context/AuthContext';
import IAlbum from '@/features/albums/IAlbum';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useAlbums = (context: IAuthContext) => {
    return useQuery({
        queryKey: ['albums', context],
        queryFn: () => getAlbums(context),
    });
};

export const useAlbum = (
    context: IAuthContext,
    albumId: string,
    albumSlug: string,
) => {
    return useQuery({
        queryKey: ['album', context, albumId, albumSlug],
        queryFn: () => getAlbum(context, albumId, albumSlug),
    });
};

export const useAlbumCoverUrl = (context: IAuthContext, album: IAlbum) => {
    return useQuery({
        queryKey: ['albumCoverUrl', context, album],
        queryFn: () => getAlbumCoverUrl(context, album),
        enabled: !!album.coverFileExtension,
    });
};

export const useCreateAlbum = (context: IAuthContext) => {
    return useMutation({
        mutationKey: ['createAlbum', context],
        mutationFn: (request: CreateAlbumRequest) =>
            createAlbum(context, request),
    });
};

export const useUploadCoverUrl = (context: IAuthContext) => {
    return useMutation({
        mutationKey: ['postUploadCoverUrl', context],
        mutationFn: (request: GetUploadCoverUrlRequest) =>
            getUploadCoverUrl(context, request),
    });
};
