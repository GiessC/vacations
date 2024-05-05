package models

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type UserClaims struct {
	jwt.RegisteredClaims
	Username string `json:"cognito:username"`
}

type UserAuth struct {
	ID         uuid.UUID
	Username   string
	IdToken    *jwt.Token
	Claims     UserClaims
	Expiration *jwt.NumericDate
}
