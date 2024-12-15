import { Box, Typography, List, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext.tsx';
import PostOverview from './PostOverview.tsx';
import { getPosts, Post } from '../api.ts';

const Profile: React.FC = () => {
    const [myPosts, setMyPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
            const fetchPosts = async () => {
                try {
                    const data = await getPosts();
                    setMyPosts(data.filter(post => post.author === user?.username));
                } catch (err) {
                    console.error("Failed to fetch posts.");
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

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>{`Welcome, ${user?.username}!`}</Typography>
            <Typography variant="h4" gutterBottom>Your Posts</Typography>
            <List>
                {myPosts?.length > 0 
                    ? myPosts?.map((post) => (
                        <PostOverview key={post.id} currPost={post} manageMode={true}/>
                    )) 
                    : <Typography>No posts found</Typography>
                }
            </List>
        </Box>
    )
}

export default Profile;
