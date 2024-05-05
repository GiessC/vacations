package albums

import (
	"log"
	"net/http"

	"github.com/giessc/vacations/features/albums/services"
	"github.com/giessc/vacations/helpers"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.uber.org/dig"
)

type PutUploadCoverUrlRequest struct {
	FileExtension string
}

func PutUploadCoverUrl(context *gin.Context, container *dig.Container) {
	albumId := context.Params.ByName("albumId")
	request := PutUploadCoverUrlRequest{}

	if err := context.ShouldBindWith(&request, binding.JSON); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusBadRequest, "Bad Request", context, helpers.WithError(err.Error()))
		return
	}

	var albumService *services.AlbumService
	if err := container.Invoke(func(service *services.AlbumService) {
		albumService = service
	}); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}
	presignedUrl, err := albumService.PutUploadCoverUrl(context, albumId, request.FileExtension)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}

	helpers.SendResponse(http.StatusOK, "Success", context, helpers.WithItem(gin.H{
		"presignedUrl": presignedUrl,
	}))
}
