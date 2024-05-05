package albums

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/giessc/vacations/helpers"
	"github.com/giessc/vacations/startup/config"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.uber.org/dig"
)

type GetUploadCoverUrlRequest struct {
	FileExtension string `form:"fileExtension"`
}

func GetUploadCoverUrl(context *gin.Context, container *dig.Container) {
	albumId := context.Params.ByName("albumId")
	request := GetUploadCoverUrlRequest{}

	if err := context.ShouldBindWith(&request, binding.Form); err != nil {
		log.Printf("Bad Request: %v", err)
		helpers.SendResponse(http.StatusBadRequest, "Bad Request", context, helpers.WithError(err.Error()))
		return
	}
	EXPIRATION_SECONDS := time.Duration(1 * time.Hour)

	var s3Client *s3.Client
	if err := container.Invoke(func(client *s3.Client) {
		s3Client = client
	}); err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}
	presignClient := s3.NewPresignClient(s3Client, func(options *s3.PresignOptions) {
		options.Expires = EXPIRATION_SECONDS
	})
	objectKey := fmt.Sprintf("albums/covers/%s.%s", albumId, request.FileExtension)
	getObjectRequest := s3.GetObjectInput{
		Bucket: &config.AppConfig.S3BucketName,
		Key:    &objectKey,
	}
	presignedUrlResponse, err := presignClient.PresignGetObject(context, &getObjectRequest)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		helpers.SendResponse(http.StatusInternalServerError, "Internal Server Error", context, helpers.WithError("Internal Server Error"))
		return
	}

	helpers.SendResponse(http.StatusOK, "Success", context, helpers.WithItem(gin.H{
		"presignedUrl": presignedUrlResponse.URL,
	}))
}
