package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

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

func GetPostByIDHandler(w http.ResponseWriter, r *http.Request) {
	// Extract the post ID from the URL
	idParam := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	// Fetch the post from the database
	post, err := dataaccess.GetPostByID(postID)
	if err != nil {
		http.Error(w, "Failed to retrieve post", http.StatusInternalServerError)
		return
	}

	if post == nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
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

func UpdatePostHandler(w http.ResponseWriter, r *http.Request) {
	// Extract the post ID from the URL
	idParam := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	var updatedPost models.Post
	if err := json.NewDecoder(r.Body).Decode(&updatedPost); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	updatedPost.ID = postID

	// Update the post in the database
	err = dataaccess.UpdatePost(updatedPost)
	if err != nil {
		http.Error(w, "Failed to update post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := map[string]string{"message": "Post updated successfully"}
	json.NewEncoder(w).Encode(response)
}

func DeletePostHandler(w http.ResponseWriter, r *http.Request) {
	// Extract the post ID from the URL
	postIDStr := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	// Delete the post
	err = dataaccess.DeletePost(r.Context(), postID)
	if err != nil {
		http.Error(w, "Failed to delete post: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := map[string]string{"message": "Post deleted successfully"}
	json.NewEncoder(w).Encode(response)
}
