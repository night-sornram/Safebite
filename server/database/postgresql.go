package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"

	_ "github.com/lib/pq"
	"github.com/night-sornram/Safebite/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func StartPostgresql() error {
	host := os.Getenv("DATABASE_HOST")
	portStr := os.Getenv("DATABASE_PORT")
	port, err := strconv.Atoi(portStr)
	if err != nil {
		log.Fatal(err)
	}
	user := os.Getenv("DATABASE_USER")
	password := os.Getenv("DATABASE_PASSWORD")
	dbname := os.Getenv("DATABASE_NAME")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	gorm, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	User := models.User{}
	History := models.History{}
	Team := models.Team{}
	TeamUser := models.Team_User{}

	gorm.AutoMigrate(&User)
	gorm.AutoMigrate(&Team)
	gorm.AutoMigrate(&TeamUser)
	gorm.AutoMigrate(&History)

	defer db.Close()

	return nil
}
