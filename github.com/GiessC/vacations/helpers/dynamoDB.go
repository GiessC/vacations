package helpers

import (
	"log"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

func MapToDynamoDB[TDto interface{}](dto TDto) map[string]types.AttributeValue {
	itemAttributes, err := attributevalue.MarshalMap(dto)
	if err != nil {
		log.Fatalf("Got error marshalling map: %s", err)
		return nil
	}
	return itemAttributes
}

func MapFromDynamoDB[TDto interface{}](ddbModel map[string]types.AttributeValue) *TDto {
	var dto TDto
	err := attributevalue.UnmarshalMap(ddbModel, &dto)
	if err != nil {
		log.Fatalf("Got error marshalling map: %s", err)
		return nil
	}
	return &dto
}
