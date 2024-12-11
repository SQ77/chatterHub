package routes

import (
	handlers "github.com/SQ77/chatterHub/internal/handlers/posts"
	"github.com/go-chi/chi/v5"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	// Define API routes
	r.Post("/posts", handlers.CreatePostHandler)
	r.Get("/posts", handlers.GetPostsHandler)

	return r
}
