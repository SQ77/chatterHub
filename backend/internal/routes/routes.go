package routes

import (
	handlers "github.com/SQ77/chatterHub/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Post("/posts", handlers.CreatePostHandler)
	r.Get("/posts", handlers.GetPostsHandler)
	r.Post("/posts/upvotes", handlers.UpdatePostUpvotesHandler)
	r.Delete("/posts/{id}", handlers.DeletePostHandler)
	r.Get("/posts/{id}", handlers.GetPostByIDHandler)
	r.Put("/posts/{id}", handlers.UpdatePostHandler)
	r.Get("/posts/{id}/comments", handlers.GetCommentsHandler)

	r.Post("/users", handlers.CreateUserHandler)
	r.Get("/users", handlers.GetUsersHandler)
	r.Post("/authenticate", handlers.AuthenticateUserHandler)

	r.Post("/comments", handlers.CreateCommentHandler)

	return r
}
