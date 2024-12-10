import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export type Post = {
    id: number;
    title: string;
    body: string;
    createdAt: string; 
};

interface PostOverviewProps {
    currPost: Post; 
}

const PostOverview: React.FC<PostOverviewProps> = ({ currPost }) => {
  return (
    <Card sx={{ width: '100%', marginBottom: 2 }}>
        <CardContent>
            <Typography variant="h6" color="primary">
                {currPost.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {new Date(currPost.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" color="textPrimary">
                {currPost.body.substring(0, 100)}...
            </Typography>
        </CardContent>
    </Card>

  )
}

export default PostOverview;
