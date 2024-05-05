package startup

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"go.uber.org/dig"
)

func ConfigAws(region string) aws.Config {
	cfg, err := config.LoadDefaultConfig(
		context.Background(),
		config.WithRegion(region),
	)
	config.WithRegion(region)
	if err != nil {
		log.Fatalf("Unable to load SDK config: %v", err)
	}

	return cfg
}

func registerS3(cfg aws.Config) func() *s3.Client {
	return func() *s3.Client {
		return s3.NewFromConfig(cfg)
	}
}

func registerDynamoDB(cfg aws.Config) func() *dynamodb.Client {
	return func() *dynamodb.Client {
		return dynamodb.NewFromConfig(cfg)
	}
}

func AddAwsServices(container dig.Container, cfg aws.Config) {
	if err := container.Provide(registerS3(cfg)); err != nil {
		log.Fatalf("Unable to provide s3 client: %v", err)
		panic(err)
	}
	if err := container.Provide(registerDynamoDB(cfg)); err != nil {
		log.Fatalf("Unable to provide DynamoDB client: %v", err)
		panic(err)
	}
}
