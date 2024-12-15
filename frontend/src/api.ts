export const API_BASE_URL = "http://localhost:8000/api"

export interface Post {
    id?: number;
    title: string;
    body: string;
    category: string;
    created: string;
    author: string;
    upvotes: number;
}

export interface User {
    id?: number;
    username: string
}
  
// Fetch all posts
export const getPosts = async (): Promise<Post[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};
  
// Create a new post
export const createPost = async (post: Post): Promise<Post> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

// Update upvotes on a post
export const updatePostUpvotes = async (postId: number, increment: boolean): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/upvotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id: postId,
                increment: increment,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

    } catch (error) {
        console.error("Error updating upvotes:", error);
        throw error;
    }
};


// Fetch all users
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Add a new user
export const createUser = async (user: User): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Authenticate a user
export const authenticateUser = async (username: string): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error authenticating user:", error);
        throw error;
    }
};