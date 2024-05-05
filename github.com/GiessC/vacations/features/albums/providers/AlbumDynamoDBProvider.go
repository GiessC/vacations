package providers

import (
	"context"
	"errors"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/giessc/vacations/features/albums/domain"
	"github.com/giessc/vacations/features/albums/dto"
	"github.com/giessc/vacations/features/albums/mapping"
	"github.com/giessc/vacations/helpers"
	"github.com/giessc/vacations/startup/config"
	"github.com/google/uuid"
)

type AlbumDynamoDBProvider struct {
	dbClient *dynamodb.Client
}

func NewAlbumDynamoDBProvider(dbClient *dynamodb.Client) *AlbumDynamoDBProvider {
	return &AlbumDynamoDBProvider{
		dbClient: dbClient,
	}
}

func (provider AlbumDynamoDBProvider) CreateAlbum(context context.Context, album domain.Album) (*domain.Album, error) {
	albumDto := mapping.MapAlbumToDynamoDBDto(album)
	itemAttributes := helpers.MapToDynamoDB(albumDto)
	if itemAttributes == nil {
		return nil, errors.New("failed to map album to DynamoDB DTO")
	}
	putItemRequest := dynamodb.PutItemInput{
		TableName:    aws.String(config.AppConfig.MetadataTableName),
		Item:         itemAttributes,
		ReturnValues: types.ReturnValueAllOld,
	}
	_, err := provider.dbClient.PutItem(context, &putItemRequest)
	if err != nil {
		return nil, err
	}
	newAlbum := mapping.MapDynamoDBDtoToAlbum(albumDto)
	return &newAlbum, nil
}

func (provider AlbumDynamoDBProvider) GetAlbumsByUserId(context context.Context, userId uuid.UUID) ([]domain.Album, error) {
	queryInput := dynamodb.QueryInput{
		TableName:              aws.String(config.AppConfig.MetadataTableName),
		KeyConditionExpression: aws.String("pk = :pk"),
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":pk": &types.AttributeValueMemberS{Value: dto.GetAlbumDtoPk(userId.String())},
		},
	}
	queryOutput, err := provider.dbClient.Query(context, &queryInput)
	if err != nil {
		return nil, err
	}

	albums := make([]domain.Album, 0)
	for _, item := range queryOutput.Items {
		log.Printf("Item: %+v", item)
		albumDto := helpers.MapFromDynamoDB[dto.AlbumDynamoDBDto](item)
		album := mapping.MapDynamoDBDtoToAlbum(*albumDto)
		albums = append(albums, album)
	}
	return albums, nil
}
