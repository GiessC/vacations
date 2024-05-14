package domain

import (
	"github.com/google/uuid"
)

type AlbumOption func(*Album)

func WithID(albumId string) AlbumOption {
	return func(a *Album) {
		if albumId != "" {
			a.AlbumId = uuid.MustParse(albumId)
		}
	}
}

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

func WithSlug(slug string) AlbumOption {
	return func(a *Album) {
		if slug != "" {
			a.AlbumSlug = slug
		}
	}
}

type Album struct {
	AlbumId            uuid.UUID `json:"albumId"`
	AlbumSlug          string    `json:"albumSlug"`
	UserId             uuid.UUID `json:"userId"`
	Name               string    `json:"name"`
	Description        string    `json:"description"`
	Location           string    `json:"location"`
	AttendeeNames      []string  `json:"attendeeNames"`
	ImageIds           []string  `json:"imageIds"`
	CoverFileExtension string    `json:"coverFileExtension"`
	CreatedAt          string    `json:"createdAt"`
	UpdatedAt          string    `json:"updatedAt"`
}

func NewAlbum(userId uuid.UUID, name string, description string, location string, attendeeNames []string, opts ...AlbumOption) *Album {
	album := &Album{
		AlbumId:       uuid.New(),
		AlbumSlug:     "",
		UserId:        userId,
		Name:          name,
		Description:   description,
		Location:      location,
		AttendeeNames: attendeeNames,
		ImageIds:      []string{},
	}

	for _, opt := range opts {
		opt(album)
	}

	return album
}
