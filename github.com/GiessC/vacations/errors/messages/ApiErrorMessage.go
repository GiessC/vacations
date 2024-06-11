package messages

type ApiErrorMessage string

const (
	OK            ApiErrorMessage = "Success"
	BadRequest    ApiErrorMessage = "Bad Request"
	Unauthorized  ApiErrorMessage = "Unauthorized"
	Forbidden     ApiErrorMessage = "Forbidden"
	NotFound      ApiErrorMessage = "Not Found"
	InternalError ApiErrorMessage = "Internal Server Error"
)
