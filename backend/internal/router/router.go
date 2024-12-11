package router

import (
	handlers "github.com/SQ77/chatterHub/internal/handlers/posts"
	"github.com/go-chi/chi/v5"
)

func Setup() chi.Router {
	r := chi.NewRouter()

	setUpRoutes(r)

	return r
}

// setUpRoutes defines the application's API routes.
func setUpRoutes(r chi.Router) {
	// Grouping routes related to posts
	r.Route("/api/posts", func(r chi.Router) {
		r.Get("/", handlers.GetPostsHandler)    // List all posts
		r.Post("/", handlers.CreatePostHandler) // Create a new post
	})

	// Additional routes can be added here as needed, for example:
	// r.Get("/api/users", handlers.GetUsersHandler)
	// r.Post("/api/users", handlers.CreateUserHandler)
}
