import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar.tsx';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Mobile Menu Icon */}
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => toggleDrawer(true)}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ChatterHub
                </Typography>

                <SearchBar />

                {/* Navbar buttons for larger screens */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Button 
                        color="inherit" 
                        sx={{ 
                            mr: 2, 
                            backgroundColor: location.pathname === '/' ? 'black' : 'transparent',
                        }} 
                        component={Link} to="/"
                    >
                        Posts
                    </Button>
                    <Button 
                        color="inherit" 
                        sx={{ 
                            mr: 2,
                            backgroundColor: location.pathname === '/create' ? 'black' : 'transparent',
                        }} 
                        component={Link} to="/create"
                    >
                        Create
                    </Button>
                    <Button 
                        color="inherit" 
                        sx={{ 
                            mr : 2,
                            backgroundColor: location.pathname === '/profile' ? 'black' : 'transparent', 
                        }} 
                        component={Link} to="/profile" 
                    >
                        Profile
                    </Button>
                    <Button 
                        color="inherit" 
                        sx={{ 
                            backgroundColor: location.pathname === '/login' ? 'black' : 'transparent', 
                        }} 
                        component={Link} to="/login"
                    >
                        Login
                    </Button>
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
            >
                <Button onClick={() => toggleDrawer(false)} component={Link} to="/" sx={{ p: 2 }}>Posts</Button>
                <Button onClick={() => toggleDrawer(false)} component={Link} to="/create" sx={{ p: 2 }}>Create</Button>
                <Button onClick={() => toggleDrawer(false)} component={Link} to="/profile" sx={{ p: 2 }}>Profile</Button>
                <Button onClick={() => toggleDrawer(false)} component={Link} to="/login" sx={{ p: 2 }}>Login</Button>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
