import { IAuthContext } from '@/context/AuthContext';
import IAlbum from '@/features/albums/IAlbum';
import { useMutation, useQuery } from '@tanstack/react-query';
import AlbumService from '../api/albums/AlbumService';
import CreateAlbumRequest from '@/api/albums/requests/CreateAlbumRequest';
import GetUploadCoverUrlRequest from '@/api/albums/requests/GetUploadCoverUrlRequest';

export const useAlbums = (context: IAuthContext) => {
    return useQuery({
        queryKey: ['albums', context],
        queryFn: async () => {
            const service = new AlbumService();
            return service.findMany(context);
        },
    });
};

export const useAlbum = (
    context: IAuthContext,
    albumId: string,
    albumSlug: string,
) => {
    return useQuery({
        queryKey: ['album', context, albumId, albumSlug],
        queryFn: async () => {
            const service = new AlbumService();
            return service.findOne(context, albumId, albumSlug);
        },
    });
};

export const useAlbumCoverUrl = (context: IAuthContext, album: IAlbum) => {
    return useQuery({
        queryKey: ['albumCoverUrl', context, album],
        queryFn: async () => {
            const service = new AlbumService();
            return service.getCoverUrl(context, album);
        },
        enabled: !!album.coverFileExtension,
    });
};

export const useCreateAlbum = (context: IAuthContext) => {
    return useMutation({
        mutationKey: ['createAlbum', context],
        mutationFn: async (request: CreateAlbumRequest) => {
            const service = new AlbumService();
            return service.create(context, request);
        },
    });
};

export const useUploadCoverUrl = (context: IAuthContext) => {
    return useMutation({
        mutationKey: ['postUploadCoverUrl', context],
        mutationFn: async (request: GetUploadCoverUrlRequest) => {
            const service = new AlbumService();
            return service.getUploadCoverUrl(context, request);
        },
    });
};

export const useAlbumUploadUrl = (
    context: IAuthContext,
    album: IAlbum,
    file: File,
) => {
    return useQuery({
        queryKey: ['albumUploadUrl', context, album],
        queryFn: async () => {
            const service = new AlbumService();
            return service.getUploadImageUrl(context, {
                albumId: album.albumId,
                albumSlug: album.albumSlug,
                fileName: file.name,
                fileExtension: file.type,
            });
        },
    });
};
