package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	id           int
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
	Role         string         `json:"role" db:"role"`
	UserID       uuid.UUID      `json:"user_id" gorm:"primaryKey;" db:"user_id" gorm:"not null"`
	Username     string         `json:"username" gorm:"unique" db:"username" gorm:"not null"`
	Password     string         `json:"password" db:"password" gorm:"not null"`
	Name         string         `json:"name" db:"name" `
	Surname      string         `json:"surname" db:"surname" `
	Email        string         `json:"email" db:"email" gorm:"unique; not null"`
	Phone        string         `json:"phone" db:"phone" `
	Religion     string         `json:"religion" db:"religion"`
	Food_Allergy string         `json:"food_allergy" db:"food_allergy" `
	Health_Issue string         `json:"health_issue" db:"health_issue" `
	Age          int            `json:"age" db:"age"`
}
