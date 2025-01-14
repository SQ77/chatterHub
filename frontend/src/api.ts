export const API_BASE_URL = "https://chatterhub-k00j.onrender.com/api"

export interface Post {
    id?: number;
    title: string;
    body: string;
    category: string;
    created: string;
    author: string;
    upvotes: number;
}

export interface Comment {
    id?: number;
    post_id: number;
    user_id: number;
    content: string;
    created: string;
}

export interface CommentWithUser extends Comment {
    username: string;
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

// Delete a post by ID
export const deletePost = async (postId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

export const updatePost = async (post: Post): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });

        if (!response.ok) {
            throw new Error(`Failed to update the post: ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error updating the post:', error);
        throw new Error('Failed to update the post');
    }
};
  
// Fetch a post by ID
export const getPostById = async (postId: Number): Promise<Post> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
}


// Create a new comment
export const createComment = async (comment: Comment): Promise<Comment> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

// Fetch all comments for a post
export const getComments = async (postId: Number): Promise<CommentWithUser[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

// Delete a comment by ID
export const deleteComment = async (commentId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};

export const updateComment = async (commentId: number, updatedContent: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: updatedContent }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update the comment: ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error updating the comment:', error);
        throw new Error('Failed to update the comment');
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