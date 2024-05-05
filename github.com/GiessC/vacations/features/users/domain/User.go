package domain

type User struct {
	UserId   string
	Username string
}

func NewUser(username string) User {
	return User{
		Username: username,
	}
}
