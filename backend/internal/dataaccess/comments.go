package dataaccess

import (
	"errors"
	"fmt"

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

func GetCommentsForPost(postID int) ([]models.CommentWithUser, error) {
	rows, err := database.DB.Query(`
        SELECT 
        	comments.id, 
            comments.content, 
            comments.created, 
            users.username
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.post_id = $1
        ORDER BY comments.created ASC
    `, postID)
	if err != nil {
		return nil, fmt.Errorf("error fetching comments: %v", err)
	}
	defer rows.Close()

	var comments []models.CommentWithUser
	for rows.Next() {
		var comment models.CommentWithUser
		if err := rows.Scan(&comment.ID, &comment.Content, &comment.Created, &comment.Username); err != nil {
			return nil, fmt.Errorf("error scanning row: %v", err)
		}
		comments = append(comments, comment)
	}

	return comments, nil
}
