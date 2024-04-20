package startup

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
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

func AddAwsServices(container dig.Container, cfg aws.Config) {
	// TODO: Add services here
	s3Client := s3.NewFromConfig(cfg)

	fmt.Printf(s3Client.Options().AppID)
}
