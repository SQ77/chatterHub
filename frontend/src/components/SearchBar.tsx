import React, { useState } from 'react';
import { Box, Input, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Post } from './PostOverview.tsx';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchTerm(searchWord);

        if (searchWord) {
            setFilteredPosts(dummyPosts.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())))
        } 
    };

    const handleMenuItemClick = () => {
        setSearchTerm('');
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
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
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
                            onClick={handleMenuItemClick}
                            className="px-3 py-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </Box>
    );
};

export default SearchBar;
