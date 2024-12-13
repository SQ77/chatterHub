import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Post, getPosts } from '../api.ts';
import PostDetails from './PostDetails.tsx';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch posts.");
            }
        };
    
        fetchPosts();
    }, []);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchTerm(searchWord);

        if (searchWord) {
            const filtered = posts?.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredPosts(filtered);
        } 
    };

    const handleMenuItemClick = (postItem: Post) => {
        setSearchTerm('');
        setSelectedPost(postItem);
    };

    return (
        <Box className="relative" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', ml: 2, mr: 2 }}>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search ChatterHub"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    minWidth: 300,
                    maxWidth: 500,
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        },
                    },
                }}
                slotProps={{
                    input: {
                        startAdornment: 
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>,
                        endAdornment: 
                            <InputAdornment position="end">
                                {searchTerm && <ClearIcon className="cursor-pointer" onClick={() => setSearchTerm('')}/>}
                            </InputAdornment>
                    },
                }}
            />

            {filteredPosts.length > 0 && searchTerm && (
                <div className="absolute top-full left-0 w-full bg-white text-black rounded-md shadow-lg max-h-48 overflow-y-auto mt-2 z-10">
                    {filteredPosts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleMenuItemClick(item)}
                            className="px-3 py-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
            <PostDetails isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} post={selectedPost}/>
        </Box>
    );
};

export default SearchBar;
