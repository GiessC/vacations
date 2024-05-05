package main

import (
	"github.com/giessc/vacations/startup"
	"github.com/giessc/vacations/startup/config"
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
	config.LoadConfig()

	environment := config.AppConfig.Environment
	if environment == "" {
		environment = "development"
	}

	loadEnvVars(environment)

	region := config.AppConfig.AwsRegion
	cfg := startup.ConfigAws(region)

	container := dig.New()
	startup.AddAwsServices(*container, cfg)
	startup.AddRepositories(*container)
	startup.AddProviders(*container)

	startup.RegisterApi(container)
}
