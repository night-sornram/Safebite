package handlers

import (
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/night-sornram/Safebite/database"
	"github.com/night-sornram/Safebite/models"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Username     string `json:"username"`
	Password     string `json:"password"`
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	Email        string `json:"email"`
	Phone        string `json:"phone"`
	Religion     string `json:"religion"`
	Food_Allergy string `json:"food_allergy"`
	Health_Issue string `json:"health_issue"`
	Age          string `json:"age"`
	Gender       string `json:"gender" `
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func HandleCreateUser(c *fiber.Ctx) error {
	user := new(models.User)
	gorm := database.Gorm()

	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(fiber.Map{"bad input": err.Error()})
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	user.Role = "user"
	user.Password = string(password)
	user.UserID = uuid.New()

	if result := gorm.Create(user); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
	}

	return c.Status(201).JSON(user)

}

func HandleLogin(c *fiber.Ctx) error {
	user := new(models.User)
	login := new(Login)
	gorm := database.Gorm()

	if err := c.BodyParser(login); err != nil {
		return c.Status(400).JSON(fiber.Map{"bad input": err.Error()})
	}

	if err := gorm.Where("email = ?", login.Email).First(user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "invalid email or password"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(login.Password)); err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "invalid email or password"})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": user.Email,
		"iss":   user.UserID,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
		"role":  user.Role,
	})

	secretKey := os.Getenv("SECRET")

	token, err := claims.SignedString([]byte(secretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "success",
		"token":   token,
	})
}

func HandleGetUser(c *fiber.Ctx) error {
	tokenString := c.Get("Authorization")
	secretKey := os.Getenv("SECRET")
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	tokenArr := strings.Split(tokenString, " ")
	if len(tokenArr) != 2 || tokenArr[0] != "Bearer" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	token, err := jwt.ParseWithClaims(tokenArr[1], &jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.MapClaims)

	var user models.User
	gorm := database.Gorm()
	if err := gorm.Where("email = ?", (*claims)["email"]).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	return c.Status(fiber.StatusOK).JSON(user)

}

func HandleLogout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "success",
	})
}
