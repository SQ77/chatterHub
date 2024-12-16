import { 
    Box, 
    Button, 
    Typography, 
    FormControl, 
    FormHelperText, 
    InputLabel, 
    Select, 
    MenuItem,
    TextField,
    Alert,
    Snackbar
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { updatePost, getPostById, Post } from '../api.ts';  
import { useAuth } from './AuthContext.tsx';
import { useParams } from 'react-router-dom';

const EditPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    const [initialPost, setInitialPost] = useState<Post | null>(null);
    const [category, setCategory] = useState<string>('');  
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const [categoryError, setCategoryError] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [bodyError, setBodyError] = useState<boolean>(false);

    const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
    const [failureAlertOpen, setFailureAlertOpen] = useState<boolean>(false);

    const MAX_TITLE_LENGTH = 100;
    const MAX_BODY_LENGTH = 1000;

    const { user } = useAuth();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (postId) {
                    const post = await getPostById(Number(postId));
                    setInitialPost(post);
                    setCategory(post.category);
                    setTitle(post.title);
                    setBody(post.body);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
    
        fetchPost();
    }, [postId]);

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
                id: Number(postId), // Include the post ID to edit the existing post
                category,
                title,
                body,
                created: initialPost!.created,  
                author: user!.username,
                upvotes: initialPost!.upvotes, 
            };
            try {
                await updatePost(postData);  
                setSuccessAlertOpen(true);
            } catch (error) {
                setFailureAlertOpen(true);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Edit Post
            </Typography>

            <FormControl fullWidth error={categoryError}>
                <InputLabel id="edit-post-label">Category</InputLabel>
                <Select
                    labelId="edit-post-category"
                    id="edit-post-select"
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
                    id="edit-post-title"
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
                    helperText={titleError ? 'Title is required' : `${title.length} / ${MAX_TITLE_LENGTH} characters`}
                    sx={{ mt: 4, mb: 4 }}
                />

                <TextField
                    id="edit-post-body"
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
                    helperText={bodyError ? 'Body is required' : `${body.length} / ${MAX_BODY_LENGTH} characters`}
                    sx={{ mb: 4 }}
                />
            </FormControl>

            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Update Post
                </Button>
            </Box>

            <Snackbar 
                open={successAlertOpen} 
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setSuccessAlertOpen(false)}
            >
                <Alert
                    onClose={() => setSuccessAlertOpen(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Post updated successfully!
                </Alert>
            </Snackbar>

            <Snackbar 
                open={failureAlertOpen} 
                autoHideDuration={5000} 
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setFailureAlertOpen(false)}
            >
                <Alert
                    onClose={() => setFailureAlertOpen(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Error updating post!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default EditPost;

