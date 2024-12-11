import { 
    Box, 
    Button, 
    Typography, 
    FormControl, 
    FormHelperText, 
    InputLabel, 
    Select, 
    MenuItem,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { createPost, Post } from '../api.ts';

const CreatePost: React.FC = () => {
    const [category, setCategory] = useState<string>('');  
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const [categoryError, setCategoryError] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [bodyError, setBodyError] = useState<boolean>(false);

    const MAX_TITLE_LENGTH = 100;
    const MAX_BODY_LENGTH = 1000;

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value as string);
        setCategoryError(false); 
    };

    const handleSubmit = async () => {
        let hasError = false;

        if (!category) {
            setCategoryError(true);
            hasError = true;
        }

        if (!title.trim()) {
            setTitleError(true);
            hasError = true;
        } else {
            setTitleError(false);
        }

        if (!body.trim()) {
            setBodyError(true);
            hasError = true;
        } else {
            setBodyError(false);
        }
        
        // Successful submission
        if (!hasError) {
            const postData: Post = {
                category,
                title,
                body,
                created: new Date().toISOString(),
            };
            try {
                const response = await createPost(postData);
                console.log('Post created successfully:', response);
                setCategory('');
                setTitle('');
                setBody('');
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Create Post
            </Typography>

            <FormControl fullWidth error={categoryError}>
                <InputLabel id="create-post-label">Category</InputLabel>
                <Select
                    labelId="create-post-category"
                    id="create-post-select"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="music">Music</MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                </Select>
                {categoryError && <FormHelperText>Category is required</FormHelperText>}

                <TextField
                    id="create-post-title"
                    label="Title"
                    variant="outlined"
                    required
                    value={title}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_TITLE_LENGTH) {
                            setTitle(e.target.value);
                        }
                    }}
                    error={titleError}
                    helperText={titleError ? 'Title is required' : `Max ${MAX_TITLE_LENGTH} characters`}
                    sx={{ mt: 4, mb: 4 }}
                />

                <TextField
                    id="create-post-body"
                    label="Body"
                    variant="outlined"
                    required
                    multiline
                    minRows={4}
                    value={body}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_BODY_LENGTH) {
                            setBody(e.target.value);
                        }
                    }}
                    error={bodyError}
                    helperText={bodyError ? 'Body is required' : `Max ${MAX_BODY_LENGTH} characters`}
                    sx={{ mb: 4 }}
                />
            </FormControl>

            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Post
                </Button>
            </Box>
        </Box>
    )
}

export default CreatePost;
