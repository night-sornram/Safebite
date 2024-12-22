package handlers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/night-sornram/Safebite/database"
	"github.com/night-sornram/Safebite/models"
)

type Team struct {
	TeamID string `json:"team_id"`
	UserID string `json:"user_id"`
	Role   string `json:"role"`
}

type TeamInfo struct {
	TeamID string `json:"team_id"`
	Role   string `json:"role"`
	Name   string `json:"name"`
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

func HandleGetTeam(c *fiber.Ctx) error {

	gorm := database.Gorm()
	team_users := new([]models.Team_User)

	if result := gorm.Model(&models.Team_User{}).Where("user_id = ?", c.Locals("iss")).Find(&team_users); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
	}

	teamsFiltered := []TeamInfo{}
	for _, team := range *team_users {
		teamModel := models.Team{}
		if result := gorm.Model(&models.Team{}).Where("team_id = ?", team.TeamID).First(&teamModel); result.Error != nil {
			return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
		}
		user := models.User{}
		if result := gorm.Model(&models.User{}).Where("user_id = ?", teamModel.OwnerID).First(&user); result.Error != nil {
			return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
		}

		fmt.Println(user.Username)
		teamsFiltered = append(teamsFiltered, TeamInfo{
			TeamID: team.TeamID,
			Role:   team.Role,
			Name:   user.Username,
		})
	}

	return c.JSON(teamsFiltered)
}
