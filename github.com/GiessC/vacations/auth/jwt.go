package auth

import (
	"fmt"

	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jws"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

func ValidateJwtToken(tokenPayload []byte, keySet jwk.Set) (jwt.Token, error) {
	token, err := jwt.Parse(tokenPayload, jwt.WithKeySet(keySet, jws.WithUseDefault(true)))
	if err != nil {
		fmt.Printf("Error parsing token: %s", err)
		return nil, err
	}
	return token, nil
}
