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
	Role         string         `json:"role" db:"role" gorm:"not null; default:'user'"`
	UserID       uuid.UUID      `json:"user_id" gorm:"primaryKey;" db:"user_id" gorm:"not null"`
	Username     string         `json:"username" gorm:"unique" db:"username" gorm:"not null"`
	Password     string         `json:"password" db:"password" gorm:"not null"`
	Name         string         `json:"name" db:"name" gorm:"not null"`
	Surname      string         `json:"surname" db:"surname" gorm:"not null"`
	Email        string         `json:"email" db:"email" gorm:"unique; not null"`
	Phone        string         `json:"phone" db:"phone" gorm:"not null"`
	Religion     string         `json:"religion" db:"religion" gorm:"not null"`
	Food_Allergy string         `json:"food_allergy" db:"food_allergy" gorm:"not null"`
	Health_Issue string         `json:"health_issue" db:"health_issue" gorm:"not null"`
	Age          int            `json:"age" db:"age" gorm:"not null"`
}
