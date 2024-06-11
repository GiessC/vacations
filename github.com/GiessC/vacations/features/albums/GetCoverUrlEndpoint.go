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

type GetCoverUrlRequest struct {
	FileExtension string `form:"fileExtension" json:"fileExtension" binding:"required"`
}

func GetCoverUrl(context *gin.Context, container *dig.Container) {
	albumId := context.Params.ByName("albumId")
	albumSlug := context.Params.ByName("albumSlug")
	request := GetCoverUrlRequest{}

	if err := context.ShouldBindWith(&request, binding.Form); err != nil {
		log.Printf("Bad Request: %v", err)
		helpers.SendResponse(http.StatusBadRequest, "Bad Request", context, helpers.WithError(messages.BadRequest))
		return
	}
	log.Printf("Request: %+v", request)

	var albumService *services.AlbumService
	if err := container.Invoke(func(service *services.AlbumService) {
		albumService = service
	}); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}

	log.Printf("Verifying album exists: %v, %v", albumId, albumSlug)
	exists, err := albumService.VerifyAlbumExists(context, albumId, albumSlug)
	if err != nil {
		log.Printf("Error verifying album exists: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}
	if !exists {
		log.Printf("Album does not exist")
		helpers.SendResponse(http.StatusNotFound, messages.NotFound, context, helpers.WithError("Album does not exist"))
		return
	}

	presignedUrl, err := albumService.GetCoverUrl(context, albumId, request.FileExtension)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}

	helpers.SendResponse(http.StatusOK, messages.OK, context, helpers.WithItem(gin.H{
		"presignedUrl": presignedUrl,
	}))
}
