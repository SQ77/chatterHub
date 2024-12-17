package handlers

import (
	"encoding/json"
	"net/http"

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
