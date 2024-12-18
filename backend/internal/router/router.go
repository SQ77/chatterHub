package router

import (
	handlers "github.com/SQ77/chatterHub/internal/handlers"

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

	setUpRoutes(r)

	return r
}

func setUpRoutes(r chi.Router) {
	r.Route("/api/posts", func(r chi.Router) {
		r.Get("/", handlers.GetPostsHandler)
		r.Post("/", handlers.CreatePostHandler)
		r.Post("/upvotes", handlers.UpdatePostUpvotesHandler)
		r.Delete("/{id}", handlers.DeletePostHandler)
		r.Get("/{id}", handlers.GetPostByIDHandler)
		r.Put("/{id}", handlers.UpdatePostHandler)
		r.Get("/{id}/comments", handlers.GetCommentsHandler)
	})

	r.Post("/api/users", handlers.CreateUserHandler)
	r.Get("/api/users", handlers.GetUsersHandler)
	r.Post("/api/authenticate", handlers.AuthenticateUserHandler)

	r.Post("/api/comments", handlers.CreateCommentHandler)
	r.Delete("/api/comments/{id}", handlers.DeleteCommentHandler)
}
