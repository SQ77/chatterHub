package dataaccess

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/SQ77/chatterHub/internal/database"
	"github.com/SQ77/chatterHub/internal/models"
)

func CreatePost(title, body, category, author string) (*models.Post, error) {
	// Create a new post and insert into the database
	query := `INSERT INTO posts (title, body, category, created, author, upvotes)
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created`

	var post models.Post
	err := database.DB.QueryRow(query, title, body, category, time.Now(), author, 0).Scan(&post.ID, &post.Created)
	if err != nil {
		log.Println("Error creating post:", err)
		return nil, err
	}

	post.Title = title
	post.Body = body
	post.Category = category
	post.Author = author

	return &post, nil
}

func GetPosts() ([]models.Post, error) {
	// Retrieve all posts from the database
	rows, err := database.DB.Query("SELECT id, title, body, category, created, author, upvotes FROM posts")
	if err != nil {
		log.Println("Error fetching posts:", err)
		return nil, err
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var post models.Post
		if err := rows.Scan(&post.ID, &post.Title, &post.Body, &post.Category, &post.Created, &post.Author, &post.Upvotes); err != nil {
			log.Println("Error scanning row:", err)
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, nil
}

func GetPostByID(id int) (*models.Post, error) {
	query := "SELECT id, title, body, category, created, author, upvotes FROM posts WHERE id = $1"

	var post models.Post
	err := database.DB.QueryRow(query, id).Scan(&post.ID, &post.Title, &post.Body, &post.Category, &post.Created, &post.Author, &post.Upvotes)

	if err != nil {
		log.Println("Error getting post by ID:", err)
		return nil, err
	}

	return &post, nil
}

func UpdatePostUpvotes(ctx context.Context, postID int, increment bool) error {
	query := `UPDATE posts SET upvotes = upvotes + $1 WHERE id = $2`
	delta := 1
	if !increment {
		delta = -1
	}

	_, err := database.DB.ExecContext(ctx, query, delta, postID)
	if err != nil {
		return fmt.Errorf("failed to update upvotes for post %d: %w", postID, err)
	}
	return nil
}

func UpdatePost(post models.Post) error {
	query := `
		UPDATE posts 
		SET title = $1, category = $2, body = $3, created = $4, author = $5, upvotes = $6
		WHERE id = $7
	`
	_, err := database.DB.Exec(query, post.Title, post.Category, post.Body, post.Created, post.Author, post.Upvotes, post.ID)
	return err
}

func DeletePost(ctx context.Context, postID int) error {
	query := `DELETE FROM posts WHERE id = $1`
	_, err := database.DB.ExecContext(ctx, query, postID)
	if err != nil {
		return fmt.Errorf("failed to delete post with id %d: %w", postID, err)
	}
	return nil
}
