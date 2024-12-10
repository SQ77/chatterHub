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

const CreatePost: React.FC = () => {
    const [category, setCategory] = useState<string>('');  
    const [error, setError] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value as string);
        setError(false); 
    };

    const handleSubmit = () => {
        if (category === '') {
            setError(true);
        } else {
            console.log('Post Category Selected:', category);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Create Post
            </Typography>

            <FormControl fullWidth error={error}>
                <InputLabel id="create-post-label">Category</InputLabel>
                <Select
                    labelId="create-post-category"
                    id="create-post-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value="">Select Category...</MenuItem>
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="music">Music</MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                </Select>
                {error && <FormHelperText>Category is required</FormHelperText>}

                <TextField 
                    id="outlined-basic" 
                    label="Title" 
                    variant="outlined" 
                    sx={{ mt: 4, mb: 4 }}
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
