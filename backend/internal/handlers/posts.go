package handlers

import (
	"encoding/json"
	"net/http"

	dataacess "github.com/SQ77/chatterHub/internal/dataaccess"
	"github.com/SQ77/chatterHub/internal/models"
)

func CreatePostHandler(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	createdPost, err := dataacess.CreatePost(post.Title, post.Body, post.Category)
	if err != nil {
		http.Error(w, "Failed to create post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(createdPost)
}

func GetPostsHandler(w http.ResponseWriter, r *http.Request) {
	posts, err := dataacess.GetPosts()
	if err != nil {
		http.Error(w, "Failed to retrieve posts", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(posts)
}
