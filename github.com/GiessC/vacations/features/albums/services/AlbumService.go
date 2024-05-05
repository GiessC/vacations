package services

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/giessc/vacations/features/albums/repositories"
	"github.com/giessc/vacations/startup/config"
)

type AlbumService struct {
	EXPIRATION_SECONDS time.Duration
	s3Client           *s3.Client
	repository         *repositories.AlbumRepository
}

func NewAlbumService(s3Client *s3.Client, repository *repositories.AlbumRepository) *AlbumService {
	return &AlbumService{
		EXPIRATION_SECONDS: time.Duration(1 * time.Hour),
		s3Client:           s3Client,
		repository:         repository,
	}
}

func (service AlbumService) PutUploadCoverUrl(context context.Context, albumId string, fileExtension string) (string, error) {
	presignClient := s3.NewPresignClient(service.s3Client, func(options *s3.PresignOptions) {
		options.Expires = service.EXPIRATION_SECONDS
	})
	objectKey := fmt.Sprintf("albums/covers/%s.%s", albumId, fileExtension)
	putObjectRequest := s3.PutObjectInput{
		Bucket: &config.AppConfig.S3BucketName,
		Key:    &objectKey,
	}
	presignedUrlResponse, err := presignClient.PresignPutObject(context, &putObjectRequest)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		return "", err
	}
	return presignedUrlResponse.URL, nil
}

func (service AlbumService) GetCoverUrl(context context.Context, albumId string, fileExtension string) (string, error) {
	presignClient := s3.NewPresignClient(service.s3Client, func(options *s3.PresignOptions) {
		options.Expires = service.EXPIRATION_SECONDS
	})
	objectKey := fmt.Sprintf("albums/covers/%s.%s", albumId, fileExtension)
	getObjectRequest := s3.GetObjectInput{
		Bucket: &config.AppConfig.S3BucketName,
		Key:    &objectKey,
	}
	presignedUrlResponse, err := presignClient.PresignGetObject(context, &getObjectRequest)
	if err != nil {
		log.Printf("Error presigning URL: %v", err)
		return "", err
	}
	return presignedUrlResponse.URL, nil
}

func (service AlbumService) VerifyAlbumExists(context context.Context, albumId string, albumSlug string) (bool, error) {
	exists, err := service.repository.AlbumExists(context, albumId, albumSlug)
	if err != nil {
		return false, nil
	}
	return exists, nil
}
