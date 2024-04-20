package main

import (
	"log"
	"os"

	"github.com/giessc/vacations/startup"
	"github.com/joho/godotenv"
	"go.uber.org/dig"
)

func loadEnvVars(environment string) {
	err := godotenv.Load(".env." + environment)
	if err != nil {
		panic(err)
	}
}

func main() {
	err := godotenv.Load(".env.local", ".env.development", ".env.production")
	if err != nil {
		panic(err)
	}

	environment := os.Getenv("VACATIONS_ENV")
	if environment == "" {
		environment = "development"
	}

	loadEnvVars(environment)
	cognitoJwkUrl := os.Getenv("COGNITO_JWK_URL")

	jwkKeySet := startup.GetJwkKeySet(cognitoJwkUrl)

	log.Printf("JWK Key Set: %s", jwkKeySet)

	region := os.Getenv("AWS_REGION")
	cfg := startup.ConfigAws(region)

	container := dig.New()
	startup.AddAwsServices(*container, cfg)
}
