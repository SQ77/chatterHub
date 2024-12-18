package models

import "time"

type Comment struct {
	ID      int       `json:"id"`
	PostID  int       `json:"post_id"`
	UserID  int       `json:"user_id"`
	Content string    `json:"content"`
	Created time.Time `json:"created"`
}

type CommentWithUser struct {
	Comment
	Username string `json:"username"`
}
