import { IAuthContext } from '@/context/AuthContext';
import IAlbum from '@/features/albums/IAlbum';
import Api from '@/helpers/api/Api';
import CreateAlbumRequest from './requests/CreateAlbumRequest';
import GetUploadCoverUrlResponse from './responses/GetUploadCoverUrlResponse';
import GetUploadCoverUrlRequest from './requests/GetUploadCoverUrlRequest';
import GetAlbumCoverUrlResponse from './responses/GetAlbumCoverUrlResponse';
import { ApiResponse } from '../models/ApiResponse';
import { AxiosResponse } from 'axios';
import GetUploadImageUrlResponse from './responses/GetUploadImageUrlResponse';
import GetUploadImageUrlRequest from './requests/GetUploadImageUrlRequest';

export default class AlbumService {
    private static readonly PATH = '/albums';

    public async findOne(
        context: IAuthContext,
        albumId: string,
        albumSlug: string,
    ): Promise<IAlbum | null> {
        const response = await Api.Get<IAlbum>(
            context,
            `${AlbumService.PATH}/${albumSlug}/${albumId}`,
        );
        return response?.data?.item ?? null;
    }

    public async findMany(context: IAuthContext): Promise<IAlbum[]> {
        const response = await Api.Get<IAlbum>(context, AlbumService.PATH);
        return response?.data?.items ?? [];
    }

    public async getCoverUrl(
        context: IAuthContext,
        album: IAlbum,
    ): Promise<GetAlbumCoverUrlResponse | null> {
        const response = await Api.Get<GetAlbumCoverUrlResponse>(
            context,
            `${AlbumService.PATH}/${album.albumSlug}/${album.albumId}/cover`,
            {
                fileExtension: album.coverFileExtension,
            },
        );
        return response?.data?.item ?? null;
    }

    public async getUploadCoverUrl(
        context: IAuthContext,
        { albumId, albumSlug, ...request }: GetUploadCoverUrlRequest,
    ): Promise<GetUploadCoverUrlResponse | null> {
        const response = await Api.Get<GetUploadCoverUrlResponse>(
            context,
            `${AlbumService.PATH}/${albumSlug}/${albumId}/cover/upload`,
            request,
        );
        return response?.data?.item ?? null;
    }

    public async getUploadImageUrl(
        context: IAuthContext,
        { albumId, albumSlug, ...body }: GetUploadImageUrlRequest,
    ): Promise<AxiosResponse<
        ApiResponse<GetUploadImageUrlResponse> | undefined
    > | null> {
        return (
            (await Api.Get(
                context,
                `/albums/${albumSlug}/${albumId}/upload`,
                body,
            )) ?? null
        );
    }

    public async create(
        context: IAuthContext,
        request: CreateAlbumRequest,
    ): Promise<IAlbum | null> {
        const response = await Api.Post<IAlbum>(
            context,
            AlbumService.PATH,
            request,
        );
        return response?.data?.item ?? null;
    }
}
