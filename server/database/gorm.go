package database

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"github.com/night-sornram/Safebite/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Gorm() *gorm.DB {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	host := os.Getenv("DATABASE_HOST")
	portStr := os.Getenv("DATABASE_PORT")
	port, err := strconv.Atoi(portStr)
	if err != nil {
		log.Fatal(err)
	}
	user := os.Getenv("DATABASE_USER")
	password := os.Getenv("DATABASE_PASSWORD")
	dbname := os.Getenv("DATABASE_NAME")

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	User := models.User{}
	History := models.History{}
	Team := models.Team{}
	TeamUser := models.Team_User{}

	db.AutoMigrate(&User)
	db.AutoMigrate(&Team)
	db.AutoMigrate(&TeamUser)
	db.AutoMigrate(&History)

	return db

}
