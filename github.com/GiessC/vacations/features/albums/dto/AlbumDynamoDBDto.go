package dto

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/gosimple/slug"
)

type AlbumDynamoDBDtoOption func(*AlbumDynamoDBDto)

func WithCover(fileExtension string) AlbumDynamoDBDtoOption {
	return func(a *AlbumDynamoDBDto) {
		a.CoverFileExtension = fileExtension
	}
}

type AlbumDynamoDBDto struct {
	Pk                 string   `dynamodbav:"pk"`
	Sk                 string   `dynamodbav:"sk"`
	AlbumId            string   `dynamodbav:"albumId"`
	UserId             string   `dynamodbav:"userId"`
	Name               string   `dynamodbav:"name"`
	Description        string   `dynamodbav:"description"`
	AttendeeNames      []string `dynamodbav:"attendeeNames,stringset"`
	CoverFileExtension string   `dynamodbav:"coverFileExtension"`
	CreatedAt          string   `dynamodbav:"createdAt"`
	UpdatedAt          string   `dynamodbav:"updatedAt"`
}

func GetAlbumDtoPk(userId string) string {
	return fmt.Sprintf("album#user#%s", userId)
}

func GetAlbumDtoSk(albumId string, slug string) string {
	return fmt.Sprintf("album#%s#slug#%s", albumId, slug)
}

func NewAlbumDynamoDBDto(albumId uuid.UUID, userId uuid.UUID, name string, description string, attendeeNames []string, opts ...AlbumDynamoDBDtoOption) AlbumDynamoDBDto {
	slug := slug.Make(name)
	pk := GetAlbumDtoPk(userId.String())
	sk := GetAlbumDtoSk(albumId.String(), slug)

	dto := AlbumDynamoDBDto{
		Pk:            pk,
		Sk:            sk,
		AlbumId:       albumId.String(),
		UserId:        userId.String(),
		Name:          name,
		Description:   description,
		AttendeeNames: attendeeNames,
		CreatedAt:     time.Now().UTC().String(),
		UpdatedAt:     time.Now().UTC().String(),
	}

	for _, opt := range opts {
		opt(&dto)
	}

	return dto
}
