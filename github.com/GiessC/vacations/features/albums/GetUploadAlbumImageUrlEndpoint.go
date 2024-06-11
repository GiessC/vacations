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

// TODO: We fucked up. We can only upload a single picture with a single presigned URL.

type GetUploadAlbumImagesUrlRequest struct {
	FileName      string
	FileExtension string
}

type GetUploadAlbumImagesUrlResponse struct {
	PresignedUrl string `json:"presignedUrl"`
}

// TODO: Validate so the request cannot have '.', '/', '\', '<', '>', ':', '"', '|', '?', or '*' in the filename and file extension
func GetUploadAlbumImagesUrl(context *gin.Context, container *dig.Container) {
	albumId := context.Params.ByName("albumId")
	albumSlug := context.Params.ByName("albumSlug")
	request := GetUploadAlbumImagesUrlRequest{}
	log.Printf("Hello")

	if err := context.ShouldBindWith(&request, binding.JSON); err != nil {
		// TODO: Improve error messages here. It just says EOF
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusBadRequest, messages.BadRequest, context, helpers.WithError(messages.BadRequest))
		return
	}
	log.Printf("%s%s%v", albumId, albumSlug, request)

	var albumService *services.AlbumService
	if err := container.Invoke(func(service *services.AlbumService) {
		albumService = service
	}); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}
	presignedUrl, err := albumService.GetUploadAlbumImageUrl(context, albumId, albumSlug, request.FileName, request.FileExtension)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}

	helpers.SendResponse(http.StatusOK, messages.OK, context, helpers.WithItem(GetUploadAlbumImagesUrlResponse{
		PresignedUrl: presignedUrl,
	}))
}
