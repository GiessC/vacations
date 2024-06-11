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
	r.GET("/albums/:albumSlug/:albumId/cover/upload", middleware.RequireAuth, withContainer(container, albums.GetUploadCoverUrl))
	r.GET("/albums/:albumSlug/:albumId/cover", middleware.RequireAuth, withContainer(container, albums.GetCoverUrl))
	r.GET("/albums/:albumSlug/:albumId/upload", middleware.RequireAuth, withContainer(container, albums.GetUploadAlbumImagesUrl))
	r.POST("/albums", middleware.RequireAuth, withContainer(container, albums.CreateAlbum))
	r.GET("/albums", middleware.RequireAuth, withContainer(container, albums.GetAlbumsByUserId))
	r.GET("/albums/:albumSlug/:albumId", middleware.RequireAuth, withContainer(container, albums.FindAlbumByIdAndSlug))
	r.Run()
}
