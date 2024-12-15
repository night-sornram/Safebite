package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/night-sornram/Safebite/handlers"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/health", handlers.HandleHealthCheck)

	users := app.Group("/users")
	users.Post("/", handlers.HandleCreateUser)
	users.Get("/", handlers.HandleGetUser)
	app.Post("/login", handlers.HandleLogin)
	app.Post("/logout", handlers.HandleLogout)
}
