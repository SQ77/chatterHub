import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, List, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import PostOverview from './PostOverview.tsx';
import { getPosts, Post } from '../api.ts';

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
                setFilteredPosts(data);
            } catch (err) {
                setError("Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const category = event.target.value as string;
        setSelectedCategory(category);

        if (category === 'all') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter((post) => post.category === category));
        }
    };

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

             {/* Filter dropdown */}
             <FormControl fullWidth error={undefined} sx={{ mt: 3, mb: 3 }}>
                <InputLabel id="category-filter-label">Filter by Category</InputLabel>
                <Select
                    labelId="category-filter-select"
                    id="category-filter-select"
                    label="Filter by Category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                    <MenuItem value="music">Music</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                </Select>
            </FormControl>

            {/* List of posts */}
            <List>
                {filteredPosts?.length > 0 
                    ? filteredPosts?.map((post) => (
                        <PostOverview key={post.id} currPost={post} manageMode={false}/>
                    )) 
                    : <Typography>No posts found</Typography>
                }
            </List>
        </Box>
    );
};

export default PostsPage;
