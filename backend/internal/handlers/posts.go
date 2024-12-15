package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/SQ77/chatterHub/internal/dataaccess"
	"github.com/SQ77/chatterHub/internal/models"
)

type UpdateUpvoteRequest struct {
	PostID    int  `json:"post_id"`
	Increment bool `json:"increment"`
}

func CreatePostHandler(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	createdPost, err := dataaccess.CreatePost(post.Title, post.Body, post.Category, post.Author)
	if err != nil {
		http.Error(w, "Failed to create post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(createdPost)
}

func GetPostsHandler(w http.ResponseWriter, r *http.Request) {
	posts, err := dataaccess.GetPosts()
	if err != nil {
		http.Error(w, "Failed to retrieve posts", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(posts)
}

func UpdatePostUpvotesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse request body
	var req UpdateUpvoteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Access the database
	err := dataaccess.UpdatePostUpvotes(r.Context(), req.PostID, req.Increment)
	if err != nil {
		http.Error(w, "Failed to update upvotes", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Post upvotes updated successfully"))
}
