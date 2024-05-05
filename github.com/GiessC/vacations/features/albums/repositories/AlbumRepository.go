package repositories

import (
	"context"
	"errors"

	"github.com/giessc/vacations/features/albums/domain"
	"github.com/giessc/vacations/features/albums/providers"
	"github.com/giessc/vacations/features/auth"
)

type AlbumRepository struct {
	dbProvider *providers.AlbumDynamoDBProvider
}

func NewAlbumRepository(dbProvider *providers.AlbumDynamoDBProvider) *AlbumRepository {
	return &AlbumRepository{
		dbProvider: dbProvider,
	}
}

func (repository AlbumRepository) CreateAlbum(context context.Context, album domain.Album) (*domain.Album, error) {
	newAlbum, err := repository.dbProvider.CreateAlbum(context, album)
	if err != nil {
		return nil, err
	}
	return newAlbum, nil
}

func (repository AlbumRepository) GetAlbumsByUserId(context context.Context) ([]domain.Album, error) {
	user := auth.GetCurrentUser(context)
	if user == nil {
		return nil, errors.New("failed to get user from context")
	}

	newAlbum, err := repository.dbProvider.GetAlbumsByUserId(context, user.ID)
	if err != nil {
		return nil, err
	}
	return newAlbum, nil
}

func (repository AlbumRepository) FindAlbumByIdAndSlug(context context.Context, albumId string, albumSlug string) (*domain.Album, error) {
	newAlbum, err := repository.dbProvider.FindAlbumByIdAndSlug(context, albumId, albumSlug)
	if err != nil {
		return nil, err
	}
	return newAlbum, nil
}

func (repository AlbumRepository) AlbumExists(context context.Context, albumId string, albumSlug string) (bool, error) {
	newAlbum, err := repository.dbProvider.FindAlbumByIdAndSlug(context, albumId, albumSlug)
	if err != nil {
		return false, err
	}
	if newAlbum == nil {
		return false, nil
	}
	return true, nil
}
