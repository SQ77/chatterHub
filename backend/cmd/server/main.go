package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/SQ77/chatterHub/internal/database"
	"github.com/SQ77/chatterHub/internal/router"
)

func main() {
	// Initialize the database connection
	if err := database.InitDB(); err != nil {
		log.Fatalf("Database initialization failed: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	r := router.Setup()
	fmt.Printf("Listening on port %s\n", port)
	log.Fatalln(http.ListenAndServe("0.0.0.0:"+port, r))
}
