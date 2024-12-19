package models

import (
	"gorm.io/gorm"
)

type History struct {
	gorm.Model
	Picture         string `json:"picture" gorm:"not null"`
	FoodName        string `json:"food_name" gorm:"not null"`
	FoodIngredients string `json:"food_ingredients" gorm:"not null"`
	AlertMessage    string `json:"alert_message" gorm:"not null"`
	UserID          string `json:"user_id" gorm:"not null"`
	User            User   `gorm:"foreignKey:UserID"`
	IsEatable       bool   `json:"is_eatable" gorm:"not null"`
	TeamID          string `json:"team_id" gorm:"not null"`
	Team            Team   `gorm:"foreignKey:TeamID"`
}
