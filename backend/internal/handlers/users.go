package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	dataacess "github.com/SQ77/chatterHub/internal/dataaccess"
	"github.com/SQ77/chatterHub/internal/models"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = dataacess.CreateUser(user.Username)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := dataacess.GetUsers()
	if err != nil {
		http.Error(w, "Failed to fetch users", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func AuthenticateUserHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	authenticatedUser, err := dataacess.AuthenticateUser(user.Username)
	if err != nil {
		http.Error(w, "Invalid username", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message":  "User authenticated successfully",
		"username": authenticatedUser.Username,
		"id":       strconv.Itoa(authenticatedUser.ID),
	})
}
