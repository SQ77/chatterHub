package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() error {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found, falling back to system environment variables.")
	}

	// Fetch environment variables
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	// Construct the connection string
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname,
	)

	log.Printf("Connecting to DB with DSN: %s", dsn)

	// Open the database connection
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return fmt.Errorf("error opening database with DSN '%s': %v", dsn, err)
	}

	// Test the database connection
	if err := db.Ping(); err != nil {
		return fmt.Errorf("error pinging database: %v", err)
	}

	// Assign to global variable
	DB = db
	log.Println("Database connection established successfully.")
	return nil
}
