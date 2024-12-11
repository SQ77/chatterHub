export const API_BASE_URL = "http://localhost:8000/api"

export interface Post {
    id?: number;
    title: string;
    body: string;
    category: string;
    created: string;
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