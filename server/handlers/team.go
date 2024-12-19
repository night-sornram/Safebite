package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/night-sornram/Safebite/database"
	"github.com/night-sornram/Safebite/models"
)

type Team struct {
	TeamID string `json:"team_id"`
	UserID string `json:"user_id"`
	Role   string `json:"role"`
}

func HandleAddTeam(c *fiber.Ctx) error {

	team := new(Team)
	gorm := database.Gorm()

	if err := c.BodyParser(team); err != nil {
		return c.Status(400).JSON(fiber.Map{"bad input": err.Error()})
	}

	team_user := models.Team_User{
		TeamID: team.TeamID,
		UserID: team.UserID,
		Role:   team.Role,
	}

	if result := gorm.Create(&team_user); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
	}

	return c.Status(201).JSON(team_user)
}
