package dto

import (
	"fmt"

	"github.com/google/uuid"
)

type UserDynamoDBDto struct {
	Pk       string `json:"pk"`
	Sk       string `json:"sk"`
	UserId   string `json:"userId"`
	Username string `json:"username"`
}

func GetUserDtoPk(userId string) string {
	return fmt.Sprintf("user#%s", userId)
}

func GetUserDtoSk() string {
	return "user"
}

func NewUserDynamoDBDto(username string) UserDynamoDBDto {
	// TODO: Get the user ID from the JWT token.
	UserId := uuid.New()
	pk := GetUserDtoPk(UserId.String())
	sk := GetUserDtoSk()

	return UserDynamoDBDto{
		Pk:       pk,
		Sk:       sk,
		UserId:   UserId.String(),
		Username: username,
	}
}
