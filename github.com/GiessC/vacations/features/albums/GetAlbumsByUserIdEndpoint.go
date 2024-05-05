package albums

import (
	"log"
	"net/http"

	"github.com/giessc/vacations/features/albums/repositories"
	"github.com/giessc/vacations/helpers"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func GetAlbumsByUserId(context *gin.Context, container *dig.Container) {
	var albumRepository *repositories.AlbumRepository
	if err := container.Invoke(func(repository *repositories.AlbumRepository) {
		albumRepository = repository
	}); err != nil {
		log.Printf("Failed to invoke album repository: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}
	albums, err := albumRepository.GetAlbumsByUserId(context)
	if err != nil {
		log.Printf("Failed to get albums: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}

	helpers.SendResponse(http.StatusOK, "Success", context, helpers.WithItems(albums))
}
