package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/night-sornram/Safebite/database"
	"github.com/night-sornram/Safebite/models"
)

type History struct {
	Picture         string `json:"picture"`
	FoodName        string `json:"food_name"`
	FoodIngredients string `json:"food_ingredients"`
	AlertMessage    string `json:"alert_message"`
	IsEatable       bool   `json:"is_eatable"`
}

func HandleCreateHistory(c *fiber.Ctx) error {
	history := new(models.History)
	gorm := database.Gorm()

	if err := c.BodyParser(history); err != nil {
		return c.Status(400).JSON(fiber.Map{"bad input": err.Error()})
	}

	if user := gorm.Model(&models.User{}).Where("user_id = ?", c.Locals("iss")).First(&models.User{}); user.Error != nil {
		return c.Status(400).JSON(fiber.Map{"error": "user not found"})
	}

	history.UserID = c.Locals("iss").(string)

	if result := gorm.Create(history); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
	}

	return c.Status(201).JSON(history)

}

func HandleGetHistories(c *fiber.Ctx) error {

	gorm := database.Gorm()
	histories := new([]models.History)

	if result := gorm.Model(&models.History{}).Where("user_id = ?", c.Locals("iss")).Find(&histories); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
	}

	return c.JSON(histories)
}
