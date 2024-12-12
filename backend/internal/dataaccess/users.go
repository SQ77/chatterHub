package dataacess

import (
	"database/sql"
	"errors"

	"github.com/SQ77/chatterHub/internal/database"
	"github.com/SQ77/chatterHub/internal/models"
)

func CreateUser(username string) error {
	_, err := database.DB.Exec("INSERT INTO users (username) VALUES ($1)", username)
	return err
}

func GetUsers() ([]models.User, error) {
	rows, err := database.DB.Query("SELECT id, username FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Username); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

func AuthenticateUser(username string) (*models.User, error) {
	var user models.User
	err := database.DB.QueryRow("SELECT id, username FROM users WHERE username = $1", username).Scan(&user.ID, &user.Username)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}
