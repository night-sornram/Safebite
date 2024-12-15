package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username     string `json:"username" gorm:"unique"`
	Password     string `json:"password"`
	Role         string `json:"role"`
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	Email        string `json:"email" gorm:"unique"`
	Phone        string `json:"phone"`
	Religion     string `json:"religion"`
	Food_Allergy string `json:"food_allergy"`
	Health_Issue string `json:"health_issue"`
	Age          string `json:"age"`
	Gender       string `json:"gender"`
}

type History struct {
	gorm.Model
	Picture         string    `json:"picture"`
	FoodName        string    `json:"food_name"`
	FoodIngredients []string  `json:"food_ingredients" gorm:"type:text[]"`
	AlertMessage    string    `json:"alert_message"`
	UserID          uuid.UUID `json:"user_id" gorm:"type:uuid"`
	IsEatable       bool      `json:"is_eatable"`
}
