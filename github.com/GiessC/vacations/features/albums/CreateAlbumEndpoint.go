package albums

import (
	"log"
	"net/http"

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
	Attendees          []string `json:"attendees"`
	CoverFileExtension string   `json:"coverFileExtension"`
}

func CreateAlbum(context *gin.Context, container *dig.Container) {
	request := CreateAlbumRequest{}

	if err := context.ShouldBindWith(&request, binding.JSON); err != nil {
		log.Printf("Found invalid request: %v", err)
		helpers.SendResponse(http.StatusBadRequest, "Bad Request", context, helpers.WithError(err.Error()))
		return
	}

	var albumRepository *repositories.AlbumRepository
	if err := container.Invoke(func(repository *repositories.AlbumRepository) {
		albumRepository = repository
	}); err != nil {
		log.Printf("Failed to invoke album repository: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}

	user := auth.GetCurrentUser(context)
	if user == nil {
		log.Println("Failed to get user from context")
		helpers.SendResponse(http.StatusUnauthorized, "Unauthorized", context, helpers.WithError("Unauthorized"))
		return
	}
	album := domain.NewAlbum(user.ID, request.Name, request.Description, request.Attendees, domain.WithCover(request.CoverFileExtension))
	newAlbum, err := albumRepository.CreateAlbum(context, *album)
	if err != nil {
		log.Printf("Failed to create album: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}

	helpers.SendResponse(http.StatusOK, "Success", context, helpers.WithItem(*newAlbum))
}
