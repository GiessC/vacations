package albums

import (
	"log"
	"net/http"

	"github.com/giessc/vacations/errors/messages"
	"github.com/giessc/vacations/features/albums/services"
	"github.com/giessc/vacations/helpers"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.uber.org/dig"
)

type GetUploadCoverUrlRequest struct {
	FileExtension string
}

func GetUploadCoverUrl(context *gin.Context, container *dig.Container) {
	albumId := context.Params.ByName("albumId")
	albumSlug := context.Params.ByName("albumSlug")
	request := GetUploadCoverUrlRequest{}

	if err := context.ShouldBindWith(&request, binding.JSON); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusBadRequest, messages.BadRequest, context, helpers.WithError(messages.BadRequest))
		return
	}

	var albumService *services.AlbumService
	if err := container.Invoke(func(service *services.AlbumService) {
		albumService = service
	}); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}
	presignedUrl, err := albumService.GetUploadCoverUrl(context, albumId, albumSlug, request.FileExtension)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}

	helpers.SendResponse(http.StatusOK, messages.OK, context, helpers.WithItem(gin.H{
		"presignedUrl": presignedUrl,
	}))
}
