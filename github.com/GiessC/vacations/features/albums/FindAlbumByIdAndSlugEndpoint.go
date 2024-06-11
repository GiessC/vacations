package albums

import (
	"log"
	"net/http"

	"github.com/giessc/vacations/errors/messages"
	"github.com/giessc/vacations/features/albums/repositories"
	"github.com/giessc/vacations/helpers"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func FindAlbumByIdAndSlug(context *gin.Context, container *dig.Container) {
	var albumRepository *repositories.AlbumRepository
	if err := container.Invoke(func(repository *repositories.AlbumRepository) {
		albumRepository = repository
	}); err != nil {
		log.Printf("Failed to invoke album repository: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}
	album, err := albumRepository.FindAlbumByIdAndSlug(context, context.Param("albumId"), context.Param("albumSlug"))
	if err != nil {
		log.Printf("Failed to get album: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}
	log.Printf("Found album: %+v", album)

	helpers.SendResponse(http.StatusOK, "Success", context, helpers.WithItem(album))
}
