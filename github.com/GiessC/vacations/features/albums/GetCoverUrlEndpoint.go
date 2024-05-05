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

type GetUploadCoverUrlRequest struct {
	FileExtension string `form:"fileExtension"`
}

func GetUploadCoverUrl(context *gin.Context, container *dig.Container) {
	albumId := context.Params.ByName("albumId")
	albumSlug := context.Params.ByName("albumSlug")
	request := GetUploadCoverUrlRequest{}

	if err := context.ShouldBindWith(&request, binding.Form); err != nil {
		log.Printf("Bad Request: %v", err)
		helpers.SendResponse(http.StatusBadRequest, "Bad Request", context, helpers.WithError(err.Error()))
		return
	}
	log.Printf("Request: %+v", request)

	var albumService *services.AlbumService
	if err := container.Invoke(func(service *services.AlbumService) {
		albumService = service
	}); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}

	log.Printf("Verifying album exists: %v, %v", albumId, albumSlug)
	exists, err := albumService.VerifyAlbumExists(context, albumId, albumSlug)
	if err != nil {
		log.Printf("Error verifying album exists: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}
	if !exists {
		log.Printf("Album does not exist")
		helpers.SendResponse(http.StatusNotFound, "Not Found", context, helpers.WithError("Album does not exist"))
		return
	}

	presignedUrl, err := albumService.GetCoverUrl(context, albumId, request.FileExtension)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}

	helpers.SendResponse(http.StatusOK, "Success", context, helpers.WithItem(gin.H{
		"presignedUrl": presignedUrl,
	}))
}
