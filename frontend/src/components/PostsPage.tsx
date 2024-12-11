import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, List } from '@mui/material';
import PostOverview, { Post } from './PostOverview.tsx';

const PostsPage: React.FC = () => {

    const dummyPosts: Post[] = [
        {
            id: 1,
            category: 'science',
            title: 'First Post',
            body: 'This is the body of the first post. It contains some interesting information about the topic.',
            createdAt: '2024-12-01T12:00:00Z',
        },
        {
            id: 2,
            category: 'sports',
            title: 'Second Post',
            body: 'This is the body of the second post. Here, we discuss a different topic with more details.',
            createdAt: '2024-12-05T14:30:00Z',
        },
        {
            id: 3,
            category: 'general',
            title: 'Third Post',
            body: 'In this post, we dive into a third topic, exploring new insights and ideas about the subject.',
            createdAt: '2024-12-07T09:15:00Z',
        },
    ];

    const [posts, setPosts] = useState<Post[]>(dummyPosts);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate loading state for 1 second
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
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
