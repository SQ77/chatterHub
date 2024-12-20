import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './SearchBar.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        const confirm = window.confirm("Logout?");
        if (!confirm) return;
        logout();
        navigate("/");
    }

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

                <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/">
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
                    {isAuthenticated && <Button 
                        color="inherit" 
                        sx={{ 
                            mr: 2,
                            backgroundColor: location.pathname === '/create' ? 'black' : 'transparent',
                        }} 
                        component={Link} to="/create"
                    >
                        Create
                    </Button>}
                    {isAuthenticated && <Button 
                        color="inherit" 
                        sx={{ 
                            mr : 2,
                            backgroundColor: location.pathname === '/profile' ? 'black' : 'transparent', 
                        }} 
                        component={Link} to="/profile" 
                    >
                        Profile
                    </Button>}
                    {isAuthenticated && <Button 
                        color="inherit" 
                        sx={{ 
                            mr : 2,
                            backgroundColor: '#D91C16', 
                        }} 
                        onClick={handleLogout} 
                    >
                        Logout
                    </Button>}
                    {!isAuthenticated && <Button 
                        color="inherit" 
                        sx={{ 
                            backgroundColor: location.pathname === '/login' ? 'black' : 'transparent', 
                        }} 
                        component={Link} to="/login"
                    >
                        Login
                    </Button>}
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    '& .MuiButton-root': { color: 'black' }, 
                }}
            >
                <Button 
                    onClick={() => toggleDrawer(false)} 
                    component={Link} to="/" 
                    sx={{
                        p: 1,
                        m: 2, 
                        backgroundColor: location.pathname === '/' ? 'blue' : 'transparent', 
                    }} 
                >
                    Posts
                </Button>
                {isAuthenticated && <Button 
                    onClick={() => toggleDrawer(false)} 
                    component={Link} to="/create" 
                    sx={{
                        p: 1,
                        m: 2, 
                        backgroundColor: location.pathname === '/create' ? 'blue' : 'transparent', 
                    }} 
                >
                    Create
                </Button>}
                {isAuthenticated && <Button 
                    onClick={() => toggleDrawer(false)} 
                    component={Link} to="/profile" 
                    sx={{
                        p: 1,
                        m: 2, 
                        backgroundColor: location.pathname === '/profile' ? 'blue' : 'transparent', 
                    }} 
                >
                    Profile
                </Button>}
                {isAuthenticated && <Button 
                    sx={{ 
                        p: 1,
                        m: 2,
                        backgroundColor: '#D91C16', 
                    }} 
                    onClick={() => {
                        handleLogout();
                        toggleDrawer(false);
                    }} 
                >
                    Logout
                </Button>}
                {!isAuthenticated && <Button 
                    onClick={() => toggleDrawer(false)} 
                    component={Link} to="/login" 
                    sx={{
                        p: 1,
                        m: 2, 
                        backgroundColor: location.pathname === '/login' ? 'blue' : 'transparent', 
                    }} 
                >
                    Login
                </Button>}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
