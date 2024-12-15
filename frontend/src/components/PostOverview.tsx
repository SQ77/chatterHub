import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import CampaignIcon from '@mui/icons-material/Campaign';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Post, deletePost } from '../api.ts';
import PostDetails from './PostDetails.tsx';
import VoteButton from './VoteButton.tsx';

interface PostOverviewProps {
    currPost: Post; 
    manageMode: boolean;
}

const categoryIcons = {
    science: <ScienceIcon sx={{ mr: 1 }} />,
    sports: <SportsSoccerIcon sx={{ mr: 1 }} />,
    music: <MusicNoteIcon sx={{ mr: 1 }} />,
    technology: <PhonelinkSetupIcon sx={{ mr: 1 }} />,
    general: <CampaignIcon sx={{ mr: 1 }} />,
};

const PostOverview: React.FC<PostOverviewProps> = ({ currPost, manageMode }) => {
    const [isDetailedViewOpen, setIsDetailedViewOpen] = useState<boolean>(false);

    const handleCloseDetails = () => {
        setIsDetailedViewOpen(false);
    };

    const handleDeletePost = async (postId: number | undefined) => {
        const confirm = window.confirm("Delete post?");
        if (!confirm) return;

        if (!postId) {
            console.error("Invalid post ID");
            return;
        }

        try {
            await deletePost(postId); 
            console.log(`Post with ID ${postId} has been deleted.`);
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <>
            <Card 
                sx={{ 
                    width: '100%', 
                    mb: 2, 
                    cursor: 'pointer', 
                    border: '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                    '&:hover': {
                        borderColor: 'blue',
                    }, 
                }} 
                onClick={() => setIsDetailedViewOpen(true)}
            >
                <CardContent>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        {categoryIcons[currPost.category]}
                        <Typography variant="subtitle1" sx={{ mr: 1 }}>
                            {currPost.category.charAt(0).toUpperCase() + currPost.category.slice(1)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {new Date(currPost.created).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {currPost.title}
                    </Typography>
                    
                    <Typography variant="body1" color="textPrimary">
                        {currPost.body.substring(0, 100)}...
                    </Typography>
                    {!manageMode && <VoteButton initialVotes={currPost.upvotes} postId={currPost.id!}/>}
                    {manageMode && 
                        <Box 
                            display="flex" 
                            flexDirection="row" 
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                border: "1px solid #ccc",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "20px",
                                mt: 2,
                                p: 1,
                                width: "100px",
                                gap: 2,
                            }}
                        >
                            <EditIcon 
                                sx={{
                                    "&:hover": {
                                        color: "blue", 
                                    },
                                }}
                            />
                            <DeleteIcon 
                                onClick={(event) => {
                                    event.stopPropagation(); 
                                    handleDeletePost(currPost.id);
                                }}
                                sx={{
                                    "&:hover": {
                                        color: "#D91C16", 
                                    },
                                }}
                            />
                        </Box>
                    }
                </CardContent>
            </Card>
            <PostDetails isOpen={isDetailedViewOpen} onClose={handleCloseDetails} post={currPost}/>
        </>
    )
}

export default PostOverview;
