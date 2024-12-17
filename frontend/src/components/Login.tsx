import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { authenticateUser } from '../api.ts';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { isAuthenticated, login } = useAuth();

    const navigate = useNavigate();
    const MAX_USERNAME_LENGTH = 50;

    const handleLogin = async () => {
        try {
            const user = await authenticateUser(username.trim());
            setError(''); 
            login({ id: Number(user.id), username: username.trim() });
            navigate("/profile");
        } catch (err) {
            setError('Invalid username. Please try again.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>

            {isAuthenticated ? (
                <Typography variant="h6" color="success.main">
                    Welcome, {username}!
                </Typography>
            ) : (
                <>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_USERNAME_LENGTH) {
                                setUsername(e.target.value);
                            }
                        }}
                        error={!!error}
                        helperText={error}
                        required
                        sx={{ mb: 2 }}
                        slotProps={{
                            htmlInput: { spellCheck: 'false' }
                        }}
                    />

                    <Typography 
                        variant="subtitle2" 
                        gutterBottom 
                        sx={{
                            mb : 2,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}  
                    >
                        <Link to="/signup" >
                            Don't have an account? Sign Up here.
                        </Link>
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </>
            )}
            
        </Box>
    );
};

export default Login;
