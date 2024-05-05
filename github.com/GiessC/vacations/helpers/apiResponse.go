package helpers

import "github.com/gin-gonic/gin"

type ApiResponse struct {
	StatusCode int               `json:"statusCode"`
	Message    string            `json:"message"`
	Item       interface{}       `json:"item,omitempty"`
	Items      interface{}       `json:"items,omitempty"`
	Error      string            `json:"error,omitempty"`
	Errors     map[string]string `json:"errors,omitempty"`
}

type ApiResponseOption func(*ApiResponse)

func WithItem(item interface{}) ApiResponseOption {
	return func(r *ApiResponse) {
		r.Item = item
	}
}

func WithItems(items interface{}) ApiResponseOption {
	return func(r *ApiResponse) {
		r.Items = items
	}
}

func WithError(err string) ApiResponseOption {
	return func(r *ApiResponse) {
		r.Error = err
	}
}

func WithErrors(errors map[string]string) ApiResponseOption {
	return func(r *ApiResponse) {
		r.Errors = errors
	}
}

func NewApiResponse(statusCode int, message string, opts ...ApiResponseOption) ApiResponse {
	response := ApiResponse{
		StatusCode: statusCode,
		Message:    message,
		Errors:     make(map[string]string),
	}

	for _, opt := range opts {
		opt(&response)
	}

	return response
}

func SendResponse(statusCode int, message string, context *gin.Context, opts ...ApiResponseOption) {
	response := NewApiResponse(statusCode, message, opts...)
	ginResponse := gin.H{
		"statusCode": response.StatusCode,
		"message":    response.Message,
		"item":       response.Item,
		"items":      response.Items,
		"error":      response.Error,
		"errors":     response.Errors,
	}
	context.JSON(statusCode, ginResponse)
}
