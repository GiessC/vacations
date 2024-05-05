package config

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/lestrrat-go/jwx/v2/jwk"
)

type Config struct {
	AwsRegion         string
	S3BucketName      string
	CognitoJwkUrl     string
	PublicKeySet      jwk.Set
	MetadataTableName string
	MetadataPkSkIndex string
	Environment       string
}

var AppConfig Config

func getJwkKeySet(cognitoJwkUrl string) jwk.Set {
	log.Printf("Fetching JWK from URL: %v", cognitoJwkUrl)

	set, err := jwk.Fetch(context.Background(), cognitoJwkUrl)
	if err != nil {
		log.Fatalf("Failed to parse JWK: %v", err)
	}

	return set
}

func LoadConfig() {
	err := godotenv.Load(".env.local", ".env.development", ".env.production")
	if err != nil {
		panic(err)
	}
	cognitoJwkUrl := os.Getenv("COGNITO_JWK_URL")

	AppConfig = Config{
		AwsRegion:         os.Getenv("AWS_REGION"),
		S3BucketName:      os.Getenv("S3_BUCKET_NAME"),
		CognitoJwkUrl:     cognitoJwkUrl,
		PublicKeySet:      getJwkKeySet(cognitoJwkUrl),
		MetadataTableName: os.Getenv("METADATA_TABLE_NAME"),
		MetadataPkSkIndex: os.Getenv("METADATA_PK_SK_INDEX"),
		Environment:       os.Getenv("VACATIONS_ENV"),
	}
}
