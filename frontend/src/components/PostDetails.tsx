import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
    Alert,
    Button, 
    Box, 
    CircularProgress,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    InputAdornment,
    List,
    Snackbar, 
    Typography,
    TextField,
} from '@mui/material';
import { Post, Comment, CommentWithUser, createComment, getComments } from '../api.ts';
import { useAuth } from './AuthContext.tsx';
import { categoryIcons } from './PostOverview.tsx';
import AddIcon from '@mui/icons-material/Add';
import CommentBox from './CommentBox.tsx';

interface PostDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
}

const PostDetails: React.FC<PostDetailsProps> = ({ isOpen, onClose, post }) => {
    const descriptionElementRef = useRef<HTMLElement>(null);
    const [commentToAdd, setCommentToAdd] = useState<string>('');
    const [isAddCommentFocused, setIsAddCommentFocused] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('Successful!');
    const [failureAlertOpen, setFailureAlertOpen] = useState<boolean>(false);
    const [failureMessage, setFailureMessage] = useState<string>('Error!');

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

    const fetchComments = useCallback(async () => {
        if (!post) return;
        try {
            const data = await getComments(post.id!);
            setComments(data);
        } catch (err) {
            setFailureMessage("Error loading comments!");
            setFailureAlertOpen(true);
        } finally {
            setLoading(false);
        }
    }, [post]); 
    
    useEffect(() => {
        fetchComments();
    }, [fetchComments]);  

    const handleAddComment = async (commentContent: string) => {
        if (!user || !post) {
            setFailureAlertOpen(true);
            return;
        }

        const commentData: Comment = {
            post_id: post.id!,
            user_id: user.id!,
            content: commentContent,
            created: new Date().toISOString(),
        };

        try {
            await createComment(commentData);
            setCommentToAdd('');
            setSuccessMessage("Comment added successfully!");
            setSuccessAlertOpen(true);
            fetchComments();
        } catch (error) {
            setFailureMessage("Error adding comment!");
            setFailureAlertOpen(true);
        }
    }

    if (!post) return null;

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
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
                <Typography sx={{ fontSize: "25px", mt: 1 }}>
                    {post.title}
                </Typography>
            </DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="post-details-body"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                    sx={{ color: "black" }}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        {post.body}
                    </Typography>
                    

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
                                    disabled={!commentToAdd}
                                >
                                    Comment
                                </Button>
                            </Box>
                        )}
                        </Box>}
                        <Typography variant="subtitle1">
                            Comments
                        </Typography>
                        {!comments || comments.length === 0 
                            ? <Typography variant="subtitle2">No comments</Typography> 
                            : <List>
                                {comments?.map((comment) => (
                                    <CommentBox 
                                        setSuccessMessage={setSuccessMessage}
                                        setSuccessAlertOpen={setSuccessAlertOpen}
                                        setFailureMessage={setFailureMessage}
                                        setFailureAlertOpen={setFailureAlertOpen}
                                        fetchComments={fetchComments}
                                        comment={comment} 
                                    />
                                ))}
                            </List>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose} sx={{ mt: 1, mb: 1, mr: 1 }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>

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
                {successMessage}
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
                {failureMessage}
            </Alert>
        </Snackbar>
        </>
    )
}

export default PostDetails;
