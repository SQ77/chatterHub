import React, { useEffect, useRef, useState } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Button, 
    Box, 
    Typography,
    TextField,
    InputAdornment 
} from '@mui/material';
import { Post, Comment, createComment } from '../api.ts';
import { useAuth } from './AuthContext.tsx';
import { categoryIcons } from './PostOverview.tsx';
import AddIcon from '@mui/icons-material/Add';

interface PostDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
}

const PostDetails: React.FC<PostDetailsProps> = ({ isOpen, onClose, post }) => {
    const descriptionElementRef = useRef<HTMLElement>(null);
    const [commentToAdd, setCommentToAdd] = useState<string>('');
    const [isAddCommentFocused, setIsAddCommentFocused] = useState<boolean>(false);

    const { isAuthenticated, user } = useAuth();
    const MAX_COMMENT_LENGTH = 200;

    useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    const handleAddComment = async (commentString: string) => {
        if (!user || !post) {
            console.log("Error creating comment");
            return;
        }
        const commentData: Comment = {
            post_id: post.id!,
            user_id: user.id!,
            content: commentString,
            created: new Date().toISOString(),
        };
        try {
            await createComment(commentData);
            setCommentToAdd('');
            console.log("Created comment successfully");
        } catch (error) {
            console.log("Error creating comment");
        }
    }

    if (!post) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            scroll="paper"
            aria-labelledby="post-details"
            aria-describedby="post-details-body"
        >
            <DialogTitle id="post-details">
                <Box display="flex" alignItems="center">
                    {categoryIcons[post.category]}
                    <Box>
                        <Typography variant="subtitle2">
                            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}{' '}
                            {new Date(post.created).toLocaleDateString('en-SG')}
                        </Typography>
                        <Typography variant="subtitle2">
                            {post.author}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h6" mt={1}>
                    {post.title}
                </Typography>
            </DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="post-details-body"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {post.body}

                    {isAuthenticated && <Box
                        sx={{
                            position: 'relative', 
                            display: 'inline-block', 
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Add a comment"
                            value={commentToAdd}
                            onChange={(e) => {
                                if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                                    setCommentToAdd(e.target.value);
                                }
                            }}
                            onFocus={() => setIsAddCommentFocused(true)} 
                            onBlur={() => setIsAddCommentFocused(false)} 
                            helperText={`${commentToAdd.length} / ${MAX_COMMENT_LENGTH} characters`}
                            multiline
                            sx={{
                                backgroundColor: 'white',
                                minWidth: 400,
                                maxWidth: 600,
                                width: '100%',
                                mt: 2,
                                mb: 2,
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: 
                                        <InputAdornment position="start">
                                            <AddIcon />
                                        </InputAdornment>
                                },
                            }}
                        />
                        {isAddCommentFocused && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 8, 
                                    right: 8,  
                                    display: 'flex',
                                    gap: 1, 
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onMouseDown={() => setCommentToAdd('')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onMouseDown={() => handleAddComment(commentToAdd)}
                                >
                                    Comment
                                </Button>
                            </Box>
                        )}
                        </Box>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose} sx={{ mt: 1, mb: 1, mr: 1 }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PostDetails;
