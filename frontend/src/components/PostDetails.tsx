import React, { useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { Post } from '../api.ts';

interface PostDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
}

const PostDetails: React.FC<PostDetailsProps> = ({ isOpen, onClose, post }) => {
    const descriptionElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    if (!post) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            scroll="paper"
            aria-labelledby="post-details"
            aria-describedby="post-details-body"
        >
            <DialogTitle id="post-details">{post.author}<br/>{post.title}</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="post-details-body"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {post.body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PostDetails;
