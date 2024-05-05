package domain

import (
	"github.com/google/uuid"
)

type AlbumOption func(*Album)

func WithTimestamps(createdAt string, updatedAt string) AlbumOption {
	return func(a *Album) {
		if createdAt != "" {
			a.CreatedAt = createdAt
		}
		if updatedAt != "" {
			a.UpdatedAt = updatedAt
		}
	}
}

func WithCover(fileExtension string) AlbumOption {
	return func(a *Album) {
		if fileExtension != "" {
			a.CoverFileExtension = fileExtension
		}
	}
}

type Album struct {
	AlbumId            uuid.UUID `json:"albumId"`
	UserId             uuid.UUID `json:"userId"`
	Name               string    `json:"name"`
	Description        string    `json:"description"`
	AttendeeNames      []string  `json:"attendeeNames"`
	CoverFileExtension string    `json:"coverFileExtension"`
	CreatedAt          string    `json:"createdAt"`
	UpdatedAt          string    `json:"updatedAt"`
}

func NewAlbum(userId uuid.UUID, name string, description string, attendeeNames []string, opts ...AlbumOption) *Album {
	album := &Album{
		AlbumId:       uuid.New(),
		UserId:        userId,
		Name:          name,
		Description:   description,
		AttendeeNames: attendeeNames,
	}

	for _, opt := range opts {
		opt(album)
	}

	return album
}
