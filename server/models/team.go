package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Team struct {
	gorm.Model
	TeamID  uuid.UUID `json:"team_id" gorm:"primaryKey;" db:"team_id" gorm:"not null"`
	OwnerID string    `json:"user_id" gorm:"not null"`
	Owner   User      `gorm:"foreignKey:OwnerID;constraint:OnDelete:CASCADE;"`
}

type Team_User struct {
	gorm.Model
	TeamID string `json:"team_id" gorm:"not null"`
	Team   Team   `gorm:"foreignKey:TeamID;constraint:OnDelete:CASCADE;"`
	UserID string `json:"user_id" gorm:"not null"`
	User   User   `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;"`
	Role   string `json:"role" gorm:"not null"`
}
