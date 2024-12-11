package router

import (
	handlers "github.com/SQ77/chatterHub/internal/handlers/posts"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func Setup() chi.Router {
	r := chi.NewRouter()

	// Enable CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Set up other routes
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
