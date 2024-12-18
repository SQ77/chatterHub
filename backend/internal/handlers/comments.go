package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/SQ77/chatterHub/internal/dataaccess"
	"github.com/SQ77/chatterHub/internal/models"
)

func CreateCommentHandler(w http.ResponseWriter, r *http.Request) {
	var comment models.Comment

	err := json.NewDecoder(r.Body).Decode(&comment)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate the input
	if comment.PostID == 0 || comment.UserID == 0 || comment.Content == "" {
		http.Error(w, "post_id, user_id, and content are required", http.StatusBadRequest)
		return
	}

	// Insert the comment
	id, err := dataaccess.CreateComment(&comment)
	if err != nil {
		http.Error(w, "Failed to create comment", http.StatusInternalServerError)
		return
	}

	// Return the response
	comment.ID = id
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(comment)
}

func GetCommentsHandler(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "id")
	postIDInt, err := strconv.Atoi(postID)
	if err != nil {
		http.Error(w, "Invalid post ID", http.StatusBadRequest)
		return
	}

	// Get the comments from the database
	comments, err := dataaccess.GetCommentsForPost(postIDInt)
	if err != nil {
		http.Error(w, "Failed to retrieve comments", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)
}

func DeleteCommentHandler(w http.ResponseWriter, r *http.Request) {
	commentIDStr := chi.URLParam(r, "id")
	if commentIDStr == "" {
		http.Error(w, "comment ID is required", http.StatusBadRequest)
		return
	}

	commentID, err := strconv.Atoi(commentIDStr)
	if err != nil {
		http.Error(w, "invalid comment ID", http.StatusBadRequest)
		return
	}

	err = dataaccess.DeleteComment(commentID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	response := map[string]string{"message": "comment deleted successfully"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
