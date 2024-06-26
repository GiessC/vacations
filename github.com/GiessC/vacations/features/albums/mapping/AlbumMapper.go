package mapping

import (
	"github.com/giessc/vacations/features/albums/domain"
	"github.com/giessc/vacations/features/albums/dto"
	"github.com/google/uuid"
)

func MapAlbumToDynamoDBDto(album domain.Album) dto.AlbumDynamoDBDto {
	return dto.NewAlbumDynamoDBDto(
		album.AlbumId,
		album.UserId,
		album.Name,
		album.Description,
		album.Location,
		album.AttendeeNames,
		dto.WithCover(album.CoverFileExtension),
	)
}

func MapDynamoDBDtoToAlbum(albumDto dto.AlbumDynamoDBDto) domain.Album {
	return *domain.NewAlbum(
		uuid.MustParse(albumDto.UserId),
		albumDto.Name,
		albumDto.Description,
		albumDto.Location,
		albumDto.AttendeeNames,
		domain.WithID(albumDto.AlbumId),
		domain.WithSlug(albumDto.AlbumSlug),
		domain.WithTimestamps(albumDto.CreatedAt, albumDto.UpdatedAt),
		domain.WithCover(albumDto.CoverFileExtension),
	)
}
