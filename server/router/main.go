package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/night-sornram/Safebite/handlers"
	"github.com/night-sornram/Safebite/middleware"
)

func SetupRoutes(app *fiber.App) {

	app.Get("/health", handlers.HandleHealthCheck)
	app.Get("/me", handlers.HandleGetUser)
	app.Post("/login", handlers.HandleLogin)
	app.Post("/register", handlers.HandleCreateUser)
	app.Post("/logout", handlers.HandleLogout)

	app.Use("/api", middleware.Protected())
	app.Post("/api/histories", middleware.Authorize("user"), handlers.HandleCreateHistory)
	app.Post("/api/histories/team", middleware.Authorize("user"), handlers.HandleGetHistoriesByTeam)
	app.Post("/api/teams", middleware.Authorize("user"), handlers.HandleAddTeam)
	app.Put("/api/users", middleware.Authorize("user"), handlers.HandleUpdateUser)
	app.Get("/api/histories", middleware.Authorize("user"), handlers.HandleGetHistories)
}
