import React, { useState } from "react";
import { IconButton, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { updatePostUpvotes } from "../api.ts";
import { useAuth } from "./AuthContext.tsx";

interface VoteButtonProps {
  initialVotes?: number;
  postId: number;
}

const VoteButton: React.FC<VoteButtonProps> = ({ initialVotes = 0, postId }) => {
    const [votes, setVotes] = useState(initialVotes);
    const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
    const [isDownvoted, setIsDownvoted] = useState<boolean>(false);

    const { isAuthenticated } = useAuth();

    const handleUpvote = async () => {
        try {
            if (isUpvoted) {
                setVotes((prev) => prev - 1);
                await updatePostUpvotes(postId, false); 
            } else {
                setVotes((prev) => prev + 1);
                await updatePostUpvotes(postId, true); 
                if (isDownvoted) setIsDownvoted(false); 
            }
            setIsUpvoted(!isUpvoted);
        } catch (error) {
            console.error("Failed to update upvotes:", error);
        }
    };

    const handleDownvote = async () => {
        try {
            if (isDownvoted) {
                setVotes((prev) => prev + 1);
                await updatePostUpvotes(postId, true); 
            } else {
                setVotes((prev) => prev - 1);
                await updatePostUpvotes(postId, false); 
                if (isUpvoted) setIsUpvoted(false);
            }
            setIsDownvoted(!isDownvoted);
        } catch (error) {
            console.error("Failed to update downvotes:", error);
        }
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); 
    };

    return (
        <Box 
            display="flex" 
            flexDirection="row" 
            alignItems="center"
            justifyContent="center"
            onClick={stopPropagation}
            sx={{
                border: "1px solid #ccc",
                backgroundColor: "#f5f5f5",
                borderRadius: "20px",
                mt: 2,
                width: "100px",
            }}
        >
            <IconButton
                onClick={handleUpvote}
                color={isUpvoted ? "primary" : "default"}
                disabled={isDownvoted || !isAuthenticated}
            >
                <ArrowUpwardIcon fontSize="small"/>
            </IconButton>
            <Typography variant="body2" color="textSecondary">
                {votes}
            </Typography>
            <IconButton
                onClick={handleDownvote}
                color={isDownvoted ? "primary" : "default"}
                disabled={isUpvoted || !isAuthenticated}
            >
                <ArrowDownwardIcon fontSize="small"/>
            </IconButton>
        </Box>
    );
};

export default VoteButton;
