import React, { useState } from "react";
import { IconButton, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface VoteButtonProps {
  initialVotes?: number;
}

const VoteButton: React.FC<VoteButtonProps> = ({ initialVotes = 0 }) => {
    const [votes, setVotes] = useState(initialVotes);
    const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
    const [isDownvoted, setIsDownvoted] = useState<boolean>(false);

    const handleUpvote = () => {
        if (isUpvoted) {
            setVotes((prev) => prev - 1);
        } else {
            setVotes((prev) => prev + 1);
        }
        setIsUpvoted(!isUpvoted);
    };

    const handleDownvote = () => {
        if (isDownvoted) {
            setVotes((prev) => prev + 1);
        } else {
            setVotes((prev) => prev - 1);
        }
        setIsDownvoted(!isDownvoted);
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); 
    };

    return (
        <Box 
            display="flex" 
            flexDirection="row" 
            alignItems="center"
            onClick={stopPropagation}
            sx={{
                border: "1px solid #ccc",
                backgroundColor: "#f5f5f5",
                borderRadius: "20px",
                mt: 2,
                p: 1,
                width: "100px",
            }}
        >
            <IconButton
                onClick={handleUpvote}
                color={isUpvoted ? "primary" : "default"}
                disabled={isDownvoted}
            >
                <ArrowUpwardIcon fontSize="small"/>
            </IconButton>
            <Typography variant="body2" color="textSecondary">
                {votes}
            </Typography>
            <IconButton
                onClick={handleDownvote}
                color={isDownvoted ? "primary" : "default"}
                disabled={isUpvoted}
            >
                <ArrowDownwardIcon fontSize="small"/>
            </IconButton>
        </Box>
    );
};

export default VoteButton;
