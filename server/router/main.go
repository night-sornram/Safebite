package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/night-sornram/Safebite/handlers"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/health", handlers.HandleHealthCheck)
}
