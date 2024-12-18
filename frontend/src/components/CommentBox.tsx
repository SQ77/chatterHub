import React, { useState } from 'react';
import { CommentWithUser, deleteComment, updateComment } from '../api.ts';
import { Box, IconButton, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { useAuth } from './AuthContext.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

interface CommentBoxProps {
    setSuccessMessage: (message: string) => void;
    setSuccessAlertOpen: (open: boolean) => void;
    setFailureMessage: (message: string) => void;
    setFailureAlertOpen: (open: boolean) => void;
    fetchComments: () => void;
    comment: CommentWithUser;
}

const CommentBox: React.FC<CommentBoxProps> = ({ 
    setSuccessMessage,
    setSuccessAlertOpen,
    setFailureMessage,
    setFailureAlertOpen,
    fetchComments,
    comment, 
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false); 
    const [updatedContent, setUpdatedContent] = useState<string>(comment.content);

    const { user } = useAuth();

    const handleEditComment = () => {
        setIsEditing(true); 
    };

    const handleSaveComment = async (commentId: number | undefined) => {
        if (!commentId) {
            setFailureMessage("Invalid comment ID to save!");
            setFailureAlertOpen(true);
            return;
        }

        if (updatedContent.trim() === "") {
            setFailureMessage("Comment cannot be empty!");
            setFailureAlertOpen(true);
            return;
        }

        try {
            await updateComment(commentId, updatedContent);
            setSuccessMessage("Comment updated successfully!");
            setSuccessAlertOpen(true);
            fetchComments();
            setIsEditing(false); 
        } catch (error) {
            setFailureMessage("Error updating comment!");
            setFailureAlertOpen(true);
        }
    }
    
    const handleDeleteComment = async (commentId: number | undefined) => {
        const confirm = window.confirm("Delete comment?");
        if (!confirm) return;

        if (!commentId) {
            setFailureMessage("Invalid comment ID to delete!");
            setFailureAlertOpen(true);
            return;
        }

        try {
            await deleteComment(commentId); 
            setSuccessMessage("Comment deleted successfully!");
            setSuccessAlertOpen(true);
            fetchComments();
        } catch (error) {
            setFailureMessage("Error deleting comment!");
            setFailureAlertOpen(true);
        }
    }

    return (
        <div key={comment.id}>
            <ListItem alignItems="flex-start">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    {isEditing ? (
                        <TextField
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                            fullWidth
                            size="small"
                            variant="outlined"
                            sx={{ marginRight: 2 }}
                        />
                    ) : (
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1">
                                    {comment.username}
                                </Typography>
                            }
                            secondary={
                                <>
                                    <Typography variant="body2">
                                        {new Date(comment.created).toLocaleDateString("en-SG")}
                                    </Typography>
                                    <Typography variant="subtitle1" mt={1}>
                                        {comment.content}
                                    </Typography>
                                </>
                            }
                        />
                    )}
                    {comment.username === user?.username && (
                        <Box>
                            {isEditing ? (
                                <Box 
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    <IconButton
                                        aria-label="save"
                                        onClick={() => handleSaveComment(comment.id)}
                                        sx={{
                                            mr: 1,
                                            "&:hover": {
                                                color: "green",
                                            },
                                        }}
                                    >
                                        <SaveIcon />
                                    </IconButton>

                                    <IconButton
                                        aria-label="cancel"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setUpdatedContent(comment.content);
                                        }}
                                        sx={{
                                            "&:hover": {
                                                color: "#D91C16",
                                            },
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={handleEditComment}
                                        sx={{
                                            mr: 1,
                                            "&:hover": {
                                                color: "blue",
                                            },
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleDeleteComment(comment.id)}
                                        sx={{
                                            "&:hover": {
                                                color: "#D91C16",
                                            },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </ListItem>
        </div>
    )
}

export default CommentBox;
