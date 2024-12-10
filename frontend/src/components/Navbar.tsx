import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Mobile Menu Icon */}
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => toggleDrawer(true)}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Brand Name or Logo */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ChatterHub
                </Typography>

                {/* Navbar buttons for larger screens */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/posts">Posts</Button>
                    <Button color="inherit" component={Link} to="/profile">Profile</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
            >
                <Button component={Link} to="/" sx={{ p: 2 }}>Home</Button>
                <Button component={Link} to="/posts" sx={{ p: 2 }}>Posts</Button>
                <Button sx={{ p: 2 }}>Profile</Button>
                <Button sx={{ p: 2 }}>Login</Button>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
