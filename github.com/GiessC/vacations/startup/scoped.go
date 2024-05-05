package startup

import (
	"log"

	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/giessc/vacations/features/albums/providers"
	"github.com/giessc/vacations/features/albums/repositories"
	"github.com/giessc/vacations/features/albums/services"
	"go.uber.org/dig"
)

func registerAlbumRepository() func(dbProvider *providers.AlbumDynamoDBProvider) *repositories.AlbumRepository {
	return func(dbProvider *providers.AlbumDynamoDBProvider) *repositories.AlbumRepository {
		return repositories.NewAlbumRepository(dbProvider)
	}
}

func registerAlbumDynamoDBProvider() func(dbClient *dynamodb.Client) *providers.AlbumDynamoDBProvider {
	return func(dbClient *dynamodb.Client) *providers.AlbumDynamoDBProvider {
		return providers.NewAlbumDynamoDBProvider(dbClient)
	}
}

func registerAlbumService() func(s3Client *s3.Client, repository *repositories.AlbumRepository) *services.AlbumService {
	return func(s3Client *s3.Client, repository *repositories.AlbumRepository) *services.AlbumService {
		return services.NewAlbumService(s3Client, repository)
	}
}

func AddRepositories(container dig.Container) {
	if err := container.Provide(registerAlbumRepository()); err != nil {
		log.Fatalf("Unable to provide album repository: %v", err)
		panic(err)
	}
}

func AddProviders(container dig.Container) {
	if err := container.Provide(registerAlbumDynamoDBProvider()); err != nil {
		log.Fatalf("Unable to provide album DynamoDB provider: %v", err)
		panic(err)
	}
}

func AddServices(container dig.Container) {
	if err := container.Provide(registerAlbumService()); err != nil {
		log.Fatalf("Unable to provide album DynamoDB provider: %v", err)
		panic(err)
	}
}
