package dataaccess

import (
	"errors"

	"github.com/SQ77/chatterHub/internal/database"
	"github.com/SQ77/chatterHub/internal/models"
)

func CreateComment(comment *models.Comment) (int, error) {
	var id int
	query := `
		INSERT INTO comments (post_id, user_id, content, created)
		VALUES ($1, $2, $3, NOW())
		RETURNING id
	`
	err := database.DB.QueryRow(query, comment.PostID, comment.UserID, comment.Content).Scan(&id)
	if err != nil {
		return 0, errors.New("failed to insert comment: " + err.Error())
	}
	return id, nil
}
