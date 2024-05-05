package middleware

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/giessc/vacations/features/auth/models"
	"github.com/giessc/vacations/startup/config"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func decodeToken(tokenString string) (*jwt.Token, *models.UserClaims) {
	claims := models.UserClaims{}
	token, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodRSA)

		if !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, errors.New("kid header not found")
		}

		key, foundKeys := config.AppConfig.PublicKeySet.LookupKeyID(kid)
		if !foundKeys {
			return nil, fmt.Errorf("key %v not found", kid)
		}

		var tokenKey interface{}
		if err := key.Raw(&tokenKey); err != nil {
			return nil, errors.New("failed to create token key")
		}

		return tokenKey, nil
	})

	if err != nil {
		log.Printf("failed to decode token: %v", err)
		return nil, nil
	}

	if token == nil || !token.Valid {
		log.Println("token is invalid")
		return nil, nil
	}

	return token, &claims
}

func getUserFromClaims(token *jwt.Token, claims *models.UserClaims) *models.UserAuth {
	return &models.UserAuth{
		ID:         uuid.MustParse(claims.Subject),
		Username:   claims.Username,
		Claims:     *claims,
		IdToken:    token,
		Expiration: claims.ExpiresAt,
	}
}

func RequireAuth(context *gin.Context) {
	authorizationSplit := strings.Split(context.Request.Header.Get("Authorization"), " ")
	if len(authorizationSplit) != 2 {
		context.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	tokenString := authorizationSplit[1]
	if tokenString == "" {
		context.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	token, claims := decodeToken(tokenString)
	user := getUserFromClaims(token, claims)

	context.Set("user", user)
	context.Next()
}
