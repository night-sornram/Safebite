package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/night-sornram/Safebite/app"
)

func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		log.Fatal("Error loading .env file")
	}
	// setup and run app
	err := app.SetupAndRunApp()
	if err != nil {
		panic(err)
	}
}
