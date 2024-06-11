package albums

import (
	"log"
	"net/http"

	"github.com/giessc/vacations/errors/messages"
	"github.com/giessc/vacations/features/albums/domain"
	"github.com/giessc/vacations/features/albums/repositories"
	"github.com/giessc/vacations/features/auth"
	"github.com/giessc/vacations/helpers"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.uber.org/dig"
)

type CreateAlbumRequest struct {
	Name               string   `json:"name"`
	Description        string   `json:"description"`
	Location           string   `json:"location"`
	Attendees          []string `json:"attendees"`
	CoverFileExtension string   `json:"coverFileExtension"`
}

func CreateAlbum(context *gin.Context, container *dig.Container) {
	request := CreateAlbumRequest{}

	if err := context.ShouldBindWith(&request, binding.JSON); err != nil {
		log.Printf("Found invalid request: %v", err)
		helpers.SendResponse(http.StatusBadRequest, messages.BadRequest, context, helpers.WithError(messages.BadRequest))
		return
	}

	var albumRepository *repositories.AlbumRepository
	if err := container.Invoke(func(repository *repositories.AlbumRepository) {
		albumRepository = repository
	}); err != nil {
		log.Printf("Failed to invoke album repository: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}

	user := auth.GetCurrentUser(context)
	if user == nil {
		log.Println("Failed to get user from context")
		helpers.SendResponse(http.StatusUnauthorized, messages.Unauthorized, context, helpers.WithError(messages.Unauthorized))
		return
	}
	album := domain.NewAlbum(user.ID, request.Name, request.Description, request.Location, request.Attendees, domain.WithCover(request.CoverFileExtension))
	newAlbum, err := albumRepository.CreateAlbum(context, *album)
	if err != nil {
		log.Printf("Failed to create album: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, messages.InternalError, context, helpers.WithError(messages.InternalError))
		return
	}

	helpers.SendResponse(http.StatusOK, "Success", context, helpers.WithItem(*newAlbum))
}
