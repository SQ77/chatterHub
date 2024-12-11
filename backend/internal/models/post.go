package models

import "time"

type Post struct {
	ID       int       `json:"id"`
	Title    string    `json:"title"`
	Body     string    `json:"body"`
	Category string    `json:"category"`
	Created  time.Time `json:"created"`
}
