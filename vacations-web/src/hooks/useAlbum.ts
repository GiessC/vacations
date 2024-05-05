import {
    CreateAlbumRequest,
    PutUploadCoverUrlRequest,
    createAlbum,
    getAlbumCoverUrl,
    getAlbums,
    putUploadCoverUrl,
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

export const useAlbumCoverUrl = (context: IAuthContext, album: IAlbum) => {
    return useQuery({
        queryKey: ['albumCoverUrl', context, album],
        queryFn: () => getAlbumCoverUrl(context, album),
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
        mutationFn: (request: PutUploadCoverUrlRequest) =>
            putUploadCoverUrl(context, request),
    });
};