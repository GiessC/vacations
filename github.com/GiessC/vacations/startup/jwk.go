package startup

import (
	"context"
	"log"

	"github.com/lestrrat-go/jwx/v2/jwk"
)

func GetJwkKeySet(cognitoJwkUrl string) jwk.Set {
	// TODO: Cache the JWK key set
	set, err := jwk.Fetch(context.Background(), cognitoJwkUrl)
	if err != nil {
		log.Fatalf("Failed to parse JWK: %v", err)
	}

	return set
}
