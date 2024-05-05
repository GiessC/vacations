package startup

import (
	"github.com/giessc/vacations/features/albums"
	"github.com/giessc/vacations/middleware"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func withContainer(container *dig.Container, endpointFunction func(context *gin.Context, container *dig.Container)) func(context *gin.Context) {
	return func(context *gin.Context) {
		endpointFunction(context, container)
	}
}

func RegisterApi(container *dig.Container) {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	r.PUT("/albums/:albumId/cover", middleware.RequireAuth, withContainer(container, albums.PutUploadCoverUrl))
	r.GET("/albums/:albumId/cover", middleware.RequireAuth, withContainer(container, albums.GetUploadCoverUrl))
	r.POST("/albums", middleware.RequireAuth, withContainer(container, albums.CreateAlbum))
	r.GET("/albums", middleware.RequireAuth, withContainer(container, albums.GetAlbumsByUserId))
	r.Run()
}
