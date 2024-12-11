import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, List } from '@mui/material';
import PostOverview from './PostOverview.tsx';
import { getPosts, Post } from '../api.ts';

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                setError("Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Posts
            </Typography>
            <List>
                {posts.map((post) => (
                    <PostOverview key={post.id} currPost={post}/>
                ))}
            </List>
        </Box>
    );
};

export default PostsPage;
