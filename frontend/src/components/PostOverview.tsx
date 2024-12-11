import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import CampaignIcon from '@mui/icons-material/Campaign';

export type Post = {
    id: number;
    category: string;
    title: string;
    body: string;
    createdAt: string; 
};

interface PostOverviewProps {
    currPost: Post; 
}

const categoryIcons = {
    science: <ScienceIcon sx={{ marginRight: 1 }} />,
    sports: <SportsSoccerIcon sx={{ marginRight: 1 }} />,
    music: <MusicNoteIcon sx={{ marginRight: 1 }} />,
    technology: <PhonelinkSetupIcon sx={{ marginRight: 1 }} />,
    general: <CampaignIcon sx={{ marginRight: 1 }} />,
};

const PostOverview: React.FC<PostOverviewProps> = ({ currPost }) => {
  return (
    <Card sx={{ width: '100%', mb: 2 }}>
        <CardContent>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                {categoryIcons[currPost.category]}
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                    {currPost.category.charAt(0).toUpperCase() + currPost.category.slice(1)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {new Date(currPost.createdAt).toLocaleDateString()}
                </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {currPost.title}
            </Typography>
            
            <Typography variant="body1" color="textPrimary">
                {currPost.body.substring(0, 100)}...
            </Typography>
        </CardContent>
    </Card>
  )
}

export default PostOverview;