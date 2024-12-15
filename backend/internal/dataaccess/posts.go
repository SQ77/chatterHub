package dataacess

import (
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
